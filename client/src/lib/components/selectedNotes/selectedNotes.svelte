<script lang="ts">
	import type { SelectedNotesInterface } from '$lib/stores/selectedNotes.store';
	import SelectedNotesMenu from './selectedNotesMenu.svelte';

	let { notes, selectedNoteId }: SelectedNotesInterface = $props();

	// let bookmarks = $derived(selectedNotes.map((note) => note.bookmark));
</script>

<div class="wrapper">
	<SelectedNotesMenu
		bookmarks={notes.map((note) => ({ ...note.bookmark, id: note.id }))}
		{selectedNoteId}
	/>
</div>

<style lang="scss">
	.wrapper {
		flex: 1;
		/* outline: 1px solid red; */
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
</style>
