export const ssr = false;

import webNotesServer from '$lib/api/api.config';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const userSessions = await webNotesServer.userService.sessionsGet();

	return {
		sessions: userSessions,
		success: userSessions.length > 0
	};
};
