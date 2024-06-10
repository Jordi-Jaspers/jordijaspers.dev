<script lang="ts">
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import {activeTab} from "$lib/components/store/localstorage.ts";

    let width = writable(0);
    let left = writable(0);

    function updateTabIndicator(tabIndex: number) {
        $activeTab = tabIndex;
        const tab = document.getElementById(`tab-${tabIndex}`);
        if (tab) {
            $width = tab.offsetWidth;
            $left = tab.offsetLeft;
        }
    }

    // Run updateTabIndicator when the component is mounted
    onMount(() => {
        updateTabIndicator(0);
    });
</script>

<nav id="nav-bar" class="space-y-4 my-4 min-w-[375px] md:my-0 max-w-[1200px] mx-auto px-[3.5vw] h-32 items-center flex flex-col justify-center md:flex-row md:justify-between">
    <h1 >LOGO</h1>

    <div id="navigation" class="relative z-0 flex px-1 py-1 bg-accent rounded-full dark:bg-transparent border-2">
        <div class="absolute bg-background dark:bg-accent rounded-2xl h-8 tab-indicator"
             style="z-index: -1; left: {$left}px; width: {$width}px;"></div>
        <button id="tab-0" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator(0)}>
            All
        </button>
        <button id="tab-1" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator(1)}>
            About
        </button>
        <button id="tab-2" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator(2)}>
            Projects
        </button>
        <button id="tab-3" class="tab-button regular-text font-semibold" on:click={() => updateTabIndicator(3)}>
            Media
        </button>
    </div>

    <a href="mailto:jordijaspers@gmail.com" class="hidden md:block regular-text text-sm transition-colors duration-300 ease-in hover:text-muted-foreground">
        Contact
    </a>
</nav>
