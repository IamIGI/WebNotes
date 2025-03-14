<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import Code from '@tiptap/extension-code';
	import type { Note } from '$lib/api/generated';
	import noteUtils from '$lib/utils/note.utils';
	import appUtils from '../../../utils/app.utils';
	import appStore from '$lib/stores/app.store';

	let { text, _id }: Omit<Note, 'bookmark' | 'updatedAt' | 'createdAt'> = $props();

	let noteId = $state(_id);
	let element: HTMLDivElement | null = $state(null);
	let editor: Editor | null = $state(null);

	onMount(() => {
		if (element) {
			editor = new Editor({
				element,
				extensions: [StarterKit, Underline, Code],
				content: text,
				// onTransaction: () => {
				// 	// Force re-render so that `editor.isActive` works as expected.
				// 	editor = editor;
				// 	console.log(editor?.getHTML());
				// }
				onUpdate: ({ editor }) => {
					const updatedNote = editor.getHTML();
					debouncedUpdateText(_id, updatedNote);
				}
			});
		}
	});

	$effect(() => {
		if (_id !== noteId) {
			editor && editor.commands.setContent(text);
			noteId = _id;
		}
	});

	const debouncedUpdateText = appUtils.debounce((id: string, updatedNote: string) => {
		noteUtils.updateText(id, updatedNote);
	}, appStore.getParameter().debounceTimeToSaveNote);

	onDestroy(async () => {
		//DB is updated, but after the data is fetched from db, so we get obsolete data in note previews
		debouncedUpdateText.cancel();
		const updatedNote = editor?.getHTML();
		if (updatedNote) {
			await noteUtils.updateText(noteId, updatedNote, { onNoteClose: true });
		}
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
				onclick={() => editor?.chain().focus().toggleBold().run()}
				class:active={editor?.isActive('bold')}
			>
				B
			</button>
			<button
				onclick={() => editor?.chain().focus().toggleItalic().run()}
				class:active={editor?.isActive('italic')}
			>
				I
			</button>
			<button
				onclick={() => editor?.chain().focus().toggleUnderline().run()}
				class:active={editor?.isActive('underline')}
			>
				U
			</button>
			<button
				onclick={() => editor?.chain().focus().toggleCode().run()}
				class:active={editor?.isActive('code')}
			>
				<code>{`</>`}</code>
			</button>
		</div>
	{/if}
</div>

<style lang="scss">
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

		:global(.ProseMirror code) {
			background-color: #697566; /* Dark background */
			color: #f8f8f2; /* Light text */
			font-family: monospace;
			padding: 5px 2px;

			$fontSize: calc(var(--font-size-p) - 3px);
			line-height: $fontSize;
			font-size: $fontSize;
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
