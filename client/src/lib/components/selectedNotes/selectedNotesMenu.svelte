<script lang="ts">
	import type { BookmarkWithNoteId } from '$lib/interfaces';
	import selectedNotesStore from '$lib/stores/selectedNotes.store';
	import SvgButton from '../ui/svgButton.svelte';

	interface Props {
		bookmarks: BookmarkWithNoteId[]; //only two bookmarks
		selectedNoteId: string | null;
	}

	let { bookmarks, selectedNoteId }: Props = $props();
</script>

<div class="wrapper">
	{#each bookmarks as bookmark}
		<div class="bookmark" style="background-color: {bookmark.color};">
			<button><h5>{bookmark.title}</h5></button>
			{#if bookmark.id === selectedNoteId}
				<div class="marked-as-open-white"></div>
				<div class="marked-as-open-black"></div>
			{/if}
			<SvgButton
				src="/svg/button/close.svg"
				alt="close"
				size="30px"
				onclick={() => selectedNotesStore.remove(bookmark.id)}
			/>
		</div>
	{/each}
</div>

<style lang="scss">
	.wrapper {
		/* outline: 1px solid green; */
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		max-height: 35px;
		height: 35px;
		width: 100%;
		border-bottom: 1px solid var(--main-accent-color_2);
		gap: 0.5rem;
		padding: 0 0.2rem;
	}

	.bookmark {
		position: relative;
		flex: 1;
		max-width: 50%;

		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		height: 100%;

		/* padding: 1rem; */

		button {
			padding-left: 0.5rem;
			height: 100%;
			background-color: transparent;
			width: 80%;
			text-align: left;

			display: flex;
			align-items: flex-end;
			padding-bottom: 0.2rem;

			h5 {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: var(--main-accent-color);
			}
		}
	}
	/* 
	.selected-bookmark-cut {
		clip-path: polygon(0% 100%, 0% 0%, 100% 0%, 91.6% 0%, 100% 50%, 100% 100%);
	} */
	$markSize: 20px;
	.marked-as-open-white {
		position: absolute;
		top: 0;
		right: 0;
		border-left: 0px solid transparent;
		border-right: $markSize solid transparent;
		border-bottom: $markSize solid var(--main-accent-color);
	}
	.marked-as-open-black {
		position: absolute;
		top: 0;
		right: 0;
		border-left: $markSize solid transparent;
		border-right: 00px solid transparent;
		border-top: $markSize solid var(--main-background-color);
	}
</style>
