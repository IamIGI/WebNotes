<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';

	let element: HTMLDivElement | null = null;
	let editor: Editor | null = null;

	onMount(() => {
		if (element) {
			editor = new Editor({
				element,
				extensions: [StarterKit, Underline],
				content: '<p>Hello World! 🌍️ </p>',
				onTransaction: () => {
					// Force re-render so that `editor.isActive` works as expected.
					editor = editor;
				}
			});
		}
	});

	onDestroy(() => {
		editor?.destroy();
	});
</script>

<div class="wrapper">
	<div class="editor" bind:this={element}></div>

	{#if editor}
		<div class="controls">
			<!-- <button
				on:click={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={editor?.isActive('heading', { level: 1 })}
			>
				H1
			</button>
			<button
				on:click={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={editor?.isActive('heading', { level: 2 })}
			>
				H2
			</button>
			<button
				on:click={() => editor?.chain().focus().setParagraph().run()}
				class:active={editor?.isActive('paragraph')}
			>
				P
			</button> -->
			<button
				on:click={() => editor?.chain().focus().toggleBold().run()}
				class:active={editor?.isActive('bold')}
			>
				B
			</button>
			<button
				on:click={() => editor?.chain().focus().toggleItalic().run()}
				class:active={editor?.isActive('italic')}
			>
				I
			</button>
			<button
				on:click={() => editor?.chain().focus().toggleUnderline().run()}
				class:active={editor?.isActive('underline')}
			>
				U
			</button>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		/* outline: 1px solid red; */
		height: 100%;
		width: 100%;
		background-color: var(--main-second-color);
	}
	.editor {
		padding: 0.5rem;
		/* outline: 1px solid green; */
		width: 100%;
		height: calc(100% - 50px);

		color: var(--main-text-color);

		:global(.ProseMirror) {
			height: 100%;
			outline: none;
		}
	}
	.controls {
		border-top: 1px solid var(--main-accent-color_2);
		height: 50px;
		display: flex;
		gap: 0.5rem;
		padding: 0.25rem;
	}
	button {
		padding: 0.5rem 1rem;
		background: #f0f0f0;

		border-radius: 4px;
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s;
		background-color: var(--main-second-color);
		color: var(--main-accent-color_2);
		border-radius: 0;
		font-size: var(--font-size-p);

		&:hover {
			background-color: var(--main-accent-color);
		}

		&:active {
			background: #333;
			color: #fff;
			border-color: #333;
		}
	}
</style>
