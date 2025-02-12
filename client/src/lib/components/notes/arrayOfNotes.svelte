<script lang="ts">
	import { notes } from '$lib/mocks';
	import NoteItem from './noteItem.svelte';
</script>

<div class="list-wrapper">
	{#each notes as note}
		<NoteItem {note} />
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
	}
</style>
