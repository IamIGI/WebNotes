<script lang="ts">
	import type { NotePreview } from '$lib/api/generated';
	import appStore from '$lib/stores/app.store';
	import noteUtils from '$lib/utils/note.utils';
	import Bookmark from './bookmark.svelte';

	interface Props {
		note: NotePreview;
		isOpen: boolean;
		isSideMenu: boolean;
		searchTerm: string;
	}
	let { note, isOpen, isSideMenu, searchTerm }: Props = $props();

	let highlightedText = $state(note.textPreview);

	function getHighlightedText(text: string, searchTerm: string) {
		if (!searchTerm || searchTerm.length < appStore.getParameter().searchTermHighlight) return text;

		// Escape special characters and allow flexible spaces in search term
		const safeSearchTerm = searchTerm
			.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // Escape special chars
			.replace(/\s+/g, '\\s+'); // Allow multiple spaces

		const regex = new RegExp(`(${safeSearchTerm})`, 'gi');

		// Highlight the search term first
		const highlightedText = text.replace(
			regex,
			'<span style="background-color: green; font-weight: bold">$1</span>'
		);

		// Now split into words to find the search position
		const words = highlightedText.split(/\s+/);
		const searchIndex = words.findIndex((word) => word.includes('<span'));

		if (searchIndex === -1) return highlightedText; // If no match, return full highlighted text

		// Trim text while keeping at least 10 words before the match
		const wordsBeforeSearchedTerm = 10;
		const startIndex = Math.max(0, searchIndex - wordsBeforeSearchedTerm);
		return words.slice(startIndex).join(' ');
	}

	$effect(() => {
		highlightedText = getHighlightedText(note.textPreview, searchTerm);
	});
</script>

<button class="note-container" onclick={() => noteUtils.openNote(note._id)}>
	<Bookmark
		data={{
			title: note.bookmark.title,
			color: note.bookmark.color
		}}
		updatedAt={note.updatedAt}
		{isSideMenu}
	/>
	<div class="content">
		{@html highlightedText}
		{#if isOpen}
			<div class="marked-as-open-white"></div>
			<div class="marked-as-open-black"></div>
		{/if}
	</div>
</button>

<style lang="scss">
	.note-container {
		width: 100%;
		background: #fff;
		text-align: left;
	}

	.content {
		padding: 0.4rem;
		font-size: var(--font-size-minV2);
		color: var(--main-text-color);
		background-color: var(--main-second-color);
		line-height: 1.4;
		min-height: 2rem;
		max-height: 115px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		line-clamp: 5;
		-webkit-box-orient: vertical;

		position: relative;
		$markSize: 20px;
		.marked-as-open-white {
			position: absolute;
			bottom: 0;
			right: 0;
			border-left: 0px solid transparent;
			border-right: $markSize solid transparent;
			border-top: $markSize solid var(--main-accent-color);
		}
		.marked-as-open-black {
			position: absolute;
			bottom: 0;
			right: 0;
			border-left: $markSize solid transparent;
			border-right: 00px solid transparent;
			border-bottom: $markSize solid var(--main-background-color);
		}
	}
</style>
