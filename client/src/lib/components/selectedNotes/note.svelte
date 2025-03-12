<script lang="ts">
	import type { Note } from '$lib/api/generated';
	import TipTap from '../ui/TipTap.svelte';

	let { text, _id }: Omit<Note, 'bookmark' | 'updatedAt' | 'createdAt'> = $props();
</script>

<div class="wrapper">
	<TipTap {text} {_id} />
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
	}
</style>
