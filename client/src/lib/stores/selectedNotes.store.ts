import type { Note } from '$lib/interfaces';
import { get, writable } from 'svelte/store';
import { notes as notesMock } from '$lib/mocks';

export interface SelectedNotesInterface {
	notes: Note[];
	selectedNoteId: string | null;
}

const init: SelectedNotesInterface = {
	notes: [],
	selectedNoteId: null
};

function selectedNotesStore() {
	const store = writable<SelectedNotesInterface>(init);
	const { update, subscribe } = store;

	const add = (id: string) =>
		update((prev) => {
			const note = notesMock.find((n) => n.id === id);
			if (!note) {
				console.error(`Note not found, id: ${id}`);
				return prev;
			}
			if (get(store).notes.find((storedNote) => storedNote.id === id)) {
				prev.selectedNoteId = id;
				return prev;
			}

			if (get(store).notes.length === 2) {
				const index = prev.notes.findIndex((note) => note.id === prev.selectedNoteId);

				if (index !== -1) {
					prev.notes[index] = note;
					prev.selectedNoteId = id;
				}
				return prev;
			} else {
				// add new note
				prev.selectedNoteId = id;
				prev.notes.push(note);
				return prev;
			}
		});

	const remove = (id: string) =>
		update((prev) => {
			prev.notes = prev.notes.filter((n) => n.id !== id);
			if (prev.notes.length === 1) {
				prev.selectedNoteId = prev.notes[0].id;
			} else {
				prev.selectedNoteId = null;
			}
			return prev;
		});

	const select = (id: string) =>
		update((prev) => {
			const selectedNote = prev.notes.find((n) => n.id === id);
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
