<script lang="ts">
	import type { NotePreview } from '$lib/api/generated';
	import noteUtils from '$lib/utils/note.utils';
	import ArrayOfNotes from '../notes/arrayOfNotes.svelte';
	import Search from '../search.svelte';
	import appStore from '$lib/stores/app.store';

	interface Props {
		notes: NotePreview[];
		openNotesIds: string[];
	}
	let { notes, openNotesIds }: Props = $props();
	let searchTerm = $state('');
</script>

<div class="wrapper">
	<Search
		showSearchButton={false}
		handleSearch={(text) => (searchTerm = text)}
		allNotesLoading={$appStore.fetchingAllNotes}
	/>
	<ArrayOfNotes
		{searchTerm}
		notes={searchTerm.length < $appStore.parameters.searchTermHighlight
			? notes
			: noteUtils.filterNotesBySearchTerm(notes, searchTerm)}
		{openNotesIds}
		isSideMenu={true}
	/>
</div>

<style lang="scss">
	.wrapper {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 0.5rem;
	}
</style>
