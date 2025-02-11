<script lang="ts">
	import AppMenu from '$lib/components/appMenu/appMenu.svelte';
	import '$lib/styles/global.scss';
</script>

<main>
	<AppMenu />
	<slot />
</main>

<style lang="scss">
	main {
		outline: 1px solid red;
		max-width: var(--max-width);
		min-width: var(--min-width);
		min-height: var(--min-height);
		width: 100%;
		margin: auto;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		position: relative;
	}
</style>
