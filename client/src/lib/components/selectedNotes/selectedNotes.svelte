<script lang="ts">
	import type { SelectedNotesStore } from '$lib/stores/selectedNotes.store';
	import Note from './note.svelte';
	import SelectedNotesMenu from './selectedNotesMenu.svelte';

	let { notes, selectedNoteId }: SelectedNotesStore = $props();
	let selectedNote = $derived.by(() => {
		const note = notes.find((note) => note._id === selectedNoteId)!;
		return { _id: note._id, text: note.text };
	});
</script>

<div class="wrapper">
	<SelectedNotesMenu
		bookmarks={notes.map((note) => ({ ...note.bookmark, _id: note._id }))}
		{selectedNoteId}
	/>
	<Note {...selectedNote} />
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
