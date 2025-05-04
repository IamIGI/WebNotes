import type { UserWithoutPassword } from '$lib/api/generated';
import { get, writable } from 'svelte/store';

export interface AuthStore {
	user: UserWithoutPassword | undefined;
	accessToken: string | undefined;
}

const init: AuthStore = { user: undefined, accessToken: undefined };

function authStore() {
	const store = writable<AuthStore>(init);
	const { subscribe, set } = store;

	return {
		subscribe,
		setData: (data: AuthStore) => set(data),
		getUser: () => get(store).user,
		getAccessToken: () => get(store).accessToken,
		getUserId: () => get(store).user?._id,
		clear: () => store.set(init),
		isUser: () => get(store).user !== undefined
	};
}

export default authStore();
