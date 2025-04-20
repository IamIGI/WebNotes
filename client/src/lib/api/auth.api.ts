import { invalidateAll } from '$app/navigation';
import authStore from '$lib/stores/auth.store';
import noteSelectedStore from '$lib/stores/noteSelected.store';
import notesPreviewStore from '$lib/stores/notesPreview.store';
import webNotesServer from './api.config';
import type {
	AuthPasswordResetPostRequest,
	UserLoginPayload,
	UserRegisterPayload
} from './generated';

export default {
	login: async (data: UserLoginPayload) => {
		await webNotesServer.userService.authLoginPost(data);
		await invalidateAll();
	},
	register: async (data: UserRegisterPayload) => {
		await webNotesServer.userService.authRegisterPost(data);
		await invalidateAll();
	},
	verifyEmail: async (code: string) =>
		await webNotesServer.userService.authEmailVerifyCodeGet(code),
	forgotPassword: async (email: string) =>
		await webNotesServer.userService.authPasswordForgotPost({ email }),
	resetPassword: async (data: AuthPasswordResetPostRequest) =>
		await webNotesServer.userService.authPasswordResetPost(data),
	getUser: async () => await webNotesServer.userService.userGet(),
	logout: async () => {
		notesPreviewStore.clear();
		noteSelectedStore.clear();
		authStore.clear();
		await webNotesServer.userService.authLogoutGet();
		await invalidateAll();
	},
	removeSession: async (id: string) => await webNotesServer.userService.sessionsIdDelete(id),
	removeAllSession: async (id: string) =>
		await webNotesServer.userService.sessionsAllUserIdDelete(id),

	triggerVerification: async () => {
		// Manually trigger `hooks.server.ts` by calling a protected route
		await fetch('/selected', {
			method: 'GET',
			credentials: 'include'
		});
	}
};
