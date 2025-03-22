<script lang="ts">
	import appStore from '$lib/stores/app.store';
	import type { NoteSelectedStore } from '$lib/stores/noteSelected.store';
	import noteSelectedStore from '$lib/stores/noteSelected.store';
	import Note from './note.svelte';
	import NoteSettings from './noteSettings.svelte';
	import SelectedNotesMenu from './selectedNotesMenu.svelte';

	let { notes, selectedNoteId }: NoteSelectedStore = $props();
	let selectedNote = $derived.by(() => notes.find((note) => note._id === selectedNoteId)!);

	let settingsMenu = $state<{ noteId: string | null; isOpen: boolean }>({
		noteId: null,
		isOpen: false
	});

	function onSettingsOpen(noteId: string) {
		noteSelectedStore.select(noteId);
		settingsMenu = { noteId, isOpen: true };
		appStore.setGlobalDimmer(true);
	}

	function onCloseSettings() {
		settingsMenu = { noteId: null, isOpen: false };
		appStore.setGlobalDimmer(false);
	}
</script>

<div class="wrapper_k">
	<SelectedNotesMenu
		bookmarks={notes.map((note) => ({ ...note.bookmark, _id: note._id }))}
		{selectedNoteId}
		{onSettingsOpen}
	/>

	{#if settingsMenu.isOpen}
		<NoteSettings note={selectedNote} {onCloseSettings} />
	{/if}
	<Note _id={selectedNote._id} text={selectedNote.text} />
</div>

<style lang="scss">
	.wrapper_k {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
</style>
