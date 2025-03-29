<script lang="ts">
	import AsyncButton from '$lib/components/ui/asyncButton.svelte';
	import UserAvatar from '$lib/components/userAvatar/userAvatar.svelte';
	import noteUtils from '$lib/utils/note.utils';
	import authStore from '$lib/stores/auth.store';

	let theme = $state<'light' | 'dark' | 'system'>('dark');
	let isRequestSending = $state<boolean>(false);

	const synchronizeNotes = async () => {
		isRequestSending = true;
		await noteUtils.fetchNotes();
		isRequestSending = false;
	};
</script>

<div class="settings-container">
	<div class="header">
		{#if $authStore.user}
			<UserAvatar userName={$authStore.user.name} />
			<div class="user-info">
				<strong>{$authStore.user.name}</strong>
				<span>{$authStore.user.email}</span>
				<a href="#">Wyloguj się</a>
			</div>
		{/if}
	</div>

	<div class="section">
		<h3>Kolor</h3>
		<div class="color-options">
			<label><input type="radio" bind:group={theme} value="light" /> Jasny</label>
			<label><input type="radio" bind:group={theme} value="dark" checked /> Ciemny</label>
			<label
				><input type="radio" bind:group={theme} value="system" /> Użyj trybu mojego systemu Windows</label
			>
		</div>
	</div>

	<div class="help-section">
		<h3>Pomoc i opinie</h3>
		<AsyncButton isLoading={isRequestSending} onclick={synchronizeNotes}
			>Synchronizuj teraz</AsyncButton
		>
		<div style="padding-top: 1rem">
			<a href="#">Eksportuj notatki</a>
			<a href="#">Pomoc</a>
			<a href="#">Przekaż opinię</a>
			<a href="#">Oceń nas</a>
		</div>
	</div>

	<div class="footer">
		<p>WebNotes_by_IGI v.1.0</p>
		<p>© 2025 WebNotes_by_IGI. Wszelkie prawa zastrzeżone.</p>
	</div>
</div>

<style lang="scss">
	.settings-container {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		background: var(--main-background-color);
		color: var(--main-text-color);
		padding: 20px;
		max-width: 400px;
		border-radius: 10px;
		font-family: Arial, sans-serif;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--main-input-color);

		.user-info {
			display: flex;
			flex-direction: column;

			/* a {
				color: var(--main-accent_color_button);
				
				font-size: 14px;
			} */
		}
	}

	.section {
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--main-input-color);

		h3 {
			font-size: 16px;
			margin-bottom: 10px;
		}
	}

	.color-options {
		display: flex;
		flex-direction: column;
		gap: 5px;
		label {
			cursor: pointer;
		}
	}

	.help-section {
		padding-bottom: 0.7rem;
	}

	a {
		width: fit-content;
		color: var(--main-accent_color_button);
		display: block;
		font-size: var(--font-size-minV2);
	}

	.footer {
		font-size: 12px;
		color: var(--main-accent-color_2);
	}
</style>
