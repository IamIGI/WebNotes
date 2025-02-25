import webNotesServer from '$lib/api/api.config';
import type { NotePreview } from '$lib/api/generated';

import { get, writable } from 'svelte/store';

function notesPreviewStore() {
	const store = writable<NotePreview[]>([]);
	const { set, update, subscribe } = store;

	const fetchNotes = async () => {
		const notesPreviews = await webNotesServer.notesService.notesAllPreviewsGet();
		set(notesPreviews);
		return notesPreviews;
	};

	const updateColor = async (id: string, color: string) =>
		update((prev) =>
			prev.map((note) =>
				note._id === id ? { ...note, bookmark: { ...note.bookmark, color } } : note
			)
		);

	const getNotes = () => get(store);

	const removeOne = (id: string) => update((prev) => prev.filter((note) => note._id !== id));

	return {
		fetchNotes,
		getNotes,
		updateColor,
		removeOne,
		subscribe
	};
}

export default notesPreviewStore();
