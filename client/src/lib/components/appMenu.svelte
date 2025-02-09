<script lang="ts">
</script>

<nav>
	<div class="navigation-wrapper">
		<div class="left-nav"></div>
		<div class="right-nav"></div>
	</div>
	<div class="app-title">
		<h1>WebNotes<span>by_IgI</span></h1>
	</div>
</nav>

<style lang="scss">
	nav {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0 0.7rem;

		height: 80px;
	}
	.navigation-wrapper {
		outline: 1px solid blue;
		width: 100%;
		min-height: 55px;
		gap: 1rem;

		display: flex;
		justify-content: space-between;
		align-items: center;

		.left-nav {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 1rem;
		}

		.right-nav {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 1rem;
		}
	}

	.app-title {
		width: 100%;
		outline: 1px solid green;
		height: 35px;
		h1 {
			span {
				color: var(--main-accent-color);
				font-size: var(--font-size-p);
			}
		}
	}
</style>
