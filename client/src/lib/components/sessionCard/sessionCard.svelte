<script lang="ts">
	import type { Session } from '$lib/api/generated';

	type Props = Omit<Session, 'userId' | 'expiresAt'> & {
		onSessionDelete: (id: string) => void;
	};

	let { _id, createdAt, isCurrent, userAgent, onSessionDelete }: Props = $props();
</script>

<div class="session-card">
	<div class="session-info">
		<p class="session-date">
			{new Date(createdAt).toLocaleString('en-US')}
			{isCurrent && ' (current session)'}
		</p>
		<p class="session-user-agent">{userAgent}</p>
	</div>
	{#if !isCurrent}
		<button class="delete-btn" title="Delete Session" onclick={() => onSessionDelete(_id)}>
			&times;
		</button>
	{/if}
</div>

<style lang="scss" scoped>
	.session-card {
		padding: 12px;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.session-info {
		flex: 1;
	}

	.session-date {
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	.session-user-agent {
		color: #718096;
		font-size: calc(var(--font-size-p) - 1px);
	}

	.delete-btn {
		font-size: 1.5rem;
		color: #e53e3e;
		background: none;
		border: none;
		cursor: pointer;
		align-self: center;

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
</style>
