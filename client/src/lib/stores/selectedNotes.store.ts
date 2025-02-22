import { writable } from 'svelte/store';
import type { Note } from '$lib/api/generated';
import webNotesServer from '$lib/api/api.config';

export interface SelectedNotesStore {
	notes: Note[];
	selectedNoteId: string | null;
}

const init: SelectedNotesStore = {
	notes: [],
	selectedNoteId: null
};

function selectedNotesStore() {
	const store = writable<SelectedNotesStore>(init);
	const { update, subscribe } = store;

	const add = async (id: string) => {
		const note = await webNotesServer.notesService.notesIdGet(id);

		if (note) {
			update((prev) => {
				//When already opened, just select it again
				if (prev.notes.find((storedNote) => storedNote._id === id)) {
					prev.selectedNoteId = id;
					return prev;
				}

				if (prev.notes.length === 2) {
					//replace current selected note with new opened
					const index = prev.notes.findIndex((note) => note._id === prev.selectedNoteId);
					if (index !== -1) {
						prev.notes[index] = note;
						prev.selectedNoteId = id;
					}
				} else {
					// add new note
					prev.selectedNoteId = id;
					prev.notes.push(note);
				}

				return prev;
			});
		}
	};
	const remove = (id: string) =>
		update((prev) => {
			prev.notes = prev.notes.filter((n) => n._id !== id);
			if (prev.notes.length === 1) {
				prev.selectedNoteId = prev.notes[0]._id;
			} else {
				prev.selectedNoteId = null;
			}
			return prev;
		});

	const select = (id: string) =>
		update((prev) => {
			const selectedNote = prev.notes.find((n) => n._id === id);
			if (selectedNote) prev.selectedNoteId = id;
			return prev;
		});

	return {
		add,
		remove,
		select,
		subscribe
	};
}

export default selectedNotesStore();
