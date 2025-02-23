<script lang="ts">
	import appStore from '$lib/stores/app.store';
	import type { SelectedNotesStore } from '$lib/stores/selectedNotes.store';
	import Note from './note.svelte';
	import NoteSettings from './noteSettings.svelte';
	import SelectedNotesMenu from './selectedNotesMenu.svelte';

	let { notes, selectedNoteId }: SelectedNotesStore = $props();
	let selectedNote = $derived.by(() => {
		const note = notes.find((note) => note._id === selectedNoteId)!;
		return { _id: note._id, text: note.text };
	});
	let settingsMenu = $state<{ noteId: string | null; isOpen: boolean }>({
		noteId: null,
		isOpen: false
	});

	function onSettingsOpen(noteId: string) {
		console.log('onSettingsOpen');

		settingsMenu = { noteId, isOpen: true };
		appStore.setGlobalDimmer(true);

		console.log(settingsMenu);
	}

	function onCloseSettings() {
		settingsMenu = { noteId: null, isOpen: false };
		appStore.setGlobalDimmer(false);
	}
</script>

<div class="wrapper">
	<SelectedNotesMenu
		bookmarks={notes.map((note) => ({ ...note.bookmark, _id: note._id }))}
		{selectedNoteId}
		{onSettingsOpen}
	/>

	{#if settingsMenu.isOpen}
		<NoteSettings _id={settingsMenu.noteId!} {onCloseSettings} />
	{/if}
	<Note {...selectedNote} />
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		width: 100%;
		/* outline: 1px solid red; */
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
	}
</style>
