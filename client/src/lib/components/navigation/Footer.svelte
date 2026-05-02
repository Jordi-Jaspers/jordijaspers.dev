<script lang="ts">
	import { Mail } from 'lucide-svelte';
	import { LinkedInLogo, GithubLogo, SpotifyLogo } from '$lib/components/general';

	const socialLinks = [
		{ href: 'https://www.linkedin.com/in/jordi-jaspers/', label: 'LinkedIn', Icon: LinkedInLogo },
		{ href: 'https://github.com/Jordi-Jaspers', label: 'GitHub', Icon: GithubLogo },
		{ href: 'https://open.spotify.com/user/jordi_jaspers', label: 'Spotify', Icon: SpotifyLogo }
	] as const;

	const linkClass = 'text-muted-foreground transition-colors duration-150 hover:text-foreground';
</script>

<footer class="border-t border-border py-12">
	<div class="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6">
		<div class="flex items-center gap-6">
			{#each socialLinks as { href, label, Icon }}
				<a {href} target="_blank" rel="noopener noreferrer" aria-label={label} class={linkClass}>
					<Icon class="h-5 w-5 fill-current" />
				</a>
			{/each}
			<a href="mailto:jordijaspers@gmail.com" aria-label="Email" class={linkClass}>
				<Mail class="h-5 w-5" />
			</a>
		</div>
		<p class="font-body text-sm text-muted-foreground">© 2026 Jordi Jaspers</p>
	</div>
</footer>
