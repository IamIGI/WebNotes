/* eslint-disable @typescript-eslint/no-explicit-any */

import envConstants from '$lib/constants/env.constants';
import { Configuration, NotesApi, ResponseError } from './generated';

class WebNotesServer {
	public notesService: NotesApi;

	constructor() {
		const SERVER_URL =
			envConstants.PROD === 'true' ? envConstants.PROD_SERVER_URL : 'http://localhost:4000';

		const configuration = new Configuration({
			basePath: SERVER_URL,
			headers: {
				// 'X-API-KEY': API_KEY!,
			}
		});

		this.notesService = errorHandler(new NotesApi(configuration));

		function errorHandler(service: any) {
			return new Proxy(service, {
				get: function (target, method) {
					if (typeof target[method] === 'function') {
						return async function (...values: any) {
							try {
								const result = await target[method](...values);
								return result;
							} catch (error) {
								if (error instanceof ResponseError) {
									const ResponseError = await error.response.json();
									console.error(ResponseError);

									// Handle specific error codes here if needed
									switch (ResponseError.errorCode) {
										default:
											console.error('Unhandled error code:', ResponseError.errorCode);
											break;
									}
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
}

const webNotesServer = new WebNotesServer();
export default webNotesServer;
