<script lang="ts">
	import Navigation from '$lib/components/appMenu/navigation.svelte';
	import notesStore from '$lib/stores/notes.store';
	import '$lib/styles/global.scss';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		//TODO: Add loading
		notesStore.fetchNotes();
	});
</script>

<main>
	<Navigation />
	<div class="main-container">
		{@render children()}
	</div>
</main>

<style lang="scss">
	main {
		outline: 1px solid #fff;
		max-width: var(--max-width);
		min-width: var(--min-width);
		min-height: var(--min-height);
		width: 100%;

		margin: auto;
		padding: 0 0.7rem 0.5rem 0.7rem;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		position: relative;
	}

	.main-container {
		/* outline: 2px solid green; */
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
	}
</style>
