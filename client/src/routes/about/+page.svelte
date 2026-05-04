<script lang="ts">
	import { browser } from '$app/environment';
	import { isMobileViewport } from '$lib/components/about/responsive';
	import MapJourney from '$lib/components/about/MapJourney.svelte';
	import MobileTimeline from '$lib/components/about/MobileTimeline.svelte';
	import PersonalSection from '$lib/components/about/PersonalSection.svelte';

	// Determine mobile at render time (SSR defaults to desktop, hydration corrects)
	let isMobile: boolean = $state(browser ? isMobileViewport(window.innerWidth) : false);
</script>

<svelte:head>
	<title>About | Jordi Jaspers</title>
	<meta
		name="description"
		content="A scroll-driven journey from Hasselt to Maastricht (and Mars). Polyglot engineer, AI-accelerated, 3rd Degree Black Belt."
	/>
</svelte:head>

<!-- Map journey OR mobile timeline -->
{#if isMobile}
	<section class="mx-auto max-w-5xl px-6 py-12">
		<MobileTimeline />
	</section>
{:else}
	<!-- Full-width — MapJourney manages its own layout and scroll spacers -->
	<MapJourney />
{/if}

<!-- Personal (constrained) -->
<section class="mx-auto max-w-5xl space-y-24 px-6 py-24">
	<!-- Personal -->
	<div>
		<div class="mb-8">
			<h2 class="font-heading text-foreground text-3xl font-semibold">Beyond the Code</h2>
			<p class="font-body text-muted-foreground mt-2">The human behind the keyboard.</p>
		</div>
		<PersonalSection />
	</div>
</section>

