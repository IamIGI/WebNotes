<script lang="ts">
	import type { Note } from '$lib/api/generated';
	import { Tipex } from '@friendofsvelte/tipex';

	import '@friendofsvelte/tipex/styles/Tipex.css';
	import '@friendofsvelte/tipex/styles/ProseMirror.css';
	import '@friendofsvelte/tipex/styles/Controls.css';
	// import '@friendofsvelte/tipex/styles/EditLink.css';
	// import '@friendofsvelte/tipex/styles/CodeBlock.css';

	let { text, _id }: Omit<Note, 'bookmark' | 'updatedAt' | 'createdAt'> = $props();

	let body = `<p>The initial html content.</p>`;
</script>

<div class="wrapper">
	<Tipex {body} controls={true} floating={false} focal={false}></Tipex>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
		/* outline: 1px solid red; */
		display: flex;
		flex-direction: column;

		:global(.tipex-editor) {
			height: 100%;
			width: 100%;
			background-color: var(--main-second-color);
			color: var(--main-text-color);
			font-size: var(--font-size-p);
		}

		:global(.tipex-controller) {
			border-top: 1px solid var(--main-accent-color_2);
			gap: 0rem;
			padding: 0.3rem;
		}
		:global(.tipex-edit-button) {
			background-color: var(--main-second-color);
			color: var(--main-accent-color_2);
			border-radius: 0;
			font-size: var(--font-size-p);

			&:hover {
				background-color: var(--main-accent-color);
			}
		}

		:global(.tipex-utilities) {
			display: none;
		}
	}
</style>
