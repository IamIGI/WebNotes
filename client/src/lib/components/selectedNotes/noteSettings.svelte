<script lang="ts">
	import { base } from '$app/paths';
	import type { Note } from '$lib/api/generated';
	import { bookmarkColors } from '$lib/mocks';
	import noteUtils from '$lib/utils/note.utils';
	import { onDestroy, onMount } from 'svelte';
	interface Props {
		note: Note;
		onCloseSettings: () => void;
	}
	let { note, onCloseSettings }: Props = $props();
	let wrapper: HTMLElement | null = null;
	let onMountTimer: NodeJS.Timeout;

	async function deleteNote(id: string) {
		noteUtils.removeOneNote(id);
		onCloseSettings();
	}

	async function updateColor(note: Note, color: string) {
		noteUtils.updateColor(note, color);
		onCloseSettings();
	}

	// Function to detect clicks outside the component
	function handleClickOutside(event: MouseEvent) {
		if (wrapper && !wrapper.contains(event.target as Node)) {
			onCloseSettings();
		}
	}

	onMount(() => {
		onMountTimer = setTimeout(() => document.addEventListener('click', handleClickOutside), 300);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
		clearTimeout(onMountTimer);
	});
</script>

<div class="wrapper" bind:this={wrapper}>
	<div class="colors">
		{#each bookmarkColors as color}
			<button
				aria-label="change_color"
				class="color-item"
				style="background-color: {color}"
				onclick={() => updateColor(note, color)}
			></button>
		{/each}
	</div>
	<div class="settings">
		<button class="setting-item" onclick={() => deleteNote(note._id)}>
			<img src={`${base}/svg/button/delete.svg`} alt="remove note" class="svg-icon" />
			<span>Usuń notakę</span>
		</button>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 250px;
		position: absolute;
		top: 51px;
		right: 0;
		z-index: 2;
	}

	.colors {
		width: 100%;
		display: flex;
		height: 40px;

		.color-item {
			width: 20%;
			height: 100%;

			&:hover {
				filter: contrast(160%);
			}
		}
	}

	.settings {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		.setting-item {
			width: 100%;
			height: 50px;
			padding: 0 0.7rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.5em;

			background-color: var(--main-accent-color);

			$size: 20px;
			img {
				height: $size;
				width: $size;
				border-radius: 50%;
				filter: var(--white-svg-filter);
			}

			span {
				font-size: var(--font-size-p);
				padding-top: 3px;
				color: var(--main-text-color);
			}

			&:hover {
				filter: contrast(120%);
				/* color: red; */
			}
		}
	}
</style>
