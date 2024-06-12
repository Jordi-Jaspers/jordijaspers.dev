<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { activeTab } from '$lib/components/store/localstorage.ts';

	let width = writable(0);
	let left = writable(0);

	function updateTabIndicator(tabIndex: string) {
		$activeTab = tabIndex;
		const tab = document.getElementById(`tab-${tabIndex}`);
		if (tab) {
			$width = tab.offsetWidth;
			$left = tab.offsetLeft;
		}
	}

	onMount(() => {
		updateTabIndicator('all');
	});
</script>

<nav
	id="nav-bar"
	class="mx-auto my-4 flex h-32 min-w-[375px] max-w-[1200px] flex-col items-center justify-center space-y-4 px-[3.5vw] md:my-0 md:flex-row md:justify-between"
>
	<h1 class="rainbow-text px-2 font-moranga text-3xl font-semibold">jordijaspers.dev</h1>

	<div id="navigation" class="relative z-0 flex rounded-full border-2 bg-accent px-1 py-1 dark:bg-transparent">
		<div
			class="tab-indicator absolute h-8 rounded-2xl bg-background dark:bg-accent"
			style="z-index: -1; left: {$left}px; width: {$width}px;"
		></div>
		<button id="tab-all" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator('all')}> All </button>
		<button id="tab-about" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator('about')}> About </button>
		<button id="tab-projects" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator('projects')}>
			Projects
		</button>
		<button id="tab-media" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator('media')}> Media </button>
	</div>

	<a
		href="mailto:jordijaspers@gmail.com"
		class="regular-text hidden text-sm transition-colors duration-300 ease-in hover:text-muted-foreground md:block"
	>
		Contact
	</a>
</nav>
