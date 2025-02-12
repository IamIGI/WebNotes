<script lang="ts">
	import { base } from '$app/paths';
	interface Props {
		src: string;
		alt: string;
	}
	let { src, alt }: Props = $props();

	const handleClick = () => console.log('click');
</script>

<button class="media-icon" onclick={() => handleClick()}>
	<img src={`${base}${src}`} {alt} />
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
