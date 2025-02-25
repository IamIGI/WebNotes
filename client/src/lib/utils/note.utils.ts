import webNotesServer from '$lib/api/api.config';
import type { Note, NoteUpdate } from '$lib/api/generated';
import notesPreviewStore from '$lib/stores/notesPreview.store';
import noteSelectedStore from '$lib/stores/noteSelected.store';

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

export default {
	updateColor,
	updateTitle,
	removeOneNote
};
