import webNotesServer from '$lib/api/api.config';
import type { Note, NotePreview, NoteUpdate } from '$lib/api/generated';
import notesPreviewStore from '$lib/stores/notesPreview.store';
import noteSelectedStore from '$lib/stores/noteSelected.store';
import appStore from '$lib/stores/app.store';
import { bookmarkColors } from '$lib/mocks';
import { page } from '$app/state';
import { goto } from '$app/navigation';

async function fetchNotes() {
	return notesPreviewStore.fetchNotesPreviews().then((data) => {
		// Render  UI after  first fetch
		setTimeout(async () => {
			appStore.setFetchingAllNotesStatus(true);
			await notesPreviewStore.fetchNotesAll(); // Start the second fetch in the background
			appStore.setFetchingAllNotesStatus(false);
		}, 0);

		return data;
	});
}

async function createNote() {
	const color = bookmarkColors[Math.floor(Math.random() * bookmarkColors.length)];
	const note = await webNotesServer.notesService.notesPost({
		bookmark: { title: 'Happy Note', color },
		text: ''
	});
	notesPreviewStore.addOne(note);
	noteSelectedStore.addOne(note);
	if (page.url.pathname === '/') goto('/display-notes');
}

async function openNote(id: string) {
	//Update stores
	await noteSelectedStore.addExisted(id);
	notesPreviewStore.selected(id);
	if (page.url.pathname === '/') goto('/display-notes');

	//Update database
	await webNotesServer.notesService.notesOpenedIdPut(id);
}

async function updateColor(note: Note, color: string) {
	if (note.bookmark.color !== color) {
		//Update stores
		noteSelectedStore.updateColor(note._id, color);
		notesPreviewStore.updateColor(note._id, color);
		//Update database
		const payload: NoteUpdate = { bookmark: { ...note.bookmark, color }, text: note?.text };
		await webNotesServer.notesService.notesIdPut(payload, note._id);
	}
}

async function updateTitle(id: string, title: string) {
	const note = noteSelectedStore.getNote(id);
	if (note.bookmark.title !== title) {
		//Update stores
		noteSelectedStore.updateTitle(note._id, title);
		notesPreviewStore.updateTitle(note._id, title);
		//Update database
		const payload: NoteUpdate = { bookmark: { ...note.bookmark, title }, text: note?.text };
		await webNotesServer.notesService.notesIdPut(payload, id);
	}
}

async function removeOneNote(id: string) {
	//Update stores
	noteSelectedStore.removeOne(id);
	notesPreviewStore.removeOne(id);
	//Update database
	await webNotesServer.notesService.notesIdDelete(id);
}

function filterNotesBySearchTerm(notesPreviews: NotePreview[], searchTerm: string) {
	return notesPreviews.filter((note) =>
		note.textPreview.toLowerCase().includes(searchTerm.toLowerCase())
	);
}

export default {
	fetchNotes,
	updateColor,
	updateTitle,
	removeOneNote,
	filterNotesBySearchTerm,
	openNote,
	createNote
};
