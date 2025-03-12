<script lang="ts">
	import { base } from '$app/paths';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		src: string;
		alt: string;
		size?: string;
		shape?: 'rectangular' | 'circle';
	}
	let { src, alt, size, shape = 'circle', ...restProps }: Props = $props();
</script>

<button
	class="media-icon"
	{...restProps}
	style="border-radius: {shape === 'circle' ? '50%' : '0%'}"
>
	<img
		src={`${base}${src}`}
		{alt}
		class="svg-icon"
		style="{size && `height: ${size}; width: ${size};`} border-radius: {shape === 'circle'
			? '50%'
			: '0%'}"
	/>
</button>

<style lang="scss">
	.media-icon {
		$size: 45px;

		background-color: transparent;
		border: none;
		transition: 0.2s;

		img {
			height: $size;
			width: $size;
		}

		&:hover {
			scale: 1.2;
		}
	}
</style>
