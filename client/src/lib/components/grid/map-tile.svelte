<script lang="ts">
    import {writable, type Writable} from "svelte/store";
    import mapboxgl from "mapbox-gl";
    import {onDestroy, onMount} from "svelte";
    import {isDarkMode} from "$lib/components/store/localstorage.ts";
    import {Minus, Plus} from "lucide-svelte";
    import Profile from "$lib/images/profile_picture_3.webp?enhanced";

    // https://dev.to/samuelearl/building-a-geospacial-app-with-sveltekit-deckgl-and-mapbox-part-1-start-with-a-map-59lh
    const accessToken = "pk.eyJ1IjoibmV2Zmx5bm4iLCJhIjoiY2ttcTJlbHptMms0cjJ2cW9uaGxxNjI0NSJ9.RJAjJtHGrGB43W_XaylAnA";

    let map: mapboxgl.Map;
    let mapContainer: HTMLDivElement;
    let mapStyle: Writable<string> = writable("mapbox://styles/mapbox/navigation-guidance-night-v4");
    let longitude: Writable<number> = writable(5.68889000);
    let latitude: Writable<number> = writable(50.84833000);
    let zoom: Writable<number> = writable(8);

    function incrementZoom() {
        if ($zoom > 10) return
        $zoom += 3;
    }

    function decrementZoom() {
        if ($zoom < 2) return
        $zoom -= 3;
    }

    onMount(() => {
        map = new mapboxgl.Map({
            accessToken: accessToken,
            container: mapContainer,
            interactive: false,
            style: $mapStyle,
            center: [$longitude, $latitude],
            zoom: $zoom,
            pitch: 0,
            bearing: 0
        });
    });

    onDestroy(() => {
        if (map) map.remove();
    });

    $: $isDarkMode
        ? $mapStyle = "mapbox://styles/mapbox/navigation-guidance-night-v4"
        : $mapStyle = "mapbox://styles/mapbox/navigation-guidance-day-v4";

    $: if (map && $longitude && $latitude && $zoom) {
        map.flyTo({
            center: [$longitude, $latitude],
            zoom: $zoom
        });
    }

    $: if (map && $mapStyle) {
        map.setStyle($mapStyle);
    }
</script>

<div bind:this="{mapContainer}" class="absolute inset-0 h-full w-full"/>

<div class="group absolute flex bg-transparent inset-0 w-full h-full justify-center items-center">
    <div class="w-24 h-24 rounded-full border-4 border-white bg-blue-400/50 justify-center items-center flex transition-all duration-500 rotate">
        <enhanced:img src={Profile} alt="Profile picture" class="h-16 w-16"/>
    </div>
</div>

<button class="map-button map-button-shadow bottom-0 right-0 {$zoom > 10 && 'hidden'}" on:click={incrementZoom}>
    <Plus class="h-full w-full p-2 cursor-pointer"/>
</button>

<button class="map-button map-button-shadow bottom-0 left-0 {$zoom < 2 && 'hidden'}" on:click={decrementZoom}>
    <Minus class="w-full h-full p-2 cursor-grab"/>
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
