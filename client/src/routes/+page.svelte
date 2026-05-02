<script lang="ts">
	import ParticleCanvas from '$lib/components/hero/ParticleCanvas.svelte';
	import { SpotifyTile, TechStackTile, ResumeTile, WorkTile, AboutTile } from '$lib/components/grid';
</script>

<svelte:head>
	<title>Jordi Jaspers | Lead Software & Applied AI Engineer</title>
</svelte:head>

<!-- Hero Section -->
<section class="hero-section relative w-full overflow-hidden" aria-label="Hero">
	<!-- Particle canvas fills the hero -->
	<ParticleCanvas />

	<!-- Centered text overlay -->
	<div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
		<h1 class="font-heading text-foreground text-5xl font-bold sm:text-6xl md:text-7xl">Jordi Jaspers</h1>
		<p class="font-body text-muted-foreground mt-3 text-lg sm:text-xl md:text-2xl">Lead Software & Applied AI Engineer</p>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="text-muted-foreground/60 h-5 w-5"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</div>
</section>

<!-- Bento Grid -->
<section class="mx-auto max-w-5xl px-4 py-12 sm:px-6" aria-label="Navigation grid">
	<div class="bento-grid">
		<!-- Work tile: 2×2 -->
		<div class="grid-item bento-work p-4 sm:p-6">
			<WorkTile />
		</div>

		<!-- Spotify tile: 1×1 -->
		<div class="grid-item bento-spotify p-4 sm:p-5">
			<SpotifyTile />
		</div>

		<!-- TechStack tile: 1×1 -->
		<div class="grid-item bento-techstack p-4 sm:p-5">
			<TechStackTile />
		</div>

		<!-- About tile: 2×1 — no padding for full-bleed map -->
		<div class="grid-item bento-about !p-0">
			<AboutTile />
		</div>

		<!-- Resume tile: 1×1 -->
		<div class="grid-item bento-resume p-4 sm:p-5">
			<ResumeTile />
		</div>
	</div>
</section>

<style>
	.hero-section {
		height: 85svh;
		min-height: 480px;
	}

	/* Desktop bento grid: 3 columns */
	.bento-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr 1fr;
		grid-template-rows: 200px 200px;
		gap: 1rem;
	}

	.bento-work {
		grid-column: 1;
		grid-row: 1 / 3;
	}

	.bento-spotify {
		grid-column: 2;
		grid-row: 1;
	}

	.bento-techstack {
		grid-column: 3;
		grid-row: 1;
	}

	.bento-about {
		grid-column: 2;
		grid-row: 2;
	}

	.bento-resume {
		grid-column: 3;
		grid-row: 2;
	}

	/* Mobile: 2-col with fixed row heights */
	@media (max-width: 843px) {
		.bento-grid {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 240px 160px 160px 160px;
		}

		.bento-work {
			grid-column: 1 / 3;
			grid-row: 1;
		}

		.bento-spotify {
			grid-column: 1;
			grid-row: 2;
		}

		.bento-techstack {
			grid-column: 2;
			grid-row: 2;
		}

		.bento-about {
			grid-column: 1 / 3;
			grid-row: 3;
		}

		.bento-resume {
			grid-column: 1 / 3;
			grid-row: 4;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-bounce {
			animation: none;
		}
	}
</style>
