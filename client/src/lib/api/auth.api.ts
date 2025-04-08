import { invalidateAll } from '$app/navigation';
import webNotesServer from './api.config';
import type {
	AuthPasswordResetPostRequest,
	UserLoginPayload,
	UserRegisterPayload
} from './generated';

const logout = async () => {
	await webNotesServer.userService.authLogoutGet();
	await invalidateAll();
};

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
	logout,
	removeSession: async (id: string) => await webNotesServer.userService.sessionsIdDelete(id),
	removeAllSession: async (id: string) => {
		await webNotesServer.userService.sessionsAllUserIdDelete(id);
		await logout;
	},

	triggerVerification: async () => {
		// Manually trigger `hooks.server.ts` by calling a protected route
		await fetch('/selected', {
			method: 'GET',
			credentials: 'include'
		});
	}
};
