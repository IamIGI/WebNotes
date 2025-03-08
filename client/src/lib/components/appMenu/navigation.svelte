<script lang="ts">
	import ImgButton from '../ui/imgButton.svelte';
	import SvgButton from '../ui/svgButton.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import noteUtils from '$lib/utils/note.utils';
	import appStore from '$lib/stores/app.store';
</script>

<nav>
	<div class="navigation-wrapper">
		<div class="left-nav">
			{#if page.url.pathname !== '/'}
				<SvgButton src="/svg/button/back.svg" alt="back" onclick={() => goto('/')} />
				<SvgButton
					src="/svg/button/sidebar.svg"
					alt="sidebar"
					shape={'rectangular'}
					onclick={appStore.toggleHideMenuVisibility}
				/>
			{:else}
				<SvgButton src="/svg/button/add.svg" alt="add" onclick={noteUtils.createNote} />
			{/if}
		</div>
		<div class="right-nav">
			<SvgButton src="/svg/button/settings.svg" alt="settings" />
			<ImgButton src="/img/profile.JPG" alt="profile" />
			<SvgButton src="/svg/button/close.svg" alt="close" />
		</div>
	</div>
</nav>

<style lang="scss">
	nav {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		background-color: var(--main-background-color);
		padding-top: 0.5rem;
	}
	.navigation-wrapper {
		/* outline: 1px solid blue; */
		width: 100%;
		min-height: 55px;
		gap: 1rem;

		display: flex;
		justify-content: space-between;
		align-items: center;

		.left-nav {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 1rem;
		}

		.right-nav {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 1rem;
		}
	}
</style>
