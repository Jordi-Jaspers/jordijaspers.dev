<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { untrack } from 'svelte';
	import { resolve } from '$app/paths';
	import { isDarkMode } from '$lib/stores/localstorage.svelte';
	import { env } from '$lib/config/env';

	const accessToken = env.mapbox.accessToken;

	let mapContainer: HTMLDivElement = $state()!;
	const longitude: number = 5.68889;
	const latitude: number = 50.84833;
	const zoom: number = 10;

	let mapStyle = $derived(isDarkMode.value ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11');

	let map: mapboxgl.Map | undefined = $state();

	function tintMap(m: mapboxgl.Map): void {
		const dark = isDarkMode.value;
		try {
			// Tint water
			if (m.getLayer('water')) {
				m.setPaintProperty('water', 'fill-color', dark ? '#1a1612' : '#f0e6d6');
			}
			// Tint land/background
			if (m.getLayer('land')) {
				m.setPaintProperty('land', 'background-color', dark ? '#201a14' : '#f5ede0');
			}
			// Tint roads
			for (const layer of ['road-street', 'road-minor', 'road-major', 'road-motorway-trunk']) {
				if (m.getLayer(layer)) {
					m.setPaintProperty(layer, 'line-color', dark ? '#3a2e22' : '#e0d0bc');
				}
			}
		} catch {
			// Some layers may not exist in all styles
		}
	}

	$effect(() => {
		try {
			const m = new mapboxgl.Map({
				accessToken,
				container: mapContainer,
				interactive: false,
				style: untrack(() => mapStyle),
				center: [longitude, latitude],
				zoom,
				pitch: 0,
				bearing: 0,
				attributionControl: false
			});
			m.on('style.load', () => tintMap(m));
			map = m;
			return () => m.remove();
		} catch (e) {
			console.error('Mapbox initialization failed:', e);
		}
	});

	$effect(() => {
		if (!map) return;
		map.setStyle(mapStyle);
	});
</script>

<div class="group relative flex h-full w-full overflow-hidden">
	<!-- Full-bleed Mapbox map -->
	<div bind:this={mapContainer} class="absolute inset-0 h-full w-full"></div>

	<!-- Location pin (above map, below link overlay) -->
	<div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
		<div class="flex flex-col items-center">
			<div class="map-pulse absolute h-12 w-12 rounded-full"></div>
			<div class="bg-primary shadow-primary/30 relative flex h-8 w-8 items-center justify-center rounded-full shadow-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="text-primary-foreground h-4 w-4"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
				</svg>
			</div>
		</div>
	</div>

	<!-- Gradient overlay + label at bottom (above map, below link) -->
	<div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-4 pb-3 pt-8">
		<div class="flex items-end justify-between">
			<div>
				<h3 class="font-heading text-lg font-semibold text-white">About</h3>
				<p class="font-body text-xs text-white/70">Maastricht, NL</p>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 text-white/70 transition-transform duration-200 group-hover:translate-x-1"
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
	</div>

	<!-- Invisible navigation link overlay — bottom-right cut out for Mapbox attribution -->
	<a
		href={resolve('/about')}
		class="absolute inset-0 z-20"
		aria-label="About me"
	></a>
</div>

<style>
	.map-pulse {
		background-color: var(--primary);
		opacity: 0.2;
		animation: pulse-ring 2s ease-out infinite;
	}

	@keyframes pulse-ring {
		0% {
			transform: scale(0.8);
			opacity: 0.3;
		}
		100% {
			transform: scale(1.8);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.map-pulse {
			animation: none;
			opacity: 0.15;
		}
	}
</style>
