<script lang="ts">
	import SelectedNotes from '$lib/components/selectedNotes/selectedNotes.svelte';
	import SideMenu from '$lib/components/sideMenu/SideMenu.svelte';
</script>

<div class="wrapper">
	<SideMenu />
	<SelectedNotes />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
	}
</style>
