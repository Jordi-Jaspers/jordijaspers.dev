<script lang="ts">
    import { setMode } from "mode-watcher";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Moon, Sun } from "lucide-svelte";
    import { crossfade } from 'svelte/transition';
    import {cubicOut} from "svelte/easing";
    import {isDarkMode} from "$lib/components/store/localstorage.ts";


    isDarkMode.subscribe((value) => {
        setMode(value ? "dark" : "light");
    });

    const [send, receive] = crossfade({
        duration: 500,
        fallback(node) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 500,
                easing: cubicOut,
                css: t => `
                    opacity: ${t};
                    transform: ${transform} rotate(${t * 360}deg);
                `
            };
        }
    });
</script>

<div class="flex flex-col items-center justify-center my-auto h-full space-y-2">
    <div class="relative w-8 h-8">
        {#if !$isDarkMode}
            <div class="absolute inset-0 w-full h-full" in:receive={{ key: 'moon' }} out:send={{ key: 'moon' }}>
                <Moon class="w-full h-full text-foreground"/>
            </div>
        {:else}
            <div class="absolute inset-0 w-full h-full" in:receive={{ key: 'sun' }} out:send={{ key: 'sun' }}>
                <Sun class="w-full h-full text-primary"/>
            </div>
        {/if}
    </div>

    <Switch id="light-switch" bind:checked={$isDarkMode} aria-label="Toggle theme"/>
</div>
