<script lang="ts">
	interface Props {
		showSearchButton?: boolean;
		handleSearch: (value: string) => void;
	}
	let { showSearchButton = true, handleSearch }: Props = $props();
</script>

<div class="search-wrapper">
	<input
		placeholder="Wyszukaj..."
		oninput={(e) => handleSearch((e.target as HTMLInputElement).value)}
	/>
	{#if showSearchButton}
		<button>
			<img class="svg-icon" src="svg/button/search.svg" alt="search" />
		</button>
	{/if}
</div>

<style lang="scss">
	.search-wrapper {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 35px;
		margin-bottom: 0.5rem;

		input {
			width: 100%;
			height: 100%;
			font-size: var(--font-size-p);
		}

		button {
			height: 100%;
			width: 50px;
			padding-left: 1%;
			background-color: var(--main-second-color);
			outline: none;
			border: none;

			img {
				height: 75%;
				width: 75%;
			}

			&:hover {
				background-color: var(--main-accent-color);
				color: var(--main-text-color);
			}
		}
	}
</style>
