<script lang="ts">
	import Navigation from '$lib/components/appMenu/navigation.svelte';
	import GlobalDimmer from '$lib/components/globalDimmer.svelte';
	import WebSocketClient from '$lib/services/wsClient.service';
	import appStore from '$lib/stores/app.store';
	import '$lib/styles/global.scss';
	import { onDestroy } from 'svelte';

	let { children } = $props();

	let wsClient = new WebSocketClient('ws://localhost:4000');
	wsClient.connect();

	onDestroy(() => {
		wsClient.disconnect();
	});
</script>

<main>
	<Navigation />
	<div class="main-container">
		{@render children()}
	</div>
	{#if $appStore.globalDimmer}
		<GlobalDimmer />
	{/if}
</main>

<style lang="scss">
	main {
		min-width: var(--min-width);

		width: 100%;
		height: 100%;
		padding: 0 0.7rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		position: relative;
	}

	.main-container {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: calc(100vh - 55px);
		padding-bottom: 0.5rem;
	}
</style>
