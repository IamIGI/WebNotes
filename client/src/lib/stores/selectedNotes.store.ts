import type { Note } from '$lib/interfaces';
import { get, writable } from 'svelte/store';
import { notes as notesMock } from '$lib/mocks';

function selectedNotesStore() {
	const store = writable<Note[]>([]);
	const { update, subscribe } = store;

	const add = (id: string) =>
		update((prev) => {
			const note = notesMock.find((n) => n.id === id);
			if (!note) {
				console.error(`Note not found , id: ${id}`);
				return prev;
			}
			if (get(store).find((storedNote) => storedNote.id === id)) {
				console.log('Note is already displayed');
				return prev;
			}

			if (get(store).length === 2) {
				console.log('replace last selected note');
				prev[prev.length - 1] = note;
				return prev;
			} else {
				return [...prev, note];
			}
		});
	const remove = (id: string) => update((prev) => prev.filter((n) => n.id !== id));

	return {
		add,
		remove,
		subscribe
	};
}

export default selectedNotesStore();
