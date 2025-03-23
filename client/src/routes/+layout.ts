import authStore from '$lib/stores/auth.store.js';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	console.log(authStore.isAuth());
	if (authStore.isAuth() === false && url.pathname !== '/login') {
		console.log('t1');
		throw redirect(302, '/login');
	}
}
