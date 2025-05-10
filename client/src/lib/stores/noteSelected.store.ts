import { get, writable } from 'svelte/store';
import type { Note, NoteUpdate } from '$lib/api/generated';
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
	const { set, update, subscribe } = store;

	const getNotes = () => get(store).notes;

	const getNote = (id: string) => {
		const selectedNote = get(store).notes.find((n) => n._id === id);
		if (!selectedNote) {
			console.error('Note not found');
			return;
		}
		return selectedNote;
	};

	const getSelectedNote = () => {
		const storeData = get(store);
		return storeData.notes.find((n) => n._id === storeData.selectedNoteId);
	};

	const select = (id: string) =>
		update((prev) => ({
			...prev,
			selectedNoteId: prev.notes.some((n) => n._id === id) ? id : prev.selectedNoteId
		}));

	const addOne = (newNote: Note) =>
		update((prev) => ({ notes: [...prev.notes, newNote], selectedNoteId: newNote._id }));

	const addExisted = async (id: string) => {
		const isNoteInStore = get(store).notes.some((note) => note._id === id);
		if (isNoteInStore) {
			select(id);
			return;
		}

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

	const updateColor = (id: string, color: string) =>
		update((prev) => ({
			...prev,
			notes: prev.notes.map((note) =>
				note._id === id ? { ...note, bookmark: { ...note.bookmark, color } } : note
			)
		}));

	const updateTitle = (id: string, title: string) => {
		update((prev) => {
			const updatedNotes = prev.notes.map((note) =>
				note._id === id ? { ...note, bookmark: { ...note.bookmark, title } } : note
			);
			return { notes: updatedNotes, selectedNoteId: prev.selectedNoteId };
		});
	};

	const updateText = (id: string, text: string) => {
		update((prev) => ({
			...prev,
			notes: prev.notes.map((note) => (note._id === id ? { ...note, text } : note))
		}));
	};

	/**
	 * Used by WS
	 */
	const updateAllNoteProperties = (id: string, updatedNote: NoteUpdate) => {
		console.log('selected - updateAllNoteProperties');
		console.log(id, updatedNote);

		update((prev) => {
			console.log(prev);
			const updatedNotes = prev.notes.map((note) =>
				note._id === id ? { ...note, ...updatedNote } : note
			);
			console.log(updatedNotes);
			return { ...prev, notes: updatedNotes };
		});
	};

	const removeOne = (id: string) =>
		update((prev) => {
			const newNotes = prev.notes.filter((n) => n._id !== id);
			const newSelectedNoteId = newNotes.length === 1 ? newNotes[0]._id : null;

			return { ...prev, notes: newNotes, selectedNoteId: newSelectedNoteId };
		});

	const clear = () => set(init);

	return {
		subscribe,
		addExisted,
		updateColor,
		updateText,
		updateAllNoteProperties,
		removeOne,
		select,
		getNote,
		updateTitle,
		addOne,
		getNotes,
		getSelectedNote,
		clear
	};
}

export default noteSelectedStore();
