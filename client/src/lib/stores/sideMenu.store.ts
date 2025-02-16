import { writable } from 'svelte/store';

//visiblity of sideMenu store
const sideMenuStore = () => {
	const { set, subscribe } = writable<boolean>(false);

	const setVisibility = (value: boolean) => set(value);

	return {
		setVisibility,
		subscribe
	};
};

export default sideMenuStore();
