<script lang="ts">
	import authStore from '$lib/stores/auth.store.js';

	let { children, data } = $props();

	$effect(() => data.user && authStore.setUser(data.user));
</script>

{@render children()}
