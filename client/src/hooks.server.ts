import type { UserWithoutPassword } from '$lib/api/generated';
import envConstants from '$lib/constants/env.constants';
import authStore from '$lib/stores/auth.store';
import { redirect, type Handle } from '@sveltejs/kit';

const userCache = new Map<string, UserWithoutPassword>();
let lastCacheClearDate: number | null  = null;
const CACHE_INTERVAL_MS = 60 * 1000 //60 seconds

// This runs on EVERY server-side request
export const handle: Handle = async ({ event, resolve }) => {
	const isProtectedRoute = event.route.id?.startsWith('/(protected)');
	const accessToken = event.cookies.get('accessToken');

	if (isProtectedRoute) {

		if(lastCacheClearDate == null || Date.now() - lastCacheClearDate > CACHE_INTERVAL_MS) {
			console.log('Authorization - Clearing user cache');
			userCache.clear();
			lastCacheClearDate = Date.now()
		}

		if (!accessToken) {
			console.log('Authorization - logout (accessToken)')
			event.locals.user = undefined;
			authStore.removeUser();
			throw redirect(303, '/login');
		}

		if (userCache.has(accessToken)) {
			event.locals.user = userCache.get(accessToken);
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
				const user = (await response.json()) as UserWithoutPassword;
				userCache.set(accessToken, user);
				event.locals.user = user;
			} else {
				console.log('Authorization - logout (Session not found)')
				userCache.delete(accessToken);
				event.locals.user = undefined;
				throw redirect(303, '/login');
			}
		}
	}

	const response = await resolve(event);
	return response;
};
