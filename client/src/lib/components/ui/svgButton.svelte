<script lang="ts">
	import { base } from '$app/paths';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		src: string;
		alt: string;
	}
	let { src, alt, ...restProps }: Props = $props();
</script>

<button class="media-icon" {...restProps}>
	<img src={`${base}${src}`} {alt} class="svg-icon" />
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
</style>
