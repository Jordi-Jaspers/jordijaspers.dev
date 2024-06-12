<script lang="ts">
    import Navigation from "$lib/components/navigation";
    import type {GridController} from 'svelte-grid-extended';
    import {Grid, GridItem} from 'svelte-grid-extended';
    import {writable, type Writable} from "svelte/store";
    import {onDestroy, onMount} from "svelte";
    import {browser} from '$app/environment';
    import {Grip} from "lucide-svelte";
    import {activeTab} from "$lib/components/store/localstorage.ts";

    export let data;
    const fraction: number = 164;
    const maxWidth: number = 800;
    const itemSize = {width: fraction, height: fraction};

    // create deep copies as backup
    const mobileCoordinates: Coordinates[] = data.mobileLayout.map(obj => {return {...obj};});
    const desktopCoordinates: Coordinates[] = data.desktopLayout.map(obj => {return {...obj};});

    let interval: Timer;
    let controller: GridController;
    let items: Writable<GridObject[]> = writable([]);
    let previousCols: Writable<number> = writable(2);
    let cols: Writable<number> = writable(4);
    let rows: Writable<number> = writable(10);

    function compressGrid(): void {
        if (!controller) return;
        controller.compress();
    }

    function resetGrid(): void {
        $items = $items.map((item) => {
            let coordinates: Coordinates[] = $cols > 2 ? desktopCoordinates : mobileCoordinates;
            let index = coordinates.findIndex((obj) => obj.id === item.id);
            item.x = coordinates[index].x;
            item.y = coordinates[index].y;
            item.w = coordinates[index].w;
            item.h = coordinates[index].h;
            return item;
        });
        compressGrid();
    }

    function updateGrid() {
        $previousCols = $cols;
        $cols = window.innerWidth >= maxWidth ? 4 : 2

        const maxHeight = window.innerHeight;
        const newRows: number = Math.floor(maxHeight / fraction);
        rows.set(newRows < 1 ? 1 : newRows);

        $items = $cols > 2 ? data.desktopLayout : data.mobileLayout;
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

    activeTab.subscribe((value) => {
        if (!browser) return;

        resetGrid();
        if (value === 'all') return;

        // Filter active and inactive items
        let activeItems = $items.filter((item) => item.category.includes(value));
        let inactiveItems = $items.filter((item) => !item.category.includes(value));
        $items = placeItems(activeItems.concat(inactiveItems));
    });

    function placeItems(items: GridObject[]): GridObject[] {
        const occupiedCells = new Set<string>();

        function canPlaceObject(x: number, y: number, obj: GridObject): boolean {
            for (let i = 0; i < obj.w; i++) {
                for (let j = 0; j < obj.h; j++) {
                    if (occupiedCells.has(`${x + i},${y + j}`)) {
                        return false;
                    }
                }
            }
            return true;
        }

        function placeObject(x: number, y: number, obj: GridObject): void {
            obj.x = x;
            obj.y = y;
            for (let i = 0; i < obj.w; i++) {
                for (let j = 0; j < obj.h; j++) {
                    occupiedCells.add(`${x + i},${y + j}`);
                }
            }
        }

        let currentY = 0;

        for (const obj of items) {
            let placed = false;

            for (let y = currentY; !placed; y++) {
                for (let x = 0; x <= $cols - obj.w; x++) {
                    if (canPlaceObject(x, y, obj)) {
                        placeObject(x, y, obj);
                        placed = true;
                        break;
                    }
                }
            }
        }

        return items;
    }
</script>

<svelte:head>
    <title>Jordi Jaspers</title>
    <meta name="description"
          content="Welcome to Jordi Jaspers' web portfolio. With over 5 years of experience in software development, specializing in Spring Boot and DevOps, Jordi delivers efficient and elegant solutions. Discover his projects, expertise, and how he can help bring your software ideas to life."/>
</svelte:head>

<Navigation/>
<div class="flex mb-20 min-h-screen h-full min-w-[375px] max-w-[800px] mx-auto" style="width: {$cols > 2 ? 800 : 375}px;">
    <Grid class="grid-container" cols={$cols} rows={$rows} bounds={true} {itemSize} collision="push" gap={16} bind:controller>
        {#each $items as {id, x, y, w, h, component, border, category} (id)}
            <GridItem {id} bind:x bind:y bind:w bind:h resizable={false} previewClass="grid-item-preview" activeClass="cursor-grabbing"
                      class="grid-item {!border && 'border-none'} {category.includes($activeTab) || $activeTab === 'all' ? 'opacity-100' : 'opacity-50'}">
                <div slot="moveHandle" let:moveStart>
                    <div class="absolute !z-[10] top-0 right-0 m-2 h-8 w-8 rounded-full bg-muted" on:pointerdown={moveStart}>
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
