<script lang="ts">
	import MapJourney from '$lib/components/about/MapJourney.svelte';
	import PersonalSection from '$lib/components/about/PersonalSection.svelte';
</script>

<svelte:head>
	<title>About | Jordi Jaspers</title>
	<meta
		name="description"
		content="A scroll-driven journey from Hasselt to Maastricht (and Mars). Polyglot engineer, AI-accelerated, 3rd Degree Black Belt."
	/>
</svelte:head>

<!-- Full-width — MapJourney manages its own layout and scroll spacers -->
<MapJourney />

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
