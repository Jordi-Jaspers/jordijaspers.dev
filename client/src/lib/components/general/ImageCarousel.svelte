<script lang="ts">
	import type { Snippet } from 'svelte';

	export interface CarouselImage {
		src: string;
		alt: string;
	}

	interface Props {
		images: CarouselImage[];
		interval?: number;
		imageFit?: 'cover' | 'contain';
		containBg?: string;
		showGradient?: boolean;
		dotsPlacement?: 'inside' | 'below' | 'none';
		dotColor?: 'muted' | 'white';
		loading?: 'lazy' | 'eager';
		class?: string;
		onerror?: (event: Event) => void;
		overlay?: Snippet<[number]>;
	}

	let {
		images,
		interval = 4000,
		imageFit = 'cover',
		containBg,
		showGradient = false,
		dotsPlacement = 'inside',
		dotColor = 'muted',
		loading = 'eager',
		class: className = '',
		onerror,
		overlay
	}: Props = $props();

	let current: number = $state(0);

	$effect(() => {
		if (images.length <= 1) return;
		const reduced: boolean = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) return;
		const id: ReturnType<typeof setInterval> = setInterval(() => {
			current = (current + 1) % images.length;
		}, interval);
		return () => clearInterval(id);
	});
</script>

<div
	class="relative h-full w-full overflow-hidden {className}"
	style={imageFit === 'contain' && containBg ? `background-color: ${containBg};` : undefined}
>
	{#each images as image, i (image.src)}
		<img
			src={image.src}
			alt={image.alt}
			{loading}
			class="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out {imageFit === 'contain'
				? 'object-contain p-6'
				: 'object-cover'}"
			style="opacity: {i === current ? 1 : 0};"
			{onerror}
		/>
	{/each}

	{#if showGradient}
		<div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
	{/if}

	{#if overlay}
		{@render overlay(current)}
	{/if}

	{#if dotsPlacement === 'inside' && images.length > 1}
		<div class="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
			{#each images as image, i (image.src)}
				<span
					aria-label={image.alt}
					class="h-1 rounded-full transition-all duration-300 {i === current
						? 'bg-primary w-4'
						: dotColor === 'white'
							? 'w-1 bg-white/60'
							: 'bg-muted-foreground/30 w-1'}"
				></span>
			{/each}
		</div>
	{/if}
</div>

{#if dotsPlacement === 'below' && images.length > 1}
	<div class="mt-2 flex justify-center gap-1.5">
		{#each images as image, i (image.src)}
			<span
				aria-label={image.alt}
				class="h-1 rounded-full transition-all duration-300 {i === current
					? 'bg-primary w-4'
					: dotColor === 'white'
						? 'w-1 bg-white/60'
						: 'bg-muted-foreground/30 w-1'}"
			></span>
		{/each}
	</div>
{/if}
