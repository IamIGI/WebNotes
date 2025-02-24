import { get, writable } from 'svelte/store';
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

	const select = (id: string) =>
		update((prev) => ({
			...prev,
			selectedNoteId: prev.notes.some((n) => n._id === id) ? id : prev.selectedNoteId
		}));

	const addNew = async () => {};

	const addExisted = async (id: string) => {
		const isNoteInStore = get(store).notes.some((note) => note._id === id);
		if (isNoteInStore) return;

		const note = await webNotesServer.notesService.notesIdGet(id);
		if (!note) return;

		update((prev) => {
			//When already opened, then select it again
			if (prev.notes.some((storedNote) => storedNote._id === id)) {
				return { ...prev, selectedNoteId: id };
			}

			if (prev.notes.length === 2) {
				// replace last note
				const index = prev.notes.findIndex((n) => n._id === prev.selectedNoteId);
				if (index !== -1) {
					const newNotes = [...prev.notes];
					newNotes[index] = note;
					return { ...prev, notes: newNotes, selectedNoteId: id };
				}
			} else {
				//add new note
				return { ...prev, notes: [...prev.notes, note], selectedNoteId: id };
			}

			return prev;
		});
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
			const newNotes = prev.notes.filter((n) => n._id !== id);
			const newSelectedNoteId = newNotes.length === 1 ? newNotes[0]._id : null;

			return { ...prev, notes: newNotes, selectedNoteId: newSelectedNoteId };
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
