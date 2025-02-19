<script lang="ts">
	import type { SelectedNotesInterface } from '$lib/stores/selectedNotes.store';
	import Note from './note.svelte';
	import SelectedNotesMenu from './selectedNotesMenu.svelte';

	let { notes, selectedNoteId }: SelectedNotesInterface = $props();
	let noteData = $derived.by(() => {
		const note = notes.find((note) => note.id === selectedNoteId);
		return { id: note!.id, text: note!.text };
	});

	// let bookmarks = $derived(selectedNotes.map((note) => note.bookmark));
</script>

<div class="wrapper">
	<SelectedNotesMenu
		bookmarks={notes.map((note) => ({ ...note.bookmark, id: note.id }))}
		{selectedNoteId}
	/>

	<Note {...noteData} />
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		/* outline: 1px solid red; */
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
	}
</style>
