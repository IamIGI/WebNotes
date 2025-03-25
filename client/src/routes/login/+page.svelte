<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import authApi from '$lib/api/auth.api';
	import AppTitle from '$lib/components/appTitle.svelte';
	import authStore from '$lib/stores/auth.store';

	let email = $state<string>('');
	let password = $state<string>('');

	let isRequestSending = $state<boolean>(false);
	let errorMsg = $state<string>(' ');

	async function handleSubmit(event: Event) {
		event.preventDefault(); // Prevent default form submission
		errorMsg = '';

		try {
			isRequestSending = true;
			await authApi.login({ email, password });
			authStore.setAuth(true); //TODO: Delete later
			goto('/', { replaceState: true }); // Ensures the navigation does not add to history stack
		} catch (error) {
			errorMsg = 'Invalid email or password';
		} finally {
			isRequestSending = false;
		}
	}
</script>

<div class="wrapper">
	<div class="title-container">
		<AppTitle />
	</div>

	<form onsubmit={handleSubmit}>
		<div class="error-box">
			<p>{errorMsg}</p>
		</div>

		<input type="email" bind:value={email} placeholder="Email" required />
		<!-- required -->
		<input
			type="password"
			bind:value={password}
			placeholder="Password"
			required
			onkeydown={(e) => e.key === 'Enter' && handleSubmit}
		/>
		<a class="forgot-password" href="/password-forgot">Forgot password?</a>
		<button type="submit" disabled={email.length < 3 || password.length < 3 || isRequestSending}
			>Login</button
		>
	</form>

	<button class="google-login" disabled={isRequestSending}
		>Log in with Google
		<img src={`${base}/svg/button/google.svg`} alt="google" />
	</button>

	<p class="register-link">Not a member? <a href="/register">Join now</a></p>
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

		button {
			margin-top: 1rem;
		}
	}

	.error-box {
		height: 20px;
		p {
			width: 100%;
			text-align: center;
			color: rgb(212, 20, 20);
			font-weight: 700;
		}
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

		a {
			color: darkgreen;
			font-weight: bold;
			&:hover {
				filter: brightness(1.2);
			}
		}
	}

	.forgot-password {
		/* outline: 1px solid red; */
		width: fit-content;
		margin-left: auto;
		color: rgb(67, 164, 67);
		/* font-weight: bold; */
		&:hover {
			filter: brightness(1.2);
		}
	}
</style>
