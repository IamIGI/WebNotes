import authApi from '$lib/api/auth.api';
import type { PageServerLoad } from './$types';
//Using +page.server.ts file will force this page to be rendered only once on server side SSR
export const load: PageServerLoad = async ({ params }) => {
	const code = params.code;
	let isSuccess = false;

	try {
		await authApi.verifyEmail(code);
		isSuccess = true;
	} catch (error) {
		console.error(error);
		isSuccess = false;
	}

	return { isSuccess };
};
