<script lang="ts">
	import type { Bookmark } from '$lib/api/generated';

	interface Props {
		data: Bookmark;
		updatedAt: string;
		isSideMenu: boolean;
	}
	let { data, isSideMenu, updatedAt }: Props = $props();

	function formatDate(date: string): string {
		const d = new Date(date);
		const now = new Date();
		const options: Intl.DateTimeFormatOptions =
			now.getFullYear() === d.getFullYear()
				? { day: '2-digit', month: 'short' }
				: { day: '2-digit', month: 'short', year: 'numeric' };
		return d.toLocaleDateString(undefined, options);
	}
</script>

<div class="bookmark" style="background-color: {data.color}">
	<h5>{data.title}</h5>
	{#if isSideMenu === false}
		<span>{formatDate(updatedAt)}</span>
	{/if}
</div>

<style lang="scss">
	.bookmark {
		height: 35px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.3rem 0 0.6rem;
		font-size: var(--font-size-p);
		font-weight: bold;
		color: var(--main-accent-color);

		white-space: nowrap;
		text-overflow: ellipsis;

		h5 {
			/* line-height: var(--font-size-p); */
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		span {
			padding-top: 1rem;
			font-size: var(--font-size-minV2);
		}
	}
</style>
