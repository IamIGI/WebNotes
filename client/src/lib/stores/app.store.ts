import { writable } from 'svelte/store';

interface AppStore {
	globalDimmer: boolean;
	fetchingAllNotes: boolean;
	hideSideMenu: boolean;
}

const init: AppStore = {
	globalDimmer: false,
	fetchingAllNotes: false,
	hideSideMenu: false
};

function appStore() {
	const store = writable<AppStore>(init);
	const { update, subscribe } = store;

	const setGlobalDimmer = (value: boolean) => update((prev) => ({ ...prev, globalDimmer: value }));

	const setFetchingAllNotesStatus = (value: boolean) =>
		update((prev) => ({ ...prev, fetchingAllNotes: value }));

	const toggleHideMenuVisibility = () =>
		update((prev) => ({ ...prev, hideSideMenu: !prev.hideSideMenu }));

	const setHideMenuVisibility = (value: boolean) =>
		update((prev) => ({ ...prev, hideSideMenu: value }));

	return {
		subscribe,
		setGlobalDimmer,
		setFetchingAllNotesStatus,
		toggleHideMenuVisibility,
		setHideMenuVisibility
	};
}

export default appStore();
