<script lang="ts">
	import type { NotePreview } from '$lib/interfaces';
	import ArrayOfNotes from '../notes/arrayOfNotes.svelte';
	import Search from '../search.svelte';

	interface Props {
		notes: NotePreview[];
		openNotesIds: string[];
	}
	let { notes, openNotesIds }: Props = $props();
</script>

<div class="wrapper">
	<Search showSearchButton={false} />
	<ArrayOfNotes {notes} {openNotesIds} isSideMenu={true} />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 0.5rem;
	}
</style>
