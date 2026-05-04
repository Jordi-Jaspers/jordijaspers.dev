<script lang="ts">
	import { Pill } from '$lib/components/general';
	import type { Milestone } from '$lib/data/career';

	interface Props {
		milestones: Milestone[];
	}

	let { milestones }: Props = $props();
</script>

<div>
	<h2 class="font-heading text-foreground mb-10 text-2xl font-semibold">Career</h2>

	<div class="relative">
		<!-- Vertical line -->
		<div class="bg-primary/40 absolute top-0 bottom-0 left-4 w-0.5"></div>

		<div class="space-y-0">
			{#each milestones as milestone (milestone.period)}
				<div class="relative flex items-start gap-6 pb-12 last:pb-0">
					<!-- Node -->
					<div class="relative z-10 mt-1 shrink-0">
						<div
							class="border-background bg-primary ml-2.5 h-3 w-3 rounded-full border-2 {milestone.isPresent ? 'timeline-node-pulse' : ''}"
						></div>
					</div>

					<!-- Content -->
					<div class="min-w-0 flex-1">
						<p class="font-body text-muted-foreground mb-1 text-sm">{milestone.period}</p>
						<h3 class="font-heading text-foreground font-semibold text-balance">{milestone.title}</h3>
						<p class="font-body text-muted-foreground mt-0.5 text-sm">
							{#if milestone.clients?.length}
								{milestone.employer} · {milestone.clients.join(', ')}
							{:else}
								{milestone.employer}
							{/if}
						</p>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each milestone.capabilities as cap (cap)}
								<Pill>{cap}</Pill>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes timeline-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 oklch(from var(--color-primary) l c h / 0.5);
		}
		50% {
			box-shadow: 0 0 0 8px oklch(from var(--color-primary) l c h / 0);
		}
	}

	.timeline-node-pulse {
		animation: timeline-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}
</style>
