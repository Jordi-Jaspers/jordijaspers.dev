<script lang="ts">
	import { setMode } from 'mode-watcher';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Moon, Sun } from 'lucide-svelte';
	import { crossfade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { isDarkMode } from '$lib/components/store/localstorage.ts';

	isDarkMode.subscribe((value) => {
		setMode(value ? 'dark' : 'light');
	});

	const [send, receive] = crossfade({
		duration: 500,
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 500,
				easing: cubicOut,
				css: (t) => `
                    opacity: ${t};
                    transform: ${transform} rotate(${t * 360}deg);
                `
			};
		}
	});
</script>

<div class="my-auto flex h-full flex-col items-center justify-center space-y-2">
	<div class="relative h-8 w-8">
		{#if !$isDarkMode}
			<div class="absolute inset-0 h-full w-full" in:receive={{ key: 'moon' }} out:send={{ key: 'moon' }}>
				<Moon class="h-full w-full text-foreground" />
			</div>
		{:else}
			<div class="absolute inset-0 h-full w-full" in:receive={{ key: 'sun' }} out:send={{ key: 'sun' }}>
				<Sun class="h-full w-full text-primary" />
			</div>
		{/if}
	</div>

	<Switch id="light-switch" bind:checked={$isDarkMode} aria-label="Toggle theme" />
</div>
