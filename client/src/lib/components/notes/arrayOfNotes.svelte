<script lang="ts">
	import { notes } from '$lib/mocks';
	import NotePreview from './notePreview.svelte';
</script>

<div class="list-wrapper">
	{#each notes.slice(undefined, 10) as note}
		<a href="/display-note">
			<NotePreview {note} />
		</a>
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
