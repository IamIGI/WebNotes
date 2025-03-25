<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	console.log(data.params);
</script>

<div class="container">
	{#if isPending}
		<div class="spinner"></div>
	{:else}
		<div class="content">
			<div class="alert {isSuccess ? 'success' : 'error'}">
				{isSuccess ? 'Email Verified!' : 'Invalid Link'}
			</div>

			{#if isError}
				<p class="error-text">
					The link is either invalid or expired.
					<a href="/password/forgot">Get a new link</a>
				</p>
			{/if}

			<button on:click={() => goto('/')}>Back to home</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.content {
		text-align: center;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.alert {
		padding: 12px;
		border-radius: 5px;
		font-weight: bold;
		&.success {
			background-color: #d4edda;
			color: #155724;
		}
		&.error {
			background-color: #f8d7da;
			color: #721c24;
		}
	}

	.error-text {
		color: #666;
		a {
			color: #007bff;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-top: 4px solid #007bff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	button {
		margin-top: 10px;
		padding: 8px 16px;
		border: none;
		background-color: #007bff;
		color: white;
		border-radius: 5px;
		cursor: pointer;
		&:hover {
			background-color: #0056b3;
		}
	}
</style>
