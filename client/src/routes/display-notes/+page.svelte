<script lang="ts">
	import SelectedNotes from '$lib/components/selectedNotes/selectedNotes.svelte';
	import SideMenu from '$lib/components/sideMenu/SideMenu.svelte';
	import notesPreviewStore from '$lib/stores/notesPreview.store';
	import noteSelectedStore from '$lib/stores/noteSelected.store';
	import appStore from '$lib/stores/app.store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (noteSelectedStore.getNotes().length === 0) goto('/');
	});
</script>

<div class="wrapper">
	{#if $appStore.hideSideMenu === false}
		<div class="side-menu-wrapper">
			<SideMenu
				notes={$notesPreviewStore}
				openNotesIds={$noteSelectedStore.notes.map((note) => note._id)}
			/>
		</div>
	{/if}
	{#if $noteSelectedStore.notes.length > 0}
		<SelectedNotes
			notes={$noteSelectedStore.notes}
			selectedNoteId={$noteSelectedStore.selectedNoteId}
		/>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		padding-top: 1rem;
	}

	.side-menu-wrapper {
		height: 100%;
		min-width: 200px;
		width: 30%;
		padding-right: 1rem;
	}
</style>
