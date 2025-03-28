<script lang="ts">
	import authApi from '$lib/api/auth.api';
	import AsyncButton from '$lib/components/ui/asyncButton.svelte';

	let { data } = $props();
	const { linkIsValid } = data;

	let password = $state<string>('');
	let confirmPassword = $state<string>('');
	let isRequestSending = $state<boolean>(false);
	let errorMsg = $state<string>('');
	let successMsg = $state<string>('');

	async function handleReset(event: Event) {
		event.preventDefault();
		errorMsg = '';
		successMsg = '';

		if (password !== confirmPassword) {
			errorMsg = 'Passwords do not match';
			return;
		}
		if (password.length < 6) {
			errorMsg = 'Password must be at least 6 characters';
			return;
		}

		try {
			isRequestSending = true;
			await authApi.resetPassword({ verificationCode: data.code, password }); // Replace with your API
			successMsg = 'Password reset successful!';
		} catch (e) {
			errorMsg = 'Something went wrong. Please try again.';
		} finally {
			isRequestSending = false;
		}
	}
</script>

<div class="wrapper">
	<div class="title-container">
		<h2>Reset your password</h2>
	</div>

	{#if linkIsValid}
		{#if successMsg}
			<p class="success-msg">{successMsg}</p>
		{:else}
			<form onsubmit={handleReset}>
				<div class="error-box"><p>{errorMsg}</p></div>

				<div class="input-box">
					<input type="password" bind:value={password} placeholder="New Password" required />
					<ul class="hint"><li>Must be at least 6 characters long</li></ul>
				</div>

				<div class="input-box">
					<input
						type="password"
						bind:value={confirmPassword}
						placeholder="Confirm Password"
						required
					/>

					<ul class="hint">
						{#if password.length >= 6 && confirmPassword.length >= 6 && password !== confirmPassword}
							<li style="color: rgb(193, 71, 71);">Passwords have to be the same</li>
						{/if}
					</ul>
				</div>

				<AsyncButton
					type="submit"
					disabled={isRequestSending || password.length < 6 || confirmPassword.length < 6}
					isLoading={isRequestSending}
				>
					Reset Password
				</AsyncButton>
			</form>
		{/if}
	{:else}
		<div class="error-stack">
			<p class="subtext">The link is either invalid or expired.</p>
			<a href="/password/forgot" class="reset-link">Request a new password reset link</a>
		</div>
	{/if}

	<p>Go back to <a href="/login">Log in</a> or <a href="/register">Register</a></p>
</div>

<style lang="scss">
	.wrapper {
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
		text-align: center;
		h2 {
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

		.hint {
			height: 20px;
			padding: 0.2rem 0 0 1.3rem;
			margin: 0;
			color: gray;

			li {
				font-size: var(--font-size-minV2);
			}
		}
	}

	a {
		color: darkgreen;
		text-decoration: none;
		font-weight: bold;
		&:hover {
			filter: brightness(1.2);
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

	.success-msg {
		font-weight: 600;
		color: green;
	}

	.error-stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		text-align: center;
	}

	.subtext {
		color: #a0aec0;
	}

	.reset-link {
		color: darkgreen;
		text-decoration: underline;
		font-weight: 500;
		transition: color 0.2s ease;

		&:hover {
			filter: brightness(1.2);
		}
	}
</style>
