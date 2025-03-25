import authStore from '$lib/stores/auth.store.js';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	// console.log(authStore.isAuth());
	if (
		authStore.isAuth() === false &&
		['/login', '/register', '/password-forgot'].includes(url.pathname) === false
	) {
		// console.log('t1');
		throw redirect(302, '/login');
	}
}
