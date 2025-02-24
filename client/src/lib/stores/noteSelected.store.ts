import { writable } from 'svelte/store';
import type { Note } from '$lib/api/generated';
import webNotesServer from '$lib/api/api.config';

export interface NoteSelectedStore {
	notes: Note[];
	selectedNoteId: string | null;
}

const init: NoteSelectedStore = {
	notes: [],
	selectedNoteId: null
};

function noteSelectedStore() {
	const store = writable<NoteSelectedStore>(init);
	const { update, subscribe } = store;

	const addNew = async () => {};

	const addExisted = async (id: string) => {
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

	const updateColor = async (id: string, color: string) =>
		update((prev) => ({
			...prev,
			notes: prev.notes.map((note) =>
				note._id === id ? { ...note, bookmark: { ...note.bookmark, color } } : note
			)
		}));

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
		addNew,
		addExisted,
		updateColor,
		remove,
		select,
		subscribe
	};
}

export default noteSelectedStore();
