/* eslint-disable @typescript-eslint/no-explicit-any */

import envConstants from '$lib/constants/env.constants';
import { Configuration, NotesApi, ResponseError, UserApi } from './generated';

const SERVER_URL =
	envConstants.PROD === 'true' ? envConstants.PROD_SERVER_URL : 'http://localhost:4000';

const configuration = new Configuration({
	basePath: SERVER_URL,
	headers: {
		// 'X-API-KEY': API_KEY!,
	}
	// credentials: 'include' //Ensure cookies are sent with request
});
class WebNotesServer {
	public notesService: NotesApi;
	public userService: UserApi;

	constructor() {
		this.notesService = this.interceptor(new NotesApi(configuration));
		this.userService = this.interceptor(new UserApi(configuration));
	}

	private interceptor(service: any) {
		return new Proxy(service, {
			get: function (target, method) {
				if (typeof target[method] === 'function') {
					return async function (...values: any) {
						try {
							const result = await target[method](...values);
							return result;
						} catch (error) {
							if (error instanceof ResponseError) {
								const responseError = await error.response.json();
								console.error(responseError);

								if (responseError.status == 401) {
									console.warn('Unauthorized! Redirecting to login...');
									window.location.href = '/login';
								}
								// Handle specific error codes here if needed
								switch (responseError.errorCode) {
									default:
										console.error('Unhandled error code:', responseError.errorCode);
										break;
								}

								return Promise.reject(responseError);
							}
							throw error; // Ensure the error is re-thrown
						}
					};
				}

				return target[method];
			}
		});
	}
}

const webNotesServer = new WebNotesServer();
export default webNotesServer;
