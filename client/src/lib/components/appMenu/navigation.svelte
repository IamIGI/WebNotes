<script lang="ts">
	import ImgButton from '../ui/imgButton.svelte';
	import SvgButton from '../ui/svgButton.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import noteUtils from '$lib/utils/note.utils';
	import appStore from '$lib/stores/app.store';
	import electronUtils from '$lib/utils/electron.utils';
	import authStore from '$lib/stores/auth.store';

	const closeApp = async () => {
		const noteText = document.querySelector('.editor p');
		if (noteText) await noteUtils.updateTextOnAppClose(JSON.stringify(noteText?.innerHTML));
		electronUtils.closeApp();
	};

	const goBack = () => {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			goto('/');
		}
	};
</script>

{#snippet windowButtons()}
	<SvgButton
		src="/svg/button/windows_hide.svg"
		alt="windows_hide"
		size="35px"
		onclick={electronUtils.hideWindow}
	/>
	<!-- <SvgButton
		src="/svg/button/windows_full_screen.svg"
		alt="windows_full_screen"
		shape="rectangular"
		size="35px"
		onclick={electronUtils.toggleFullScreen}
	/> -->
	<SvgButton src="/svg/button/close.svg" alt="close" onclick={closeApp} />
{/snippet}

{#snippet userButtons()}
	{#if $authStore.user}
		<ImgButton text={$authStore.user.name[0]} onclick={() => goto('/settings')} />
	{/if}
{/snippet}

{#snippet selectedNoteButtons()}
	<div class="sidebar-icon">
		<SvgButton
			src="/svg/button/sidebar.svg"
			alt="sidebar"
			shape={'rectangular'}
			onclick={appStore.toggleHideMenuVisibility}
		/>
	</div>
{/snippet}
{#snippet alwaysVisibleButtons()}
	<SvgButton src="/svg/button/add.svg" alt="add" onclick={() => noteUtils.createNote()} />
{/snippet}
{#snippet goBackButton()}
	<SvgButton src="/svg/button/back.svg" alt="back" onclick={goBack} />
{/snippet}
<nav>
	<div class="navigation-wrapper">
		<div class="left-nav">
			{#if ['/settings', '/sessions'].includes(page.url.pathname)}
				{@render goBackButton()}
			{/if}
			{#if page.url.pathname === '/selected'}
				{@render goBackButton()}
				{@render selectedNoteButtons()}
			{/if}
			{@render alwaysVisibleButtons()}
		</div>
		<div class="drag-area"></div>
		<div class="right-nav">
			<!-- <SvgButton src="/svg/button/settings.svg" alt="settings" onclick={() => goto('/login')} /> -->
			{#if ['/login', '/register', '/settings', '/sessions'].includes(page.url.pathname) === false}
				{@render userButtons()}
			{/if}
			{@render windowButtons()}
		</div>
	</div>
</nav>

<style lang="scss">
	nav {
		width: 100%;
		height: 55px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		background-color: var(--main-background-color);
	}
	.navigation-wrapper {
		width: 100%;
		min-height: 55px;

		display: flex;
		justify-content: space-between;
		align-items: center;

		.left-nav {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 1rem;
			padding-top: 0.5rem;
		}
		.drag-area {
			height: 100%;
			flex: 1;
			//Electron style that set this region to be draggable, allowing drag the app window
			app-region: drag;
		}

		.right-nav {
			padding-top: 0.5rem;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 0.7rem;
		}

		.sidebar-icon {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
