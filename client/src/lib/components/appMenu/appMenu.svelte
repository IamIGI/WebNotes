<script lang="ts">
	import Navigation from './navigation.svelte';
	import Search from './search.svelte';
</script>

<nav>
	<Navigation />
	<div class="app-title">
		<h1>WebNotes<span>by_IgI</span></h1>
	</div>
	<Search />
</nav>

<style lang="scss">
	nav {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0 0.7rem;
		gap: 0.2rem;
	}

	.app-title {
		width: 100%;
		/* padding-left: 1rem; */
		/* outline: 1px solid green; */
		height: 35px;
		h1 {
			span {
				color: var(--main-accent-color);
				font-size: var(--font-size-p);
			}
		}
	}
</style>
