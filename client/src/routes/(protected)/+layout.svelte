<script lang="ts">
	import authStore from '$lib/stores/auth.store.js';

	let { children, data } = $props();

	$inspect('User data: ', data.user);
	$effect(() => data.user && authStore.setUser(data.user));
</script>

{@render children()}
