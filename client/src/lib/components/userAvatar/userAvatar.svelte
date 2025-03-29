<script lang="ts">
	let { userName, size = 'medium' }: { userName: string; size?: 'small' | 'medium' } = $props();
</script>

<div class="avatar" class:small={size === 'small'} class:medium={size === 'medium'}>
	{userName[0]}
</div>

<style lang="scss">
	.avatar {
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
		font-weight: 700;

		background: var(--main-second-color);
		color: var(--main-text-color);
	}

	.medium {
		$size: 60px;
		width: $size;
		height: $size;
		font-size: var(--font-size-h2);
	}

	.small {
		$size: 40px;
		width: $size;
		height: $size;
		font-size: var(--font-size-h3);
	}
</style>
