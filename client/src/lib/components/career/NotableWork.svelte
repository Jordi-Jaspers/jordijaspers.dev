<script lang="ts">
	import { Network, Brain, Bot } from 'lucide-svelte';
	import type { NotableWork } from '$lib/data/career';

	interface Props {
		items: NotableWork[];
	}

	let { items }: Props = $props();

	const iconMap = {
		Network,
		Brain,
		Bot
	} as const;
</script>

<div>
	<h2 class="font-heading text-foreground mb-2 text-2xl font-semibold">Notable Enterprise Work</h2>
	<p class="font-body text-muted-foreground mb-10 text-sm">Selected projects under NDA — described at a high level.</p>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each items as item (item.id)}
			{@const Icon = iconMap[item.iconName]}
			<div class="surface-grain border-border/50 bg-card relative rounded-lg border p-6">
				<!-- Icon + Badge row -->
				<div class="mb-4 flex items-start justify-between">
					<Icon class="text-primary h-8 w-8 shrink-0" />
					<span
						class="font-body rounded-full px-2.5 py-0.5 text-xs font-medium
						{item.badgeVariant === 'nda'
							? 'bg-secondary text-secondary-foreground border-border border'
							: 'bg-primary/10 text-primary border-primary/20 border'}"
					>
						{item.badge}
					</span>
				</div>

				<!-- Title + tagline -->
				<h3 class="font-heading text-foreground text-xl font-semibold">{item.title}</h3>
				<p class="font-body text-muted-foreground mt-1 text-sm">{item.tagline}</p>

				<!-- Description -->
				<p class="font-body text-muted-foreground mt-4 text-sm leading-relaxed">{item.description}</p>
			</div>
		{/each}
	</div>
</div>
