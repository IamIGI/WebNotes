import webNotesServer from './api.config';
import type {
	AuthPasswordResetPostRequest,
	UserLoginPayload,
	UserRegisterPayload
} from './generated';

export default {
	login: async (data: UserLoginPayload) => await webNotesServer.userService.authLoginPost(data),
	register: async (data: UserRegisterPayload) =>
		await webNotesServer.userService.authRegisterPost(data),
	verifyEmail: async (code: string) =>
		await webNotesServer.userService.authEmailVerifyCodeGet(code),
	forgotPassword: async (email: string) =>
		await webNotesServer.userService.authPasswordForgotPost({ email }),
	resetPassword: async (data: AuthPasswordResetPostRequest) =>
		await webNotesServer.userService.authPasswordResetPost(data),
	getUser: async () => await webNotesServer.userService.userGet(),

	triggerVerification: async () => {
		// Manually trigger `hooks.server.ts` by calling a protected route
		await fetch('/selected', {
			method: 'GET',
			credentials: 'include'
		});
	}
};
