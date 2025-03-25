import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const code = params.code;

	return {
		params: { code }
	};
};
