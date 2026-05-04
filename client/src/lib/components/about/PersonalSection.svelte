<script lang="ts">
	import { SpotifyLogo } from '$lib/components/general';
</script>

<div class="space-y-8">
	<!-- Hapkido -->
	<div class="surface-grain border-border/50 bg-card/40 rounded-xl border p-6">
		<div class="flex items-start gap-4">
			<div class="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl">🥋</div>
			<div>
				<h3 class="font-heading text-foreground text-lg font-semibold">Hapkido</h3>
				<p class="font-body text-primary text-sm font-medium">3rd Degree Black Belt</p>
				<p class="font-body text-muted-foreground mt-2 text-sm leading-relaxed">
					Discipline, precision, and continuous improvement — principles that translate directly from the mat to engineering.
				</p>
			</div>
		</div>
	</div>

	<!-- Spotify -->
	<div class="surface-grain border-border/50 bg-card/40 rounded-xl border p-6">
		<div class="flex items-start gap-4">
			<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1ED760]/10">
				<SpotifyLogo class="h-6 w-6 fill-[#1ED760]" />
			</div>
			<div>
				<h3 class="font-heading text-foreground text-lg font-semibold">Music</h3>
				<p class="font-body text-muted-foreground mt-1 text-sm leading-relaxed">
					Good code deserves a good soundtrack. Find what's playing on my Spotify profile.
				</p>
				<a
					href="https://open.spotify.com/user/jordi_jaspers"
					target="_blank"
					rel="noopener noreferrer"
					class="font-body mt-3 inline-flex items-center gap-2 rounded-full bg-[#1ED760]/10 px-4 py-2 text-sm font-medium text-[#1ED760] transition-all duration-200 hover:bg-[#1ED760]/20"
					aria-label="View Jordi's Spotify profile"
				>
					<SpotifyLogo class="h-4 w-4 fill-[#1ED760]" />
					Open Spotify Profile
				</a>
			</div>
		</div>
	</div>
</div>
