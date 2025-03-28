import type { UserWithoutPassword } from '$lib/api/generated';
import { get, writable } from 'svelte/store';

interface AuthStore {
	user: UserWithoutPassword | undefined;
}

const init: AuthStore = { user: undefined };

function authStore() {
	const store = writable<{ user: UserWithoutPassword | undefined }>(init);
	const { subscribe, set } = store;

	return {
		subscribe,
		setUser: (user: UserWithoutPassword) => set({ user }),
		removeUser: () => store.set(init),
		isUser: () => get(store).user
	};
}

export default authStore();
