<script lang="ts">
	import type { NotePreview } from '$lib/interfaces';
	import Bookmark from './bookmark.svelte';

	interface Props {
		note: NotePreview;
	}
	let { note }: Props = $props();
</script>

<div class="note-container">
	<Bookmark
		data={{
			title: note.bookmark.title,
			color: note.bookmark.color,
			updatedAt: note.bookmark.updatedAt
		}}
	/>
	<div class="content">
		{note.textPreview}
		{#if note.isOpen}
			<div class="marked-as-open-white"></div>
			<div class="marked-as-open-black"></div>
		{/if}
	</div>
</div>

<style lang="scss">
	.note-container {
		width: 100%;
		background: #fff;
	}

	.content {
		padding: 0.4rem 1.5rem 0.4rem 0.4rem;
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
