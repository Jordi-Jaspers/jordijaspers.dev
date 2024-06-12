<script lang="ts">
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import {activeTab} from "$lib/components/store/localstorage.ts";

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

<nav id="nav-bar" class="space-y-4 my-4 min-w-[375px] md:my-0 max-w-[1200px] mx-auto px-[3.5vw] h-32 items-center flex flex-col justify-center md:flex-row md:justify-between">
    <h1 class="px-2 font-moranga text-3xl font-semibold rainbow-text">jordijaspers.dev</h1>

    <div id="navigation" class="relative z-0 flex px-1 py-1 bg-accent rounded-full dark:bg-transparent border-2">
        <div class="absolute bg-background dark:bg-accent rounded-2xl h-8 tab-indicator"
             style="z-index: -1; left: {$left}px; width: {$width}px;"></div>
        <button id="tab-all" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator('all')}>
            All
        </button>
        <button id="tab-about" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator('about')}>
            About
        </button>
        <button id="tab-projects" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator('projects')}>
            Projects
        </button>
        <button id="tab-media" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator('media')}>
            Media
        </button>
    </div>

    <a href="mailto:jordijaspers@gmail.com" class="hidden md:block regular-text text-sm transition-colors duration-300 ease-in hover:text-muted-foreground">
        Contact
    </a>
</nav>
