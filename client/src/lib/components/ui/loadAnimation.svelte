<script lang="ts">
	import { onMount } from 'svelte';

	let { texts, time }: { texts?: string[]; time?: number } = $props();

	let displayedText = $state<string>(texts && texts?.length > 0 ? texts[0] : '');

	onMount(() => {
		if (time && texts && texts.length > 0) {
			setInterval(() => {
				const previousIndex = texts.findIndex((t) => t === displayedText)!;
				const newIndex = previousIndex + 1 < texts.length ? previousIndex + 1 : 0;
				displayedText = texts[newIndex];
			}, time * 1000);
		}
	});
</script>

<div class="wrapper">
	<div class="loader"></div>
	<h4>{displayedText}</h4>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
	.loader {
		height: 60px;
		aspect-ratio: 2;
		border-bottom: 3px solid #0000;
		background: linear-gradient(90deg, #524656 50%, #0000 0) -25% 100%/50% 3px repeat-x border-box;
		position: relative;
		animation: l3-0 0.75s linear infinite;
	}
	.loader:before {
		content: '';
		position: absolute;
		inset: auto 42.5% 0;
		aspect-ratio: 1;
		border-radius: 50%;
		background: #0c750c;
		animation: l3-1 0.75s cubic-bezier(0, 900, 1, 900) infinite;
	}
	@keyframes l3-0 {
		to {
			background-position: -125% 100%;
		}
	}
	@keyframes l3-1 {
		0%,
		2% {
			bottom: 0%;
		}
		98%,
		to {
			bottom: 0.1%;
		}
	}
</style>
