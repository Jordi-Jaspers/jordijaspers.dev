<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { isDarkMode } from '$lib/stores/localstorage.svelte';
	import { Minus, Plus } from 'lucide-svelte';
	import Profile from '$lib/images/profile_picture_3.webp?enhanced';

	import { env } from '$lib/config/env';

	const accessToken = env.mapbox.accessToken;

	let map: mapboxgl.Map | undefined = $state();
	let mapContainer: HTMLDivElement = $state()!;
	let zoom: number = $state(8);
	const longitude: number = 5.68889;
	const latitude: number = 50.84833;

	let mapStyle = $derived(
		isDarkMode.value
			? 'mapbox://styles/mapbox/navigation-guidance-night-v4'
			: 'mapbox://styles/mapbox/navigation-guidance-day-v4'
	);

	function incrementZoom(): void {
		if (zoom > 10) return;
		zoom += 3;
	}

	function decrementZoom(): void {
		if (zoom < 2) return;
		zoom -= 3;
	}

	$effect(() => {
		const m = new mapboxgl.Map({
			accessToken,
			container: mapContainer,
			interactive: false,
			style: mapStyle,
			center: [longitude, latitude],
			zoom,
			pitch: 0,
			bearing: 0
		});
		map = m;
		return () => m.remove();
	});

	$effect(() => {
		if (!map) return;
		map.flyTo({ center: [longitude, latitude], zoom });
	});

	$effect(() => {
		if (!map) return;
		map.setStyle(mapStyle);
	});
</script>

<div bind:this={mapContainer} class="absolute inset-0 h-full w-full"></div>

<div class="group absolute inset-0 flex h-full w-full items-center justify-center bg-transparent">
	<div
		class="rotate flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-400/50 transition-all duration-500"
	>
		<enhanced:img src={Profile} alt="Profile picture" class="h-16 w-16" />
	</div>
</div>

<button class="map-button map-button-shadow bottom-0 right-0 {zoom > 10 && 'hidden'}" onclick={incrementZoom}>
	<Plus class="h-full w-full cursor-pointer p-2" />
</button>

<button class="map-button map-button-shadow bottom-0 left-0 {zoom < 2 && 'hidden'}" onclick={decrementZoom}>
	<Minus class="h-full w-full cursor-grab p-2" />
</button>

<style>
	.rotate:hover {
		scale: 125%;
		animation: rotate 2s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(-15deg);
		}
		50% {
			transform: rotate(15deg);
		}
		100% {
			transform: rotate(-15deg);
		}
	}
</style>
