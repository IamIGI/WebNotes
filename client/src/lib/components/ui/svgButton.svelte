<script lang="ts">
	import { base } from '$app/paths';

	export let src: string;
	export let alt: string;

	const handleClick = () => console.log('click');
</script>

<button class="media-icon" on:click={() => handleClick()}>
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
