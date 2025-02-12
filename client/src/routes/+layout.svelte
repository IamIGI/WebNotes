<script lang="ts">
	import AppMenu from '$lib/components/appMenu/appMenu.svelte';
	import '$lib/styles/global.scss';
</script>

<main>
	<div class="menu-container">
		<AppMenu />
	</div>
	<slot />
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
		gap: 1rem;

		position: relative;
	}

	.menu-container {
		position: sticky;
		top: 0;
		width: 100%;
		z-index: 1000; // Keep it above other elements
		/* padding: 0.5rem 0; */
		/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Optional shadow effect */
	}
</style>
