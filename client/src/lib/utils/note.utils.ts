import webNotesServer from '$lib/api/api.config';
import type { Note, NotePreview, NoteUpdate } from '$lib/api/generated';
import notesPreviewStore from '$lib/stores/notesPreview.store';
import noteSelectedStore from '$lib/stores/noteSelected.store';
import appStore from '$lib/stores/app.store';
import { bookmarkColors } from '$lib/mocks';
import { page } from '$app/state';
import { goto } from '$app/navigation';

const fetchNotes = async () => {
	return await notesPreviewStore.fetchNotesPreviews().then((data) => {
		// Render  UI after  first fetch
		setTimeout(async () => {
			appStore.setFetchingAllNotesStatus(true);
			await notesPreviewStore.fetchNotesAll(); // Start the second fetch in the background
			appStore.setFetchingAllNotesStatus(false);
		}, 0);

		return data;
	});
};
const createNote = async () => {
	const color = bookmarkColors[Math.floor(Math.random() * bookmarkColors.length)];
	const note = await webNotesServer.notesService.notesPost({
		bookmark: { title: 'Happy Note', color },
		text: ''
	});
	notesPreviewStore.addOne(note);
	noteSelectedStore.addOne(note);
	if (page.url.pathname === '/') goto('/display-notes');
};

const openNote = async (id: string) => {
	//Update stores
	await noteSelectedStore.addExisted(id);
	notesPreviewStore.selected(id);
	if (page.url.pathname === '/') goto('/display-notes');

	//Update database
	await webNotesServer.notesService.notesOpenedIdPut(id);
};

const updateColor = async (note: Note, color: string) => {
	if (note.bookmark.color !== color) {
		//Update stores
		noteSelectedStore.updateColor(note._id, color);
		notesPreviewStore.updateColor(note._id, color);
		//Update database
		const payload: NoteUpdate = { ...note, bookmark: { ...note.bookmark, color } };
		await webNotesServer.notesService.notesIdPut(payload, note._id);
	}
};

const updateTitle = async (id: string, title: string) => {
	const note = noteSelectedStore.getNote(id);
	if (note && note.bookmark.title !== title) {
		//Update stores
		noteSelectedStore.updateTitle(note._id, title);
		notesPreviewStore.updateTitle(note._id, title);
		//Update database
		const payload: NoteUpdate = { ...note, bookmark: { ...note.bookmark, title } };
		await webNotesServer.notesService.notesIdPut(payload, id);
	}
};

const updateText = async (
	id: string,
	text: string,
	params: { onNoteClose: boolean } = { onNoteClose: false }
) => {
	const note = params.onNoteClose
		? await webNotesServer.notesService.notesIdGet(id)
		: noteSelectedStore.getNote(id);

	if (note && note.text.length !== text.length) {
		//Update stores
		noteSelectedStore.updateText(note._id, text);
		notesPreviewStore.updateText(note._id, text);
		//Update database
		const payload: NoteUpdate = { ...note, text };
		await webNotesServer.notesService.notesIdPut(payload, id);
	}
};

const removeOneNote = async (id: string) => {
	//Update stores
	noteSelectedStore.removeOne(id);
	notesPreviewStore.removeOne(id);
	if (noteSelectedStore.getNotes().length === 0) goto('/');
	//Update database
	await webNotesServer.notesService.notesIdDelete(id);
};

const filterNotesBySearchTerm = (notesPreviews: NotePreview[], searchTerm: string) => {
	return notesPreviews.filter((note) =>
		note.textPreview.toLowerCase().includes(searchTerm.toLowerCase())
	);
};

const updateTextOnAppClose = async (noteText: string) => {
	const selectedNote = noteSelectedStore.getSelectedNote();
	const updatedNoteText = noteText.slice(1, -1); // remove "
	if (selectedNote?._id && noteText && selectedNote?.text !== updatedNoteText) {
		const payload: NoteUpdate = { ...selectedNote, text: updatedNoteText };
		await webNotesServer.notesService.notesIdPut(payload, selectedNote._id);
	}
};

export default {
	fetchNotes,
	updateColor,
	updateTitle,
	updateText,
	removeOneNote,
	filterNotesBySearchTerm,
	openNote,
	createNote,
	updateTextOnAppClose
};
