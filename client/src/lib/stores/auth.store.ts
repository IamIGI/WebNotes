import { get, writable } from 'svelte/store';

export type AuthStore = App.Locals;

const init: AuthStore = { user: undefined, accessToken: undefined, session: undefined };

function authStore() {
	const store = writable<AuthStore>(init);
	const { subscribe, set } = store;

	return {
		subscribe,
		setData: (data: AuthStore) => set(data),
		clear: () => store.set(init),

		getUser: () => get(store).user,
		getAccessToken: () => get(store).accessToken,
		getSession: () => get(store).session,
		getUserId: () => get(store).user?._id,

		isUser: () => get(store).user !== undefined
	};
}

export default authStore();
