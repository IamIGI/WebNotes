<script lang="ts">
	import SelectedNotes from '$lib/components/selectedNotes/selectedNotes.svelte';
	import SideMenu from '$lib/components/sideMenu/SideMenu.svelte';
	import notesStore from '$lib/stores/notes.store';
	import selectedNotesStore from '$lib/stores/selectedNotes.store';

	//TODO: WN-24
</script>

<div class="wrapper">
	<div class="side-menu-wrapper">
		<SideMenu
			notes={$notesStore}
			openNotesIds={$selectedNotesStore.notes.map((note) => note._id)}
		/>
	</div>
	{#if $selectedNotesStore.notes.length > 0}
		<SelectedNotes
			notes={$selectedNotesStore.notes}
			selectedNoteId={$selectedNotesStore.selectedNoteId}
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
		width: 30%;
		padding-right: 1rem;
	}
</style>
