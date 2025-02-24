<script lang="ts">
	import { onMount } from 'svelte';
</script>

<div class="wrapper"></div>

<style lang="scss">
	.wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(2px);
		z-index: 1;
		/* pointer-events: none; */
	}
</style>
