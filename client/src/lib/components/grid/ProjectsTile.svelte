<script lang="ts">
	import { resolve } from '$app/paths';
	import { ImageCarousel, type CarouselImage } from '$lib/components/general';
	import aniflixWeb from '$lib/images/aniflix_web.webp';
	import eventify1 from '$lib/images/eventify_1.webp';
	import eventify2 from '$lib/images/eventify_2.webp';

	const projectImages: CarouselImage[] = [
		{ src: aniflixWeb, alt: 'Aniflix' },
		{ src: eventify1, alt: 'Eventify' },
		{ src: eventify2, alt: 'Eventify' }
	];
</script>

<a href={resolve('/projects')} class="group relative flex h-full w-full flex-col overflow-hidden" aria-label="View projects">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h3 class="font-heading text-foreground text-base font-semibold">Projects</h3>
			<p class="font-body text-muted-foreground mt-0.5 text-xs">Open-source builds & experiments</p>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="text-muted-foreground h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</svg>
	</div>

	<!-- Image carousel with name-badge overlay; dots rendered below by carousel -->
	<ImageCarousel images={projectImages} showGradient dotsPlacement="below" class="bg-muted/50 mt-3 flex-1 rounded-xl">
		{#snippet overlay(current)}
			<div class="absolute bottom-2 left-2">
				{#each projectImages as project, i (project.src)}
					<span
						class="font-body inline-block rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-white backdrop-blur-sm transition-opacity duration-700"
						style="position: {i === 0 ? 'relative' : 'absolute'}; bottom: 0; left: 0; opacity: {i === current ? 1 : 0};"
					>
						{project.alt}
					</span>
				{/each}
			</div>
		{/snippet}
	</ImageCarousel>
</a>
