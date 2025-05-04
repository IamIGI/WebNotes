import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	console.log('LayoutServerLoad: ', locals);

	return {
		user: locals.user,
		accessToken: locals.accessToken,
		session: locals.session
	};
};
