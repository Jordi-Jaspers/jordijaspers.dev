<script lang="ts">
	import { onMount } from 'svelte';
	import { GithubLogo } from '$lib/components/general';

	// ─── Types ───────────────────────────────────────────────────────────────────

	interface Contribution {
		date: string;
		count: number;
		level: 0 | 1 | 2 | 3 | 4;
	}

	interface GithubActivityData {
		total: { lastYear: number };
		contributions: Contribution[];
	}

	type LoadState = 'loading' | 'loaded' | 'error';

	// ─── Constants ───────────────────────────────────────────────────────────────

	const GITHUB_PROFILE_URL = 'https://github.com/Jordi-Jaspers';
	const API_URL = 'https://github-contributions-api.jogruber.de/v4/Jordi-Jaspers?y=last';
	const CACHE_KEY = 'github-activity-v1';
	const MAX_WEEKS = 52;
	const DAYS_PER_WEEK = 7;
	const CELL_PX = 11; // must match --activity-cell-size in CSS
	const GAP_PX = 3;

	// ─── Pure helpers ────────────────────────────────────────────────────────────

	/** Number of week columns that fit in the given pixel width, clamped to [1, MAX_WEEKS]. */
	function computeWeeks(width: number): number {
		const fit = Math.floor((width + GAP_PX) / (CELL_PX + GAP_PX));
		return Math.min(MAX_WEEKS, Math.max(1, fit));
	}

	/** Returns true when the response payload contains usable contribution data. */
	function isValidData(data: GithubActivityData | null | undefined): data is GithubActivityData {
		return !!data?.contributions && data.contributions.length > 0;
	}

	/** Reads cached activity data from sessionStorage. Returns null on miss / parse error / private mode. */
	function readCache(): GithubActivityData | null {
		try {
			const raw = sessionStorage.getItem(CACHE_KEY);
			if (!raw) return null;
			const parsed = JSON.parse(raw) as GithubActivityData;
			return isValidData(parsed) ? parsed : null;
		} catch {
			return null;
		}
	}

	/** Writes activity data to sessionStorage. Silent on failure (private mode / quota). */
	function writeCache(data: GithubActivityData): void {
		try {
			sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
		} catch {
			// ignore
		}
	}

	/** Fetches activity from the API. Returns null on network error, non-OK response, or empty payload. */
	async function fetchActivity(): Promise<GithubActivityData | null> {
		try {
			const response = await fetch(API_URL);
			if (!response.ok) return null;
			const data = (await response.json()) as GithubActivityData;
			return isValidData(data) ? data : null;
		} catch {
			return null;
		}
	}

	function prefersReducedMotion(): boolean {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	// ─── State ───────────────────────────────────────────────────────────────────

	let loadState: LoadState = $state('loading');
	let allContributions: Contribution[] = $state([]);
	let total: number = $state(0);
	let reducedMotion: boolean = $state(false);
	let weeks: number = $state(MAX_WEEKS);
	let viewportEl: HTMLElement | null = $state(null);

	// Most recent `weeks * 7` contributions (heatmap is right-anchored).
	const cells: Contribution[] = $derived(allContributions.slice(-(weeks * DAYS_PER_WEEK)));
	const skeletonCount: number = $derived(weeks * DAYS_PER_WEEK);
	const skeletonIndices: number[] = $derived(Array.from({ length: skeletonCount }, (_, i) => i));

	// ─── ResizeObserver ──────────────────────────────────────────────────────────

	$effect(() => {
		if (!viewportEl) return;
		const observer = new ResizeObserver((entries) => {
			const width = entries[0]?.contentRect.width ?? 0;
			if (width > 0) weeks = computeWeeks(width);
		});
		observer.observe(viewportEl);
		return () => observer.disconnect();
	});

	// ─── Lifecycle ───────────────────────────────────────────────────────────────

	function applyData(data: GithubActivityData): void {
		allContributions = data.contributions;
		total = data.total.lastYear;
		loadState = 'loaded';
	}

	onMount(() => {
		reducedMotion = prefersReducedMotion();

		(async () => {
			const cached = readCache();
			if (cached) {
				applyData(cached);
				return;
			}

			const fresh = await fetchActivity();
			if (!fresh) {
				loadState = 'error';
				return;
			}

			writeCache(fresh);
			applyData(fresh);
		})();
	});
</script>

<a
	href={GITHUB_PROFILE_URL}
	target="_blank"
	rel="noopener noreferrer"
	class="group relative flex h-full w-full flex-col justify-between overflow-hidden"
	aria-label="View GitHub activity"
>
	<!-- Header -->
	<div class="flex items-center justify-between">
		<h3 class="font-heading text-foreground text-base font-semibold">Activity</h3>
		<GithubLogo class="fill-foreground h-4 w-4" />
	</div>

	<!-- Body -->
	{#if loadState === 'loading'}
		<div data-testid="activity-skeleton" class="mt-3 flex min-h-0 flex-1 flex-col gap-1 {reducedMotion ? '' : 'animate-pulse'}">
			<div class="bg-muted h-3 w-32 rounded"></div>
			<div class="cells-viewport" bind:this={viewportEl}>
				<div class="cells">
					{#each skeletonIndices as i (i)}
						<div data-testid="activity-cell" data-level="0"></div>
					{/each}
				</div>
			</div>
		</div>
	{:else if loadState === 'loaded'}
		<div data-testid="activity-heatmap" class="mt-3 flex min-h-0 flex-1 flex-col gap-1">
			<p class="font-body text-muted-foreground text-xs">Last year · {total} contributions</p>
			<div class="cells-viewport" bind:this={viewportEl}>
				<div class="cells">
					{#each cells as cell (cell.date)}
						<div data-testid="activity-cell" data-level={cell.level}></div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div data-testid="activity-error" class="mt-3 flex flex-1 items-center justify-center">
			<p class="font-body text-muted-foreground text-xs">Activity unavailable</p>
		</div>
	{/if}
</a>

<style>
	[data-testid='activity-heatmap'] {
		min-height: 0;
		overflow: hidden;
	}

	[data-testid='activity-heatmap'] > .cells-viewport,
	[data-testid='activity-skeleton'] > .cells-viewport {
		width: 100%;
		height: 100%;
		min-height: 0;
		overflow: hidden;
	}

	[data-testid='activity-heatmap'] > .cells-viewport > .cells,
	[data-testid='activity-skeleton'] > .cells-viewport > .cells {
		--activity-cell-size: 11px;
		display: grid;
		grid-template-rows: repeat(7, var(--activity-cell-size));
		grid-auto-flow: column;
		grid-auto-columns: var(--activity-cell-size);
		gap: 3px;
		margin-left: auto; /* right-anchor: older weeks fall off left */
	}

	[data-testid='activity-cell'] {
		border-radius: 2px;
		background: var(--muted);
	}

	[data-testid='activity-cell'][data-level='1'] {
		background: color-mix(in oklch, var(--primary) 25%, var(--muted));
	}

	[data-testid='activity-cell'][data-level='2'] {
		background: color-mix(in oklch, var(--primary) 50%, var(--muted));
	}

	[data-testid='activity-cell'][data-level='3'] {
		background: color-mix(in oklch, var(--primary) 75%, var(--muted));
	}

	[data-testid='activity-cell'][data-level='4'] {
		background: var(--primary);
	}
</style>
