<script lang="ts">
	import { base } from '$app/paths';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface Props extends HTMLButtonAttributes {
		src?: string;
		alt?: string;
		text?: string;
	}
	let { src, alt, text, ...restProps }: Props = $props();
</script>

<button {...restProps} class="media-icon">
	{#if src}
		<img src={`${base}${src}`} {alt} />
	{:else if text}
		<div class="text-wrapper">
			{text}
		</div>
	{/if}
</button>

<style lang="scss">
	.media-icon {
		$size: 45px;

		background-color: transparent;
		border: none;
		transition: 0.2s;
		border-radius: 50%;

		img {
			height: $size;
			width: $size;
			border-radius: 50%;
		}

		&:hover {
			scale: 1.2;
		}
	}

	.text-wrapper {
		$size: 45px;
		height: $size;
		width: $size;
		border-radius: 50%;

		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
		font-weight: 900;

		background: var(--bookmark-color-1);
		font-size: var(--font-size-h3);
		/* background-color: red; */
		color: var(--main-accent_color_button);
	}
</style>
