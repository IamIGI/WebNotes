<script lang="ts">
	import NotePreview from './notePreview.svelte';
	import type { NotePreview as NotePreviewInterface } from '$lib/api/generated';

	interface Props {
		notes: NotePreviewInterface[];
		openNotesIds: string[];
		isSideMenu?: boolean;
		searchTerm: string;
	}
	let { notes, openNotesIds, isSideMenu = false, searchTerm }: Props = $props();
</script>

<div class="list-wrapper">
	{#each notes as note}
		<NotePreview {searchTerm} {note} isOpen={openNotesIds.includes(note._id)} {isSideMenu} />
	{/each}
</div>

<style lang="scss">
	.list-wrapper {
		height: 100%;
		width: 100%;
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		/* max-height: calc(100vh - 150px); */
		overflow-y: auto;

		padding-right: 0.5rem;
		scrollbar-gutter: stable; // ensures space for the scrollbar even when it’s not visible.
	}
</style>
