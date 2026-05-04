<script lang="ts">
	import { Award } from 'lucide-svelte';
	import type { Certification } from '$lib/data/career';

	interface Props {
		items: Certification[];
	}

	let { items }: Props = $props();
</script>

<div>
	<h2 class="font-heading text-foreground mb-2 text-2xl font-semibold">Certifications</h2>
	<p class="font-body text-muted-foreground mb-10 text-sm">Continuously sharpening the toolkit.</p>

	<div class="flex flex-wrap gap-3">
		{#each items as cert (cert.name)}
			<div class="surface-grain border-border/50 bg-card flex items-center gap-2 rounded-md border px-4 py-2.5">
				<Award class="text-primary h-4 w-4 shrink-0" />
				<div>
					<p class="font-body text-foreground text-sm leading-tight font-medium">{cert.name}</p>
					<p class="font-body text-muted-foreground text-xs leading-tight">{cert.issuer}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
