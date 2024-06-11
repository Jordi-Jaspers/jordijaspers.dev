<script lang="ts">
    import Navigation from "$lib/components/navigation";
    import type {GridController} from 'svelte-grid-extended';
    import {Grid, GridItem} from 'svelte-grid-extended';
    import {writable, type Writable} from "svelte/store";
    import {onDestroy, onMount} from "svelte";
    import {browser} from '$app/environment';
    import {Grip} from "lucide-svelte";

    export let data;
    const fraction: number = 164;
    const itemSize = {width: fraction, height: fraction};
    const mobileLayout = data.mobileLayout;
    const desktopLayout = data.desktopLayout;

    let interval: Timer;
    let controller: GridController;
    let items: Writable<GridObject[]> = writable([]);
    let previousCols: Writable<number> = writable(2);
    let cols: Writable<number> = writable(2);
    let rows: Writable<number> = writable(10);

    function resetGrid(): void {
        $items = $cols > 2 ? desktopLayout : mobileLayout;
        controller.compress();
    }

    function compressGrid(): void {
        controller.compress();
    }

    function updateGrid() {
        const maxWidth = 800;
        $previousCols = $cols;
        $cols = window.innerWidth >= maxWidth ? 4 : 2

        const maxHeight = window.innerHeight;
        const newRows: number = Math.floor(maxHeight / fraction);
        rows.set(newRows < 1 ? 1 : newRows);

        resetGrid();
    }

    onMount(() => {
        interval = setInterval(compressGrid, 100);
        if (browser) {
            updateGrid();
            window.addEventListener('resize', updateGrid);
        }
    });

    onDestroy(() => {
        if (browser) {
            window.removeEventListener('resize', updateGrid);
        }
        clearInterval(interval);
    });
</script>

<svelte:head>
    <title>Jordi Jaspers</title>
    <meta name="description"
          content="Welcome to Jordi Jaspers' web portfolio. With over 5 years of experience in software development, specializing in Spring Boot and DevOps, Jordi delivers efficient and elegant solutions. Discover his projects, expertise, and how he can help bring your software ideas to life."/>
</svelte:head>

<Navigation/>
<div class="flex mb-20 h-screen min-w-[375px] max-w-[800px] mx-auto" style="width: {$cols > 2 ? 800 : 375}px;">
    <Grid class="grid-container" cols={$cols} rows={$rows} bounds={true} {itemSize} collision="push" gap={16} bind:controller>
        {#each $items as {id, x, y, w, h, component} (id)}
            <GridItem {id} bind:x bind:y bind:w bind:h resizable={false} previewClass="grid-item-preview" activeClass="cursor-grabbing" class="grid-item">
                <div slot="moveHandle" let:moveStart>
                    <div class="absolute top-0 right-0 m-2 h-8 w-8 rounded-full bg-muted" on:pointerdown={moveStart}>
                        <Grip class="w-full h-full p-2 cursor-grab"/>
                    </div>
                </div>

                {#if component}
                    <svelte:component this={component}/>
                {/if}
            </GridItem>
        {/each}
    </Grid>
</div>
