<script lang="ts">
	import AppTitle from '$lib/components/appTitle.svelte';
	import Search from '$lib/components/search.svelte';
	import ArrayOfNotes from '$lib/components/notes/arrayOfNotes.svelte';
	import notesStore from '$lib/stores/notes.store';
	import selectedNotesStore from '$lib/stores/selectedNotes.store';
</script>

<div class="wrapper">
	<AppTitle />
	<Search />
	<ArrayOfNotes
		notes={$notesStore}
		openNotesIds={$selectedNotesStore.notes.map((note) => note.id)}
	/>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 0.5rem;
	}
</style>
