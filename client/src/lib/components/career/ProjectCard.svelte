<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ExternalLink, GitBranch, ChevronDown, Code, Activity } from 'lucide-svelte';
	import { ImageCarousel, Pill, type CarouselImage } from '$lib/components/general';

	interface Props {
		title: string;
		tagline: string;
		techStack: string[];
		status: 'active' | 'archived';
		image?: string | string[];
		imageFit?: 'cover' | 'contain';
		placeholderType?: 'framework' | 'monitoring';
		liveUrl?: string;
		githubUrl: string;
		detail: string;
	}

	let { title, tagline, techStack, status, image, imageFit = 'cover', placeholderType, liveUrl, githubUrl, detail }: Props = $props();

	const images: CarouselImage[] = $derived(
		image
			? (Array.isArray(image) ? image : [image]).map((src, i, arr) => ({
					src,
					alt: arr.length > 1 ? `${title} screenshot ${i + 1}` : title
				}))
			: []
	);

	let isOpen: boolean = $state(false);
	let imgFailed: boolean = $state(false);

	function handleImgError(): void {
		imgFailed = true;
	}
</script>

<article
	class="surface-grain group border-border/50 bg-card flex flex-col overflow-hidden rounded-lg border transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.01] hover:shadow-lg"
>
	<!-- Hero area -->
	<div class="relative aspect-video w-full overflow-hidden">
		<!-- Status badge -->
		<div class="absolute top-3 right-3 z-20">
			{#if status === 'active'}
				<span
					class="font-body inline-flex items-center rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-700 backdrop-blur-sm dark:text-green-400"
				>
					<span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current"></span>
					Active
				</span>
			{:else}
				<span
					class="font-body border-border bg-muted/80 text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm"
				>
					<span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current"></span>
					Archived
				</span>
			{/if}
		</div>

		{#if images.length > 0 && !imgFailed}
			<ImageCarousel {images} {imageFit} containBg="#0E1320" dotColor="white" loading="lazy" onerror={handleImgError} />
		{:else}
			<div
				class="surface-grain from-primary/20 via-primary/10 to-secondary flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br"
			>
				{#if placeholderType === 'framework'}
					<Code class="text-primary h-16 w-16 opacity-80" />
					<span class="font-body text-muted-foreground text-xs tracking-widest uppercase">Framework</span>
				{:else if placeholderType === 'monitoring'}
					<Activity class="text-primary h-16 w-16 opacity-80" />
					<span class="font-body text-muted-foreground text-xs tracking-widest uppercase">Platform</span>
				{:else}
					<Code class="text-primary h-16 w-16 opacity-80" />
				{/if}
			</div>
		{/if}
	</div>

	<!-- Content -->
	<div class="flex flex-1 flex-col p-6">
		<h3 class="font-heading text-foreground text-xl font-semibold">{title}</h3>
		<p class="font-body text-muted-foreground mt-1 text-sm">{tagline}</p>

		<!-- Tech badges -->
		<div class="mt-4 flex flex-wrap gap-2">
			{#each techStack as tech (tech)}
				<Pill class="whitespace-nowrap">{tech}</Pill>
			{/each}
		</div>

		<!-- Action links -->
		<div class="mt-4 flex gap-3">
			{#if liveUrl}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="View {title} live project"
					class="font-body text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm transition-colors duration-[150ms]"
				>
					<ExternalLink class="h-4 w-4" />
					View Project
				</a>
			{/if}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="View {title} on GitHub"
				class="font-body text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm transition-colors duration-[150ms]"
			>
				<GitBranch class="h-4 w-4" />
				GitHub
			</a>
		</div>

		<!-- Read more toggle -->
		<button
			onclick={() => (isOpen = !isOpen)}
			aria-expanded={isOpen}
			class="font-body text-primary hover:text-primary/80 mt-4 flex items-center gap-1 self-start text-sm transition-colors duration-[150ms]"
		>
			{isOpen ? 'Read Less' : 'Read More'}
			<ChevronDown class="h-4 w-4 transition-transform duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] {isOpen ? 'rotate-180' : ''}" />
		</button>

		<!-- Expandable detail -->
		{#if isOpen}
			<div transition:slide={{ duration: 300, easing: cubicOut }}>
				<p class="font-body text-muted-foreground mt-4 text-sm leading-relaxed">{detail}</p>
			</div>
		{/if}
	</div>
</article>
