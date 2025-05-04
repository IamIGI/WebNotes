<script lang="ts">
	import WebSocketClient from '$lib/services/wsClient.service.js';
	import authStore from '$lib/stores/auth.store.js';
	import { onDestroy } from 'svelte';

	let { children, data } = $props();

	$effect(() => data.user && authStore.setData(data));

	let wsClient = new WebSocketClient('ws://localhost:4000', data.accessToken!);
	wsClient.connect();

	onDestroy(() => {
		wsClient.disconnect();
	});
</script>

{@render children()}
