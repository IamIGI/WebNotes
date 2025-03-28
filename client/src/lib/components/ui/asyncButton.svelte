<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		isLoading: boolean;
	}
	let { isLoading, children, ...restProps }: Props = $props();
</script>

<button class="async-button" {...restProps}>
	{#if isLoading}
		<div class="loader-spinner"></div>
	{:else}
		{@render children?.()}
	{/if}
</button>

<style lang="scss">
	.async-button {
		width: 100%;
		background-color: var(--main-accent_color_button);
		height: 40px;
		font-size: var(--font-size-p);
		color: var(--main-text-color);
		border: none;
		cursor: pointer;
		font-size: 1rem;
		border-radius: 0;
		border-radius: 0.5rem;
	}

	.loader-spinner {
		margin: auto;
		width: 25px;
		padding: 4px;
		aspect-ratio: 1;
		border-radius: 50%;
		background: #fff;
		--_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
		-webkit-mask: var(--_m);
		mask: var(--_m);
		-webkit-mask-composite: source-out;
		mask-composite: subtract;
		animation: l3 1s infinite linear;

		@keyframes l3 {
			to {
				transform: rotate(1turn);
			}
		}
	}
</style>
