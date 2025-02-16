<script lang="ts">
	import { notesPreview } from '$lib/mocks';
	import NotePreview from './notePreview.svelte';

	interface Props {
		isSideMenu?: boolean;
	}
	let { isSideMenu = false }: Props = $props();
</script>

<div class="list-wrapper">
	{#each notesPreview.slice(undefined, 10) as note}
		<NotePreview {note} {isSideMenu} />
	{/each}
</div>

<style lang="scss">
	.list-wrapper {
		width: 100%;
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		max-height: calc(100vh - 180px);
		overflow: auto;

		padding-right: 0.5rem;
		scrollbar-gutter: stable; // ensures space for the scrollbar even when it’s not visible.
	}
</style>
