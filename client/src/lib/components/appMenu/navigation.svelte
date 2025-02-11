<script lang="ts">
	import ImgButton from '../ui/imgButton.svelte';
	import SvgButton from '../ui/svgButton.svelte';
</script>

<div class="navigation-wrapper">
	<div class="left-nav">
		<SvgButton src="/svg/button/add.svg" alt="add" />
	</div>
	<div class="right-nav">
		<SvgButton src="/svg/button/settings.svg" alt="settings" />
		<ImgButton src="/img/profile.JPG" alt="profile" />
		<SvgButton src="/svg/button/close.svg" alt="close" />
	</div>
</div>

<style lang="scss">
	.navigation-wrapper {
		/* outline: 1px solid blue; */
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
</style>
