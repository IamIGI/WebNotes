import webNotesServer from './api.config';
import type { UserLoginPayload, UserRegisterPayload } from './generated';

export default {
	login: async (data: UserLoginPayload) => await webNotesServer.userService.authLoginPost(data),
	register: async (data: UserRegisterPayload) =>
		await webNotesServer.userService.authRegisterPost(data),
	verifyEmail: async (code: string) => webNotesServer.userService.authEmailVerifyCodeGet(code)
};
