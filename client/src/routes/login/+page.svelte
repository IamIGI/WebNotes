<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import AppTitle from '$lib/components/appTitle.svelte';
	import authStore from '$lib/stores/auth.store';

	let email: string = '';
	let password: string = '';

	async function handleSubmit(event: Event) {
		event.preventDefault(); // Prevent default form submission
		console.log('Logging in with:', { email, password });
		authStore.setAuth(true);
		goto('/');
	}
</script>

<div class="wrapper">
	<div class="title-container">
		<AppTitle />
	</div>

	<form on:submit={handleSubmit}>
		<input type="email" bind:value={email} placeholder="Email" />
		<!-- required -->
		<input type="password" bind:value={password} placeholder="Password" />
		<button type="submit">Login</button>
	</form>

	<button class="google-login"
		>Log in with Google
		<img src={`${base}/svg/button/google.svg`} alt="google" />
	</button>

	<p class="register-link">Not a member? <a href="#">Join now</a></p>
</div>

<style lang="scss">
	.wrapper {
		/* outline: 1px solid red; */
		margin: auto;
		width: 100%;
		max-width: 800px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		color: var(--main-text-color);

		gap: 1rem;
	}

	form {
		width: 80%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background: var(--main-second-color);
		border-radius: 0.5rem;
	}

	input {
		padding-left: 0.6rem;
		height: 40px;
		font-size: 1rem;
		border-bottom: 2px solid var(--main-text-color);
	}

	button {
		background-color: darkgreen;
		height: 40px;
		font-size: var(--font-size-p);
		color: var(--main-text-color);
		border: none;
		cursor: pointer;
		font-size: 1rem;
		border-radius: 0;
		border-radius: 0.5rem;

		&:hover {
			filter: brightness(1.1);
		}
	}

	.google-login {
		padding: 1.5rem 0;
		margin-top: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		width: 75%;

		img {
			$size: 35px;
			width: $size;
			height: $size;
		}
	}

	.register-link {
		margin-top: 20px;
		font-size: var(--font-size-p);
		color: var(--main-text-color);
	}

	.register-link a {
		color: darkgreen;
		text-decoration: none;
		font-weight: bold;
		&:hover {
			filter: brightness(1.2);
		}
	}
</style>
