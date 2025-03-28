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
	verifyEmail: async (code: string) => webNotesServer.userService.authEmailVerifyCodeGet(code),
	forgotPassword: async (email: string) =>
		webNotesServer.userService.authPasswordForgotPost({ email }),
	resetPassword: async (data: AuthPasswordResetPostRequest) =>
		webNotesServer.userService.authPasswordResetPost(data),
	getUser: async () => webNotesServer.userService.userGet()
};
