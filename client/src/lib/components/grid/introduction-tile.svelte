<script lang="ts">
    import Profile1 from "$lib/images/profile_picture_1.webp?enhanced";
    import Profile2 from "$lib/images/profile_picture_2.webp?enhanced";
    import { RefreshCcw } from "lucide-svelte";
    import { scale } from "svelte/transition";
    import {quintOut} from "svelte/easing";

    const duration: number = 700;

    let showProfile1: boolean = true;
    let showProfile2: boolean = false;
    let isSwitching: boolean = false;
    function toggleProfile(): void {
        if (isSwitching) return;
        isSwitching = true;

        showProfile2 = !showProfile2;
        showProfile1 = !showProfile1;

        setTimeout(() => {
            isSwitching = false;
        }, duration);
    }
</script>

<div class="flex flex-col justify-between w-full h-full">
    <div class="relative w-28 h-28 rounded-full border-4 border-primary">
        {#if showProfile1}
            <div class="absolute inset-0 overflow-hidden" transition:scale={{ duration: 700, opacity: 0, start: 0, easing: quintOut }}>
                <enhanced:img  src={Profile1} alt="Profile picture 1" class="h-full aspect-square rounded-full"/>
            </div>
        {/if}

        {#if showProfile2}
            <div class="absolute inset-0" transition:scale={{ duration: 700, opacity: 0, start: 0, easing: quintOut }}>
                <enhanced:img  src={Profile2} alt="Profile picture 2" class="h-full aspect-square rounded-full"/>
            </div>
        {/if}
    </div>

    <div class="space-y-2">
        <p class="font-sans">Hello, I'm <span class="font-moranga text-2xl font-bold">Jordi</span>, a software engineer specializing in web development. I would love to realize your next project.</p>
        <button class="group w-full rounded-2xl flex justify-center space-x-2 border-2 border-accent py-1" on:click={toggleProfile} disabled={isSwitching} >
            <RefreshCcw class="group-hover:rotate-[540deg] transition-transform duration-1000"/>
            <span>Toggle Image</span>
        </button>
    </div>
</div>
