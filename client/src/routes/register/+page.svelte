<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import authApi from '$lib/api/auth.api';
	import type { CustomError } from '$lib/api/generated';
	import AppTitle from '$lib/components/appTitle.svelte';
	import authStore from '$lib/stores/auth.store';
	import { config } from 'dotenv';

	let name = $state<string>('');
	let email = $state<string>('');
	let password = $state<string>('');
	let confirmPassword = $state<string>('');

	let isRequestSending = $state<boolean>(false);
	let errorMsg = $state<string>(' ');

	async function handleSubmit(event: Event) {
		event.preventDefault(); // Prevent default form submission
		errorMsg = '';

		try {
			isRequestSending = true;
			await authApi.register({ name, email, password, confirmPassword });
			authStore.setAuth(true); //TODO: Delete later
			goto('/', { replaceState: true }); // Ensures the navigation does not add to history stack
		} catch (error) {
			console.log('t:', error);
			errorMsg = 'Invalid Register data';
			const customError = error as CustomError;
			if (customError.dedicatedError && customError.message) {
				errorMsg = customError.message;
			}
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
		<div class="input-box">
			<input type="text" bind:value={name} placeholder="Name" />
			<ul class="hint"><li>Name be at least 3 characters long</li></ul>
		</div>
		<div class="input-box">
			<input type="email" bind:value={email} placeholder="Email" />
		</div>
		<!-- required -->
		<div class="input-box">
			<input type="password" bind:value={password} placeholder="Password" />
			<ul class="hint"><li>Must be at least 6 characters long</li></ul>
		</div>

		<div class="input-box">
			<input
				type="password"
				bind:value={confirmPassword}
				placeholder="Confirm Password"
				onkeydown={(e) => e.key === 'Enter' && handleSubmit}
			/>
			<ul class="hint">
				{#if password.length >= 6 && confirmPassword.length >= 6 && password !== confirmPassword}
					<li style="color: rgb(193, 71, 71);">Passwords have to be the same</li>
				{/if}
			</ul>
		</div>
		<button
			type="submit"
			disabled={confirmPassword !== password ||
				isRequestSending ||
				name.length < 4 ||
				email.length < 3 ||
				password.length < 3 ||
				confirmPassword.length < 3}>Register</button
		>
	</form>

	<button class="google-login"
		>Register in with Google
		<img src={`${base}/svg/button/google.svg`} alt="google" />
	</button>

	<p class="register-link">Already a member? <a href="/login">Log in</a></p>
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
			color: var(--main-alert-color);
			font-weight: 700;
		}
	}

	.input-box {
		width: 100%;

		.hint {
			height: 20px;
			padding: 0.2rem 0 0 1.3rem;
			margin: 0;
			color: gray;

			li {
				font-size: var(--font-size-minV2);
			}
		}
		input {
			width: 100%;
			padding-left: 0.6rem;
			height: 40px;
			font-size: 1rem;
			border-bottom: 2px solid var(--main-text-color);
		}
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
