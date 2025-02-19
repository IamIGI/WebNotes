<script lang="ts">
	import type { Note } from '$lib/interfaces';

	let { text, id }: Omit<Note, 'bookmark'> = $props();
</script>

<div class="wrapper">
	<textarea name="" id="" bind:value={text}></textarea>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
		/* outline: 1px solid red; */
		display: flex;
		flex-direction: column;

		textarea {
			width: 100%;
			height: 100%;
			padding: 0.5rem;
			font-size: var(--font-size-p);
			resize: none;
		}
	}
</style>
