<script lang="ts">
	import SelectedNotes from '$lib/components/selectedNotes/selectedNotes.svelte';
	import SideMenu from '$lib/components/sideMenu/SideMenu.svelte';
	import notesPreviewStore from '$lib/stores/notesPreview.store';
	import noteSelectedStore from '$lib/stores/noteSelected.store';
</script>

<div class="wrapper">
	<div class="side-menu-wrapper">
		<SideMenu
			notes={$notesPreviewStore}
			openNotesIds={$noteSelectedStore.notes.map((note) => note._id)}
		/>
	</div>
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
		display: flex;
		/* gap: 1rem; */
		padding-top: 1rem;
	}

	.side-menu-wrapper {
		min-width: 200px;
		width: 30%;
		padding-right: 1rem;
	}
</style>
