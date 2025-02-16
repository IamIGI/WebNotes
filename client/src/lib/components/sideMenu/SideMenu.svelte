<script lang="ts">
	import ArrayOfNotes from '../notes/arrayOfNotes.svelte';
	import Search from '../search.svelte';
</script>

<div class="wrapper">
	<Search showSearchButton={false} />
	<ArrayOfNotes isSideMenu={true} />
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
