import { writable } from 'svelte/store';

interface AppStore {
	globalDimmer: boolean;
}

const init: AppStore = {
	globalDimmer: false
};

function appStore() {
	const store = writable<AppStore>(init);
	const { update, subscribe } = store;

	const setGlobalDimmer = (value: boolean) =>
		update((state) => ({ ...state, globalDimmer: value }));

	return {
		setGlobalDimmer,
		subscribe
	};
}

export default appStore();
