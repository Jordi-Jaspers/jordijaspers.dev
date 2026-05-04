<script lang="ts">
	import { Timeline, ClientRibbon, StatsGrid, NotableWork, Certifications } from '$lib/components/career';
	import { Mail, Download } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Career | Jordi Jaspers</title>
	<meta
		name="description"
		content="Seven years of building enterprise systems, leading teams, and shipping AI — career timeline and notable work by Jordi Jaspers."
	/>
</svelte:head>

<section class="mx-auto max-w-5xl space-y-24 px-6 py-24">
	<!-- Header -->
	<div>
		<h1 class="font-heading text-foreground text-4xl font-semibold">Career</h1>
		<p class="font-body text-muted-foreground mt-4">
			Seven years of building enterprise systems, leading teams, and shipping AI — across telecom, pensions, and energy.
		</p>
	</div>

	<!-- Credibility ribbon -->
	<ClientRibbon names={data.client.names} />

	<!-- Stats -->
	<StatsGrid stats={data.stats} />

	<!-- Career Timeline -->
	<Timeline milestones={data.timeline} />

	<!-- Notable Enterprise Work -->
	<NotableWork items={data.notableWork} />

	<!-- Certifications -->
	<Certifications items={data.certifications} />

	<!-- CTA -->
	<div class="text-center">
		<h2 class="font-heading text-foreground text-2xl font-semibold">Want to work together?</h2>
		<p class="font-body text-muted-foreground mx-auto mt-3 max-w-lg text-sm">
			Always open to interesting conversations about distributed systems, applied AI, and team leadership.
		</p>
		<div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<!-- Primary: email -->
			<a
				href="mailto:jordijaspers@gmail.com"
				class="font-body bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200"
				aria-label="Send email to Jordi Jaspers"
			>
				<Mail class="h-4 w-4" />
				Get in touch
			</a>

			<!-- Secondary: resume download -->
			<a
				href="/files/resume.pdf"
				download="resume.pdf"
				class="font-body border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200"
				aria-label="Download resume PDF"
			>
				<Download class="h-4 w-4" />
				Download Resume
			</a>

			<!-- Secondary: LinkedIn -->
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a
				href="https://www.linkedin.com/in/jordi-jaspers/"
				target="_blank"
				rel="noopener noreferrer"
				class="font-body border-border bg-background text-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/5"
				aria-label="View LinkedIn profile"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
					/>
				</svg>
				LinkedIn
			</a>
		</div>
	</div>
</section>
