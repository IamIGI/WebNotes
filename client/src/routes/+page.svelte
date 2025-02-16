<script lang="ts">
	import AppTitle from '$lib/components/appTitle.svelte';
	import Search from '$lib/components/search.svelte';
	import ArrayOfNotes from '$lib/components/notes/arrayOfNotes.svelte';
</script>

<div class="wrapper">
	<AppTitle />
	<Search />
	<ArrayOfNotes />
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
