<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { waypoints } from './waypoints';
</script>

<div class="mobile-timeline">
	{#each waypoints as waypoint, i (waypoint.id)}
		<div class="timeline-item">
			<!-- Connector line -->
			{#if i < waypoints.length - 1}
				<div class="timeline-line"></div>
			{/if}

			<!-- Pin dot -->
			<div class="timeline-dot">
				<MapPin class="text-primary-foreground h-3 w-3" />
			</div>

			<!-- Card content -->
			<div class="timeline-content surface-grain border-border/50 bg-card/40 rounded-xl border p-5">
				<div class="mb-2 flex items-center justify-between">
					<span class="font-body text-muted-foreground text-xs">{waypoint.location}</span>
					<span class="font-body text-muted-foreground text-xs opacity-70">{waypoint.dateRange}</span>
				</div>
				<h3 class="font-heading text-foreground mb-2 text-lg font-semibold">{waypoint.name}</h3>
				<p class="font-body text-muted-foreground text-sm leading-relaxed">{waypoint.description}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.mobile-timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.timeline-item {
		position: relative;
		display: flex;
		gap: 1rem;
		padding-bottom: 2rem;
	}

	.timeline-dot {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background-color: hsl(var(--primary));
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 0.25rem;
		z-index: 1;
	}

	.timeline-line {
		position: absolute;
		left: 0.9375rem;
		top: 2.25rem;
		bottom: 0;
		width: 2px;
		background: linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--border) / 0.3));
	}

	.timeline-content {
		flex: 1;
	}
</style>
