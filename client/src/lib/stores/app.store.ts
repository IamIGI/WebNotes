import { get, writable } from 'svelte/store';

interface Parameters {
	searchTermHighlight: number; //length of string when text get highlighted
	debounceTimeToSaveNote: number; //[s] number of seconds after user stop typing, then saved changes to db
}

interface AppStore {
	globalDimmer: boolean;
	fetchingAllNotes: boolean;
	hideSideMenu: boolean;
	parameters: Parameters;
}

const init: AppStore = {
	globalDimmer: false,
	fetchingAllNotes: false,
	hideSideMenu: false,
	parameters: { searchTermHighlight: 2, debounceTimeToSaveNote: 5 }
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
		getParameter: () => get(store).parameters,
		subscribe,
		setGlobalDimmer,
		setFetchingAllNotesStatus,
		toggleHideMenuVisibility,
		setHideMenuVisibility
	};
}

export default appStore();
