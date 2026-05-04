<script lang="ts">
	interface Stat {
		value: string;
		label: string;
		sublabel?: string;
	}

	interface Props {
		stats: Stat[];
	}

	let { stats }: Props = $props();
</script>

<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
	{#each stats as stat (stat.label)}
		<div
			class="surface-grain border-border bg-card rounded-xl border p-6 text-center transition-transform duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02]"
		>
			<p class="font-heading text-primary text-4xl font-bold md:text-5xl">{stat.value}</p>
			<p class="font-body text-foreground mt-2 text-sm font-medium">{stat.label}</p>
			{#if stat.sublabel}
				<p class="font-body text-muted-foreground mt-0.5 text-xs">{stat.sublabel}</p>
			{/if}
		</div>
	{/each}
</div>
