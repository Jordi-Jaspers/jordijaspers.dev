<script lang="ts">
    import {SpotifyLogo} from "$lib/components/general/index.js";
</script>

<div class="flex flex-col justify-between w-full h-full">
    <SpotifyLogo class="h-24 w-24 fill-primary"/>
    <div>
        <div class="flex space-x-2 items-center">
            <div class="flex space-x-1">
                <div class="w-1 h-3 bg-primary rounded-2xl bounce"/>
                <div class="w-1 h-3 bg-primary rounded-2xl bounce"/>
                <div class="w-1 h-3 bg-primary rounded-2xl bounce"/>
            </div>
            <p class="text-primary font-silka">Online. Last played</p>
        </div>
        <h2 class="font-moranga text-4xl">Blinding Lights</h2>
        <p class="font-silka">The Weeknd</p>
    </div>
</div>

<style>
    @keyframes bounce {
        0% {
            transform: scaleY(0.3); /* start by scaling to 30% */
        }

        50% {
            transform: scaleY(1); /* scale up to 100% */
        }

        100% {
            transform: scaleY(0.3); /* scale back to 30% */
        }
    }

    .bounce:nth-of-type(1) {
        animation: bounce 0.75s ease infinite;
    }

    .bounce:nth-of-type(2) {
        animation: bounce 1.25s ease infinite;
    }

    .bounce:nth-of-type(3) {
        animation: bounce 0.5s ease infinite;
    }
</style>
