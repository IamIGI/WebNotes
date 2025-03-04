import { writable } from 'svelte/store';

interface AppStore {
	globalDimmer: boolean;
	fetchingAllNotes: boolean;
}

const init: AppStore = {
	globalDimmer: false,
	fetchingAllNotes: false
};

function appStore() {
	const store = writable<AppStore>(init);
	const { update, subscribe } = store;

	const setGlobalDimmer = (value: boolean) =>
		update((state) => ({ ...state, globalDimmer: value }));

	const setFetchingAllNotesStatus = (value: boolean) =>
		update((state) => ({ ...state, fetchingAllNotes: value }));

	return {
		setGlobalDimmer,
		setFetchingAllNotesStatus,
		subscribe
	};
}

export default appStore();
