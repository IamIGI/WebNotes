<script lang="ts">
	import authApi from '$lib/api/auth.api';
	import type { CustomError } from '$lib/api/generated';
	import AppTitle from '$lib/components/appTitle.svelte';
	import AsyncButton from '$lib/components/ui/asyncButton.svelte';

	let email = $state<string>('');
	let isSuccess = $state<boolean>(false);
	let isRequestSending = $state<boolean>(false);
	let errorMsg = $state<string>(' ');

	async function handleSubmit(event: Event) {
		event.preventDefault(); // Prevent default form submission
		errorMsg = '';
		if (email.length < 3) return;
		try {
			isRequestSending = true;
			await authApi.forgotPassword(email);
			isSuccess = true;
		} catch (error) {
			isSuccess = false;
			console.log('password-forgot:', error);
			errorMsg = 'Email do not exists';
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
		<p>Reset your password</p>
	</div>
	{#if isSuccess}
		<p>Email sent! Check your inbox for further instructions</p>
	{:else}
		<form onsubmit={handleSubmit}>
			<div class="error-box">
				<p>{errorMsg}</p>
			</div>
			<div class="input-box">
				<input type="email" bind:value={email} placeholder="Email address" required />
			</div>
			<AsyncButton type="submit" disabled={email.length < 3} isLoading={isRequestSending}>
				Reset password
			</AsyncButton>
		</form>
	{/if}
	<p>Go back to <a href="/login">Log in</a> or <a href="/register">Register</a></p>
</div>

<style lang="scss">
	.wrapper {
		/* outline: 1px solid red; */
		margin: 0 auto;
		width: 100%;
		max-width: 800px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		color: var(--main-text-color);

		gap: 1rem;
	}

	.title-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* gap: 1rem; */
		text-align: center;
		p {
			width: 100%;
			font-size: var(--font-size-h2);
		}
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
			color: rgb(193, 71, 71);
			font-weight: 700;
		}
	}

	.input-box {
		width: 100%;

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

	a {
		color: darkgreen;
		text-decoration: none;
		font-weight: bold;
		&:hover {
			filter: brightness(1.2);
		}
	}
</style>
