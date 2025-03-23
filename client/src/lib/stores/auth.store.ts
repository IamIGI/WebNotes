import { get, writable } from 'svelte/store';

const init = false;
function authStore() {
	const store = writable<boolean>(init);
	const { subscribe, set } = store;

	return {
		subscribe,
		setAuth: (value: boolean) => set(value),
		isAuth: () => get(store)
	};
}

export default authStore();
