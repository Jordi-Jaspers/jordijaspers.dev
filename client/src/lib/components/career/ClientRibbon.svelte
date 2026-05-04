<script lang="ts">
	interface Props {
		names: string[];
		label?: string;
	}

	let { names, label = 'WORKED WITH' }: Props = $props();
</script>

<div class="border-border/40 border-y py-6 text-center">
	<p class="font-body text-muted-foreground mb-3 text-[10px] tracking-[0.2em] uppercase">{label}</p>
	<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
		{#each names as name, i (name)}
			<span class="font-heading text-foreground text-lg md:text-xl">{name}</span>
			{#if i < names.length - 1}
				<span class="text-muted-foreground/50 text-sm select-none" aria-hidden="true">·</span>
			{/if}
		{/each}
	</div>
</div>
