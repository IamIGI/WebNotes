<script lang="ts">
	import type { NoteItem } from '$lib/interfaces';

	interface Props {
		note: NoteItem;
	}

	let { note }: Props = $props();

	// Format the date
	function formatDate(date: Date): string {
		const d = new Date(date);
		const now = new Date();
		const options: Intl.DateTimeFormatOptions =
			now.getFullYear() === d.getFullYear()
				? { day: '2-digit', month: 'short' }
				: { day: '2-digit', month: 'short', year: 'numeric' };
		return d.toLocaleDateString(undefined, options);
	}
</script>

<div class="note-container">
	<div class="bookmark" style="background-color: {note.bookmark.color}">
		<span>{note.bookmark.title}</span>
		<span>{formatDate(note.bookmark.updatedAt)}</span>
	</div>
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

	.bookmark {
		height: 40px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.3rem 0 1rem;
		font-size: var(--font-size-p);
		font-weight: bold;
		color: var(--main-accent-color);

		white-space: nowrap;
		text-overflow: ellipsis;

		span:nth-of-type(2) {
			padding-top: 1rem;
			font-size: var(--font-size-minV2);
		}
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

	.text-wrapper {
		padding: 0 10px 0 15px;
		max-height: 115px;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 6;
		line-clamp: 6;
		-webkit-box-orient: vertical;
		width: 100%;
	}
</style>
