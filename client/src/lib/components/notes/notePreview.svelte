<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { NotePreview } from '$lib/api/generated';
	import selectedNotesStore from '$lib/stores/selectedNotes.store';
	import Bookmark from './bookmark.svelte';

	interface Props {
		note: NotePreview;
		isOpen: boolean;
		isSideMenu: boolean;
	}
	let { note, isOpen, isSideMenu }: Props = $props();

	async function navigate() {
		await selectedNotesStore.add(note._id);
		if (page.url.pathname === '/') {
			goto('/display-notes');
		}
	}
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
		{note.textPreview}
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
