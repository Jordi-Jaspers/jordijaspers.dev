<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import aniflixMobile from '$lib/images/aniflix_mobile.webp';
	import aniflixWeb from '$lib/images/aniflix_web.webp';

	const projects = [
		{ src: aniflixWeb, name: 'Aniflix' },
		{ src: aniflixMobile, name: 'Aniflix Mobile' }
	];

	let current: number = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			current = (current + 1) % projects.length;
		}, 4000);
		return () => clearInterval(interval);
	});
</script>

<a
	href={resolve('/work')}
	class="group relative flex h-full w-full flex-col overflow-hidden"
	aria-label="View work and projects"
>
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h3 class="font-heading text-foreground text-base font-semibold">Work</h3>
			<p class="font-body text-muted-foreground mt-0.5 text-xs">Projects & case studies</p>
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

	<!-- Image showcase area -->
	<div class="relative mt-3 flex-1 overflow-hidden rounded-xl bg-muted/50">
		{#each projects as project, i (project.src)}
			<img
				src={project.src}
				alt={project.name}
				class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
				style="opacity: {i === current ? 1 : 0};"
			/>
		{/each}

		<!-- Subtle bottom gradient -->
		<div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>

		<!-- Project name badge -->
		<div class="absolute bottom-2 left-2">
			{#each projects as project, i (project.name)}
				<span
					class="font-body inline-block whitespace-nowrap rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm transition-opacity duration-700"
					style="position: {i === 0 ? 'relative' : 'absolute'}; bottom: 0; left: 0; opacity: {i === current ? 1 : 0};"
				>
					{project.name}
				</span>
			{/each}
		</div>
	</div>

	<!-- Dot indicators -->
	<div class="mt-2 flex justify-center gap-1.5">
		{#each projects as _, i (i)}
			<span
				class="h-1 rounded-full transition-all duration-300 {i === current
					? 'bg-primary w-4'
					: 'bg-muted-foreground/30 w-1'}"
			></span>
		{/each}
	</div>
</a>
