<script lang="ts">
	import SelectedNotes from '$lib/components/selectedNotes/selectedNotes.svelte';
	import SideMenu from '$lib/components/sideMenu/SideMenu.svelte';

	//TODO: WN-24
</script>

<div class="wrapper">
	<div class="side-menu-wrapper">
		<SideMenu />
	</div>
	<SelectedNotes />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
	}

	.side-menu-wrapper {
		width: 30%;
	}
</style>
