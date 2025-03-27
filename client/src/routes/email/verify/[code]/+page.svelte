<script lang="ts">
	//The same approaches
	//1
	const { data } = $props();
	const { isSuccess } = data;
	//2
	// let isSuccess = page.data.isSuccess;
</script>

<div class="container">
	<div class="content">
		<div class="alert {isSuccess ? 'success' : 'error'}">
			{isSuccess ? 'Email Verified!' : 'Invalid Link'}
		</div>

		{#if !isSuccess}
			<p class="error-text">
				The link is either invalid or expired.
				<a href="/password-forgot">Get a new link</a>
			</p>
		{/if}

		<a href="/" class="back_link">Back to home</a>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		width: 100%;
	}

	.content {
		text-align: center;
		padding: 20px;
		border-radius: 8px;

		gap: 1rem;
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

	.back_link {
		color: green;
	}
</style>
