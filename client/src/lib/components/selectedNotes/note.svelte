<script lang="ts">
	import type { Note } from '$lib/api/generated';
	import TipTap from '../ui/TipTap.svelte';

	let { text, _id }: Omit<Note, 'bookmark' | 'updatedAt' | 'createdAt'> = $props();
</script>

<div class="note-wrapper">
	<TipTap {text} {_id} />
</div>

<style lang="scss">
	.note-wrapper {
		width: 100%;
		height: calc(100% - 45px);

		display: flex;
		flex-direction: column;
	}
</style>
