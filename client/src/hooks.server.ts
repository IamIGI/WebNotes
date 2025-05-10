import type { UserGet200Response } from '$lib/api/generated';
import envConstants from '$lib/constants/env.constants';
import authStore from '$lib/stores/auth.store';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

const userCache = new Map<string, App.Locals>();
let lastCacheClearDate: number | null = null;
const CACHE_INTERVAL_MS = 60 * 1000; //60 seconds

// This runs on EVERY server-side request
export const handle: Handle = async ({ event, resolve }) => {
	const isProtectedRoute = event.route.id?.startsWith('/(protected)');
	const accessToken = event.cookies.get('accessToken');

	if (isProtectedRoute) {
		if (lastCacheClearDate == null || Date.now() - lastCacheClearDate > CACHE_INTERVAL_MS) {
			console.log('Authorization - Clearing user cache');
			userCache.clear();
			lastCacheClearDate = Date.now();
		}

		if (!accessToken) {
			console.log('No accessToken, try to refresh');
			const refreshToken = event.cookies.get('refreshToken');
			if (refreshToken) {
				// Try to refresh on the server
				const refreshResponse = await fetch(`${envConstants.API_URL}/auth/refresh`, {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						Cookie: `refreshToken=${refreshToken}` // ✅ Manually forward cookies
					}
				});

				if (refreshResponse.ok) {
					const response = await resolve(event);

					return response;
				}
			}
			console.log('Refresh failed during SSR, logging out');
			throw logoutUser(event);
		}

		if (userCache.has(accessToken)) {
			const userData = userCache.get(accessToken)!;
			setLocals(event, userData);
		} else {
			console.log('Authorization - get from server');
			const response = await fetch(`${envConstants.API_URL}/user`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Cookie: `accessToken=${accessToken}` // ✅ Manually forward cookies
				}
			});

			if (response.status === 200) {
				const { user, session } = (await response.json()) as UserGet200Response;
				if (!user || !session) throw new Error('User do not exists');

				userCache.set(accessToken, { accessToken, user, session });
				setLocals(event, { user, accessToken, session });
			} else {
				console.log('Authorization - logout (Session not found)');
				throw logoutUser(event);
			}
		}
	}

	const response = await resolve(event);
	return response;
};

function logoutUser(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
	setLocals(event, { accessToken: undefined, user: undefined, session: undefined });
	authStore.clear();
	throw redirect(303, '/login');
}

function setLocals(
	event: RequestEvent<Partial<Record<string, string>>, string | null>,
	data: App.Locals
) {
	event.locals.accessToken = data.accessToken;
	event.locals.session = data.session;
	event.locals.user = data.user;
}
