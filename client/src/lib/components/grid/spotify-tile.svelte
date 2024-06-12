<script lang="ts">
	import { SpotifyLogo } from '$lib/components/general/index.js';
</script>

<div class="flex h-full w-full flex-col justify-between">
	<SpotifyLogo class="h-24 w-24 fill-primary" />
	<div>
		<div class="flex items-center space-x-2">
			<div class="flex space-x-1">
				<div class="bounce h-3 w-1 rounded-2xl bg-primary" />
				<div class="bounce h-3 w-1 rounded-2xl bg-primary" />
				<div class="bounce h-3 w-1 rounded-2xl bg-primary" />
			</div>
			<p class="font-silka text-primary">Online. Last played</p>
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
