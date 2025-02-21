import type { NotePreview } from '$lib/interfaces';
import { notePreviews } from '$lib/mocks';
import { get, writable } from 'svelte/store';

function notesStore() {
	const store = writable<NotePreview[]>([]);
	const { set, subscribe } = store;

	const fetchNotes = () => {
		set(notePreviews);
		return notePreviews;
	};

	const getNotes = () => get(store);

	return {
		fetchNotes,
		getNotes,
		subscribe
	};
}

export default notesStore();
