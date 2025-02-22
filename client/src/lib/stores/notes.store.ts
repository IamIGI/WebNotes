import webNotesServer from '$lib/api/api.config';
import type { NotePreview } from '$lib/api/generated';

import { get, writable } from 'svelte/store';

function notesStore() {
	const store = writable<NotePreview[]>([]);
	const { set, subscribe } = store;

	const fetchNotes = async () => {
		const notesPreviews = await webNotesServer.notesService.notesAllPreviewsGet();
		set(notesPreviews);
		return notesPreviews;
	};

	const getNotes = () => get(store);

	return {
		fetchNotes,
		getNotes,
		subscribe
	};
}

export default notesStore();
