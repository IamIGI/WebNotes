<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Bookmark } from '$lib/api/generated';
	import selectedNotesStore from '$lib/stores/selectedNotes.store';
	import SvgButton from '../ui/svgButton.svelte';

	interface SelectedNoteBookmark extends Bookmark {
		_id: string;
	}
	interface Props {
		bookmarks: SelectedNoteBookmark[]; //only two bookmarks for current state
		selectedNoteId: string | null;
		onSettingsOpen: (noteId: string) => void;
	}
	let { bookmarks, selectedNoteId, onSettingsOpen }: Props = $props();

	function onNoteDelete(_id: string) {
		selectedNotesStore.remove(_id);
		if (bookmarks.length === 0) goto('/');
	}
</script>

<div class="wrapper">
	{#each bookmarks as bookmark}
		<div class="bookmark" style="background-color: {bookmark.color};">
			<button onclick={() => selectedNotesStore.select(bookmark._id)}>{bookmark.title}</button>
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
				onclick={() => onNoteDelete(bookmark._id)}
			/>
		</div>
	{/each}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: nowrap;
		overflow: hidden;
		align-items: center;
		min-height: 35px;
		width: 100%;
		border-bottom: 1px solid var(--main-accent-color_2);
		gap: 0.5rem;
		padding: 0 0.2rem;
	}

	.bookmark {
		position: relative;
		min-width: 50%;
		max-width: 50%;
		width: 50%;
		overflow: hidden;

		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 100%;

		/* padding: 1rem; */

		button {
			padding-left: 1.5rem;
			height: 100%;
			background-color: transparent;
			min-width: 80%;
			max-width: 80%;
			width: 80%;
			text-align: left;
			display: flex;
			align-items: flex-end;
			font-size: var(--font-size-h5);
			font-weight: 700;
			color: var(--main-accent-color);

			max-width: 200px; //Change on wider container
			overflow: hidden;
			white-space: nowrap;
			display: block;
			text-overflow: ellipsis;
		}
	}

	$markSize: 20px;
	.marked-as-open-white {
		position: absolute;
		top: 0;
		left: 0;
		border-right: 0px solid transparent;
		border-left: $markSize solid transparent;
		border-bottom: $markSize solid var(--main-accent-color);
	}
	.marked-as-open-black {
		position: absolute;
		top: 0;
		left: 0;
		border-right: $markSize solid transparent;
		border-left: 00px solid transparent;
		border-top: $markSize solid var(--main-background-color);
	}
</style>
