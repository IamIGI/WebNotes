<script lang="ts">
	import { goto } from '$app/navigation';
	import authApi from '$lib/api/auth.api';
	import SessionCard from '$lib/components/sessionCard/sessionCard.svelte';
	import authStore from '$lib/stores/auth.store.js';

	let { data } = $props();
	let sessionsArray = $state(data.sessions);

	const logout = async (e: Event) => {
		e.preventDefault();
		await authApi.logout();
		await goto('/login', { replaceState: true });
	};

	async function deleteSession(id: string) {
		console.log('Deleting session', id);
		await authApi.removeSession(id);

		sessionsArray = sessionsArray.filter((session) => session._id !== id);
	}

	async function deleteAllSessions() {
		const user = authStore.getUser();
		if (user) {
			await authApi.removeAllSession(user._id);
			await authApi.logout();
		}
	}
</script>

<div class="wrapper">
	<div class="titles">
		<h1>Aktywne sesje użytkownika</h1>
		<h4>Zamknij wybrane lub wszystkie sesje co spowoduje wylogowanie z danego urządzenia.</h4>
		<div class="button-wrapper">
			<button onclick={deleteAllSessions}>Wyloguje wszystkie</button>
		</div>
	</div>
	{#if data.success}
		<ul>
			{#each sessionsArray as sessions}
				<li>
					<SessionCard {...sessions} onSessionDelete={deleteSession} />
				</li>
			{/each}
		</ul>
	{:else}
		<div class="error">
			<p>Nie znaleziono żadnych sesji użytkownika. Zalecane ponowne zalogwanie się.</p>
			<a href="/login" onclick={logout}>Wyloguj się</a>
		</div>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		padding: 20px;
		border-radius: 10px;
		background: var(--main-background-color);
		color: var(--main-text-color);
		max-width: var(--max-width);
		gap: 1rem;

		.titles {
			padding: 0 1rem;

			.button-wrapper {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				button {
					background-color: transparent;
					color: var(--main-accent_color_button);
					font-weight: 700;
					font-size: var(--font-size-h5);
					padding: 0.3rem;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		h4 {
			padding-bottom: 1rem;
		}
	}
	ul,
	li {
		list-style-type: none;

		margin-bottom: 1rem;
	}

	.error {
		background-color: rgb(151, 91, 91);
		color: white;
		font-weight: bold;
	}
</style>
