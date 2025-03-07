<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { NotePreview } from '$lib/api/generated';
	import noteUtils from '$lib/utils/note.utils';
	import type { derived } from 'svelte/store';
	import Bookmark from './bookmark.svelte';

	interface Props {
		note: NotePreview;
		isOpen: boolean;
		isSideMenu: boolean;
		searchTerm: string;
	}
	let { note, isOpen, isSideMenu, searchTerm }: Props = $props();

	async function navigate() {
		await noteUtils.openNote(note._id);
		if (page.url.pathname === '/') {
			goto('/display-notes');
		}
	}

	let highlightedText = $state(note.textPreview);
	$effect(() => {
		highlightedText =
			note.textPreview && searchTerm.length > 3
				? note.textPreview.replace(
						new RegExp(`(${searchTerm})`, 'gi'),
						'<span style="background-color: green; font-weight: bold">$1</span>'
					)
				: note.textPreview;
	});
</script>

<button class="note-container" onclick={navigate}>
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
