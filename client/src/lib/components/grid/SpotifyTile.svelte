<script lang="ts">
	import { SpotifyLogo } from '$lib/components/general';
</script>

<a
	href="https://open.spotify.com/user/jordi_jaspers"
	target="_blank"
	rel="noopener noreferrer"
	class="group relative flex h-full w-full flex-col justify-between overflow-hidden"
	aria-label="Now playing on Spotify"
>
	<!-- Header with online indicator -->
	<div class="flex items-center gap-1.5">
		<span class="relative flex h-2 w-2 shrink-0">
			<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1ED760] opacity-75"></span>
			<span class="relative inline-flex h-2 w-2 rounded-full bg-[#1ED760]"></span>
		</span>
		<p class="font-body text-muted-foreground text-[10px] font-medium tracking-wider uppercase">Now Playing</p>
	</div>

	<!-- Song info + bars -->
	<div class="flex items-end justify-between gap-2 overflow-hidden">
		<div class="min-w-0">
			<p class="font-heading text-foreground truncate text-sm leading-tight font-semibold">Blinding Lights</p>
			<p class="font-body text-muted-foreground mt-0.5 truncate text-xs">The Weeknd</p>
		</div>

		<!-- Bouncing bars -->
		<div class="flex shrink-0 items-end gap-[2px]">
			<div class="spotify-bar" style="animation-delay: 0s;"></div>
			<div class="spotify-bar" style="animation-delay: 0.2s;"></div>
			<div class="spotify-bar" style="animation-delay: 0.4s;"></div>
			<div class="spotify-bar" style="animation-delay: 0.1s;"></div>
			<div class="spotify-bar" style="animation-delay: 0.3s;"></div>
		</div>
	</div>

	<!-- Spotify branding -->
	<div class="flex items-center gap-1.5">
		<SpotifyLogo class="h-4 w-4 shrink-0 fill-[#1ED760]" />
		<p class="font-body text-muted-foreground text-[10px]">Spotify</p>
	</div>
</a>

<style>
	.spotify-bar {
		width: 3px;
		height: 14px;
		border-radius: 9999px;
		background-color: #1ed760;
		transform-origin: bottom;
		animation: spotify-bounce 0.6s ease-in-out infinite;
	}

	@keyframes spotify-bounce {
		0%,
		100% {
			transform: scaleY(0.3);
		}
		50% {
			transform: scaleY(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spotify-bar {
			animation: none;
			transform: scaleY(0.6);
		}
	}
</style>
