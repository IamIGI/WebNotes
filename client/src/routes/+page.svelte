<script lang="ts">
	import AppTitle from '$lib/components/appTitle.svelte';
	import Search from '$lib/components/search.svelte';
	import ArrayOfNotes from '$lib/components/notes/arrayOfNotes.svelte';
	import appStore from '$lib/stores/app.store';
	import notesPreviewStore from '$lib/stores/notesPreview.store';
	import noteSelectedStore from '$lib/stores/noteSelected.store';
	import LoadAnimation from '$lib/components/ui/loadAnimation.svelte';
	import noteUtils from '$lib/utils/note.utils';

	let searchTerm = $state('');
</script>

<div class="wrapper">
	<AppTitle />
	<Search
		handleSearch={(text) => (searchTerm = text)}
		allNotesLoading={$appStore.fetchingAllNotes}
	/>
	{#await noteUtils.fetchNotes()}
		<LoadAnimation
			time={1}
			animationType={'ball'}
			texts={[
				'Sciaganie danych...',
				'Dane uciekaja...',
				'Halo... gdzie sa?',
				'Ide ich poszukać...',
				'Tutaj są!!!'
			]}
		/>
	{:then data}
		<ArrayOfNotes
			notes={noteUtils.filterNotesBySearchTerm($notesPreviewStore, searchTerm)}
			openNotesIds={$noteSelectedStore.notes.map((note) => note._id)}
		/>
	{/await}
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 0.5rem;
	}
</style>
