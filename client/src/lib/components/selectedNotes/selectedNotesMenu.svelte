<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Bookmark } from '$lib/api/generated';
	import noteSelectedStore from '$lib/stores/noteSelected.store';
	import noteUtils from '$lib/utils/note.utils';
	import SvgButton from '../ui/svgButton.svelte';

	interface SelectedNoteBookmark extends Bookmark {
		_id: string;
	}
	interface Props {
		bookmarks: SelectedNoteBookmark[]; // only two bookmarks for current state
		selectedNoteId: string | null;
		onSettingsOpen: (noteId: string) => void;
	}
	let { bookmarks, selectedNoteId, onSettingsOpen }: Props = $props();

	let editingBookmarkTitleId = $state<string | null>(null);
	let editTitleInputRef = $state<HTMLInputElement | null>(null);

	function onNoteClose(_id: string) {
		noteSelectedStore.removeOne(_id);
		if (bookmarks.length === 0) goto('/');
	}

	function editTitle(bookmark: SelectedNoteBookmark) {
		editingBookmarkTitleId = bookmark._id;

		// Wait for DOM update and focus input
		setTimeout(() => {
			if (editTitleInputRef) {
				editTitleInputRef.focus();
			}
		}, 0);
	}

	function updateTitle(editedTitle: string) {
		noteUtils.updateTitle(editingBookmarkTitleId!, editedTitle);
		editingBookmarkTitleId = null;
	}
</script>

<div class="wrapper-selected-menu">
	{#each bookmarks as bookmark}
		{#if !editingBookmarkTitleId || editingBookmarkTitleId === bookmark._id}
			<!-- Show only the editing bookmark or both if nothing is being edited -->
			<div
				class="bookmark {editingBookmarkTitleId === bookmark._id ? 'full-width' : ''}"
				style="background-color: {bookmark.color};"
			>
				{#if editingBookmarkTitleId === bookmark._id}
					<input
						type="text"
						bind:this={editTitleInputRef}
						bind:value={bookmark.title}
						onblur={() => (editingBookmarkTitleId = null)}
						onkeydown={(e) => e.key === 'Enter' && updateTitle(bookmark.title)}
					/>
				{:else}
					<button
						onclick={() => noteSelectedStore.select(bookmark._id)}
						ondblclick={() => editTitle(bookmark)}
					>
						{bookmark.title}
					</button>
				{/if}
				{#if bookmark._id === selectedNoteId}
					<div class="marked-as-open-white"></div>
					<div class="marked-as-open-black"></div>
				{/if}
				<SvgButton
					src="/svg/button/options.svg"
					alt="options"
					size="17px"
					onclick={() => onSettingsOpen(bookmark._id)}
				/>
				<SvgButton
					src="/svg/button/close.svg"
					alt="close"
					size="25px"
					onclick={() => onNoteClose(bookmark._id)}
				/>
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.wrapper-selected-menu {
		min-height: 45px;
		max-height: 45px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: nowrap;
		align-items: center;
		border-bottom: 1px solid var(--main-accent-color_2);
		gap: 0.5rem;
		padding: 0 0.2rem;
		padding-bottom: 10px;
	}

	.bookmark {
		position: relative;
		min-width: 49%;
		max-width: 49%;

		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 100%;

		@mixin title-wrapper {
			padding-left: 1.5rem;
			text-align: left;
			display: flex;
			align-items: flex-end;
			font-size: var(--font-size-h5);
			font-weight: 700;
			color: var(--main-accent-color);
			overflow: hidden;
			white-space: nowrap;
			display: block;
			text-overflow: ellipsis;

			@media screen and (max-width: 650px) {
				white-space: wrap;
				font-size: var(--font-size-minV2);
				line-height: calc(var(--font-size-minV2) + 1px);
			}
		}

		button {
			@include title-wrapper;
			$width: 80%;
			min-width: $width;
			max-width: $width;
			width: $width;
			height: 100%;
			background-color: transparent;
			max-width: 200px;
			overflow: hidden;

			@media screen and (max-width: 550px) {
				max-width: 10px;
			}
		}

		input {
			@include title-wrapper;
			color: var(--main-text-color);
			height: 90%;
			$width: 85%;
			min-width: $width;
			max-width: $width;
			width: $width;
		}
	}

	.full-width {
		min-width: 100%;
		max-width: 100%;
		width: 100%;
	}

	$markSize: 20px;
	.marked-as-open-white {
		position: absolute;
		top: 0;
		left: 0;
		border-left: $markSize solid transparent;
		border-bottom: $markSize solid var(--main-accent-color);
	}
	.marked-as-open-black {
		position: absolute;
		top: 0;
		left: 0;
		border-right: $markSize solid transparent;
		border-top: $markSize solid var(--main-background-color);
	}
</style>
