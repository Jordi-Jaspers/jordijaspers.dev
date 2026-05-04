<script lang="ts">
	import { ProjectCard } from '$lib/components/career';
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projects | Jordi Jaspers</title>
	<meta
		name="description"
		content="Open-source work and personal builds — from streaming platforms to enterprise frameworks by Jordi Jaspers."
	/>
</svelte:head>

<section class="mx-auto max-w-5xl px-6 py-24">
	<!-- Header -->
	<div class="mb-16">
		<h1 class="font-heading text-foreground text-4xl font-semibold">Selected Projects</h1>
		<p class="font-body text-muted-foreground mt-4">
			Open-source work and personal builds — from streaming platforms to enterprise frameworks.
		</p>
	</div>

	<!-- Project Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each data.projects as project (project.id)}
			<ProjectCard
				title={project.title}
				tagline={project.tagline}
				techStack={project.techStack}
				status={project.status}
				image={project.image}
				imageFit={project.imageFit}
				placeholderType={project.placeholderType}
				liveUrl={project.liveUrl}
				githubUrl={project.githubUrl}
				detail={project.detail}
			/>
		{/each}
	</div>

	<!-- Footer link -->
	<div class="mt-16 text-center">
		<a
			href={resolve('/career')}
			class="font-body text-muted-foreground hover:text-primary text-sm transition-colors duration-150"
			aria-label="View career story"
		>
			Looking for my career story? → <span class="underline underline-offset-4">/career</span>
		</a>
	</div>
</section>
