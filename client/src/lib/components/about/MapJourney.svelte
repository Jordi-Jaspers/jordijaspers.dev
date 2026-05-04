<script lang="ts">
	import { browser } from '$app/environment';
	import { untrack } from 'svelte';
	import { fade } from 'svelte/transition';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { isDarkMode } from '$lib/stores/localstorage.svelte';
	import { env } from '$lib/config/env';
	import { waypoints } from './waypoints';
	import { narratives } from './narratives';
	import { getActiveWaypointIndex, getMapAnimationOptions } from './scroll-observer';
	import type { Waypoint } from './types';

	const accessToken: string = env.mapbox.accessToken;

	let mapContainer: HTMLDivElement = $state()!;
	let spacerRefs: HTMLDivElement[] = $state([]);
	let map: mapboxgl.Map | undefined = $state();
	let activeIndex: number = $state(0);
	let prefersReducedMotion: boolean = $state(false);

	// Per-waypoint marker elements and popup instances
	let markerEls: HTMLDivElement[] = [];
	let popups: mapboxgl.Popup[] = [];

	let mapStyle: string = $derived(isDarkMode.value ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11');

	let activeNarrative = $derived(narratives[activeIndex]);

	function tintMap(m: mapboxgl.Map): void {
		const dark: boolean = isDarkMode.value;
		try {
			if (m.getLayer('water')) {
				m.setPaintProperty('water', 'fill-color', dark ? '#1a1612' : '#f0e6d6');
			}
			if (m.getLayer('land')) {
				m.setPaintProperty('land', 'background-color', dark ? '#201a14' : '#f5ede0');
			}
			for (const layer of ['road-street', 'road-minor', 'road-major', 'road-motorway-trunk']) {
				if (m.getLayer(layer)) {
					m.setPaintProperty(layer, 'line-color', dark ? '#3a2e22' : '#e0d0bc');
				}
			}
		} catch {
			// Some layers may not exist in all styles
		}
	}

	function buildPopupHtml(waypoint: Waypoint): string {
		return `
			<div class="popup-inner">
				<div class="popup-header">
					<span class="popup-name">${waypoint.name}</span>
					<span class="popup-location">${waypoint.location}</span>
				</div>
				<div class="popup-date">${waypoint.dateRange}</div>
				<p class="popup-desc">${waypoint.description}</p>
			</div>
		`;
	}

	function updateActiveMarker(newIndex: number): void {
		markerEls.forEach((el: HTMLDivElement, i: number) => {
			if (i === newIndex) {
				el.classList.add('active');
			} else {
				el.classList.remove('active');
			}
		});
	}

	function updateActivePopup(newIndex: number): void {
		popups.forEach((popup: mapboxgl.Popup, i: number) => {
			if (i === newIndex) {
				if (!popup.isOpen()) popup.addTo(map!);
			} else {
				if (popup.isOpen()) popup.remove();
			}
		});
	}

	$effect(() => {
		if (!browser) return;

		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const firstWaypoint: Waypoint = waypoints[0];
		const m = new mapboxgl.Map({
			accessToken,
			container: mapContainer,
			interactive: false,
			style: untrack(() => mapStyle),
			center: firstWaypoint.coordinates,
			zoom: firstWaypoint.zoom,
			pitch: 0,
			bearing: 0,
			attributionControl: false
		});

		m.on('style.load', () => tintMap(m));
		map = m;

		// Create markers and popups for each waypoint
		markerEls = [];
		popups = [];

		waypoints.forEach((waypoint: Waypoint, i: number) => {
			// Marker element — uniform pin for all waypoints including Mars
			const el = document.createElement('div');
			el.className = 'waypoint-pin';
			if (i === 0) el.classList.add('active');
			markerEls.push(el);

			new mapboxgl.Marker({ element: el, anchor: 'center' }).setLngLat(waypoint.coordinates).addTo(m);

			// Popup
			const popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false,
				anchor: 'bottom',
				offset: 16,
				className: 'waypoint-popup'
			}).setHTML(buildPopupHtml(waypoint));

			popups.push(popup);
		});

		// Open first popup immediately
		popups[0]?.addTo(m);

		return () => m.remove();
	});

	// React to dark mode changes
	$effect(() => {
		if (!map) return;
		map.setStyle(mapStyle);
	});

	// IntersectionObserver on scroll spacers
	$effect(() => {
		if (!browser) return;
		if (spacerRefs.length === 0) return;

		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				const newIndex: number = getActiveWaypointIndex(entries, activeIndex);
				if (newIndex === activeIndex) return;

				activeIndex = newIndex;

				if (!map) return;

				const waypoint: Waypoint = waypoints[newIndex];
				const animation = getMapAnimationOptions(prefersReducedMotion, waypoint);

				// Handle Mars globe projection
				if (waypoint.id === 'mars') {
					map.setProjection({ name: 'globe' });
					const marsOptions = {
						...animation.options,
						center: [0, 20] as [number, number],
						zoom: 1.5
					};
					if (animation.type === 'fly') {
						map.flyTo({ ...marsOptions, duration: 2000, essential: true });
					} else {
						map.jumpTo(marsOptions);
					}
				} else {
					// Reset to mercator when leaving Mars
					map.setProjection({ name: 'mercator' });
					if (animation.type === 'fly') {
						map.flyTo(animation.options);
					} else {
						map.jumpTo(animation.options);
					}
				}

				updateActiveMarker(newIndex);
				updateActivePopup(newIndex);
			},
			{ threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
		);

		spacerRefs.forEach((el: HTMLDivElement) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<!-- Full-width sticky map journey -->
<div class="journey-wrapper">
	<!-- Sticky map canvas — full width, full viewport height -->
	<div class="map-sticky">
		<div bind:this={mapContainer} class="map-canvas"></div>

		<!-- Narrative story card — bottom-right overlay, desktop only -->
		<div class="narrative-card surface-grain" aria-live="polite" aria-atomic="true">
			{#key activeIndex}
				<div
					class="narrative-inner"
					in:fade={prefersReducedMotion ? { duration: 0 } : { duration: 250, delay: 80 }}
					out:fade={prefersReducedMotion ? { duration: 0 } : { duration: 150 }}
				>
					<p class="narrative-eyebrow">{activeNarrative.eyebrow}</p>
					<h2 class="narrative-heading">{activeNarrative.heading}</h2>
					<p class="narrative-body">{activeNarrative.body}</p>
					<div class="narrative-footer">
						<span>{activeNarrative.footer}</span>
					</div>
				</div>
			{/key}
		</div>
	</div>

	<!-- Invisible scroll spacers — one per waypoint, each 100vh -->
	<div class="spacers-layer">
		{#each waypoints as waypoint, i (waypoint.id)}
			<div
				class="scroll-spacer"
				data-waypoint-index={i}
				bind:this={spacerRefs[i]}
				aria-label="Journey stop: {waypoint.name}, {waypoint.location}"
			></div>
		{/each}
	</div>
</div>

<style>
	.journey-wrapper {
		position: relative;
		/* 4 waypoints × 100vh each */
		height: 400vh;
	}

	.map-sticky {
		position: sticky;
		top: 0;
		height: 100dvh;
		width: 100%;
		overflow: hidden;
		z-index: 0;
	}

	.map-canvas {
		width: 100%;
		height: 100%;
	}

	/* Spacers sit below the sticky map in the stacking context,
	   but their scroll position drives the IntersectionObserver */
	.spacers-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.scroll-spacer {
		height: 100vh;
	}

	/* ── Narrative story card ──────────────────────────────────── */
	.narrative-card {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		width: clamp(320px, 30vw, 440px);
		z-index: 10;
		background: oklch(from var(--background) l c h / 0.92);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid var(--border);
		border-radius: 1rem;
		padding: 1.75rem;
		box-shadow:
			0 20px 60px -15px rgb(0 0 0 / 0.3),
			0 4px 16px -4px rgb(0 0 0 / 0.15);
		/* Prevent layout shift during transitions */
		min-height: 200px;
	}

	.narrative-inner {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.narrative-eyebrow {
		font-family: 'Silka', sans-serif;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--primary);
		margin: 0;
	}

	.narrative-heading {
		font-family: 'Moranga', serif;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--foreground);
		margin: 0.125rem 0 0.25rem;
		line-height: 1.2;
	}

	.narrative-body {
		font-family: 'Silka', sans-serif;
		font-size: 0.875rem;
		line-height: 1.65;
		color: var(--muted-foreground);
		margin: 0;
	}

	.narrative-footer {
		border-top: 1px solid var(--border);
		padding-top: 0.75rem;
		margin-top: 0.5rem;
		font-family: 'Silka', sans-serif;
		font-size: 0.75rem;
		color: var(--muted-foreground);
	}

	/* ── Waypoint pins ─────────────────────────────────────────── */
	:global(.waypoint-pin) {
		width: 12px;
		height: 12px;
		border-radius: 9999px;
		background: var(--muted-foreground);
		border: 2px solid var(--background);
		opacity: 0.6;
		transition:
			width 300ms cubic-bezier(0.4, 0, 0.2, 1),
			height 300ms cubic-bezier(0.4, 0, 0.2, 1),
			opacity 300ms cubic-bezier(0.4, 0, 0.2, 1),
			background 300ms cubic-bezier(0.4, 0, 0.2, 1);
		cursor: default;
	}

	:global(.waypoint-pin.active) {
		width: 20px;
		height: 20px;
		background: var(--primary);
		opacity: 1;
		box-shadow: 0 0 0 6px color-mix(in oklch, var(--primary) 20%, transparent);
		animation: pin-pulse 2s ease-in-out infinite;
	}

	@keyframes pin-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 6px color-mix(in oklch, var(--primary) 20%, transparent);
		}
		50% {
			box-shadow: 0 0 0 10px color-mix(in oklch, var(--primary) 10%, transparent);
		}
	}

	/* ── Popup overrides ───────────────────────────────────────── */
	:global(.waypoint-popup .mapboxgl-popup-content) {
		background: var(--background);
		border: 1px solid var(--border);
		border-left: 3px solid var(--primary);
		border-radius: 0.75rem;
		padding: 1rem 1.25rem;
		box-shadow: 0 10px 30px -10px rgb(0 0 0 / 0.25);
		min-width: 220px;
		max-width: 280px;
	}

	:global(.waypoint-popup .mapboxgl-popup-tip) {
		border-top-color: var(--background) !important;
	}

	:global(.popup-inner) {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	:global(.popup-header) {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	:global(.popup-name) {
		font-family: 'Moranga', serif;
		font-size: 1rem;
		font-weight: 600;
		color: var(--foreground);
	}

	:global(.popup-location) {
		font-family: 'Silka', sans-serif;
		font-size: 0.75rem;
		color: var(--muted-foreground);
	}

	:global(.popup-date) {
		font-family: 'Silka', sans-serif;
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--primary);
		margin-bottom: 0.25rem;
	}

	:global(.popup-desc) {
		font-family: 'Silka', sans-serif;
		font-size: 0.8rem;
		line-height: 1.5;
		color: var(--muted-foreground);
		margin: 0;
	}

	/* ── Reduced motion ────────────────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		:global(.waypoint-pin) {
			transition: none;
		}

		:global(.waypoint-pin.active) {
			animation: none;
		}
	}
</style>
