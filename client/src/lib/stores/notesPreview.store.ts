import webNotesServer from '$lib/api/api.config';
import type { Note, NotePreview, NoteUpdate } from '$lib/api/generated';

import { get, writable } from 'svelte/store';

const mapNote_NotePreview = (note: Note): NotePreview => {
	const newNote = {
		...note,
		textPreview: note.text,
		text: undefined
	};
	return newNote;
};

function notesPreviewStore() {
	const store = writable<NotePreview[]>([]);
	const { set, update, subscribe } = store;

	const fetchNotesPreviews = async () => {
		const notesPreviews = await webNotesServer.notesService.notesAllPreviewsGet();

		set(notesPreviews);
		return notesPreviews;
	};

	const fetchNotesAll = async () => {
		const notesPreviews = await webNotesServer.notesService.notesAllGet();
		const mappedToTextPreview = notesPreviews.map((note) => mapNote_NotePreview(note));

		set(mappedToTextPreview);
		return notesPreviews;
	};

	const getNotes = () => get(store);

	const updateColor = async (id: string, color: string) =>
		update((prev) =>
			prev.map((note) =>
				note._id === id ? { ...note, bookmark: { ...note.bookmark, color } } : note
			)
		);

	const updateTitle = (id: string, title: string) => {
		update((prev) =>
			prev.map((note) =>
				note._id === id ? { ...note, bookmark: { ...note.bookmark, title } } : note
			)
		);
	};

	const updateText = async (id: string, text: string) =>
		update((prev) => prev.map((note) => (note._id === id ? { ...note, textPreview: text } : note)));

	/**
	 * Used by WS
	 */
	const updateAllNoteProperties = (id: string, updatedNote: NoteUpdate) => {
		update((prev) =>
			prev.map((note) =>
				note._id === id
					? { ...note, textPreview: updatedNote.text, bookmark: updatedNote.bookmark }
					: note
			)
		);
	};

	const removeOne = (id: string) => update((prev) => prev.filter((note) => note._id !== id));

	const selected = (id: string) =>
		update((prev) => {
			const note = prev.find((note) => note._id === id);
			if (!note) return prev;

			const index = prev.findIndex((note) => note._id === id);
			const newNotes = [...prev];
			newNotes.splice(index, 1);
			newNotes.unshift(note);

			return newNotes;
		});

	const addOne = (newNote: Note) => update((prev) => [mapNote_NotePreview(newNote), ...prev]);

	const clear = () => set([]);

	return {
		subscribe,
		fetchNotesAll,
		fetchNotesPreviews,
		getNotes,
		updateColor,
		updateTitle,
		updateText,
		updateAllNoteProperties,

		removeOne,
		selected,
		addOne,
		clear
	};
}

export default notesPreviewStore();
