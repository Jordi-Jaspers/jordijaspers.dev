import { describe, it, expect } from 'vitest';
import { getActiveWaypointIndex, getMapAnimationOptions } from '$lib/components/about/scroll-observer';
import type { Waypoint } from '$lib/components/about/types';

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeEntry(
	waypointIndex: number,
	intersectionRatio: number,
	isIntersecting: boolean = intersectionRatio > 0
): IntersectionObserverEntry {
	return {
		isIntersecting,
		intersectionRatio,
		target: { dataset: { waypointIndex: String(waypointIndex) } } as unknown as Element,
		boundingClientRect: {} as DOMRectReadOnly,
		intersectionRect: {} as DOMRectReadOnly,
		rootBounds: null,
		time: 0
	} as unknown as IntersectionObserverEntry;
}

function aWaypoint(overrides: Partial<Waypoint> = {}): Waypoint {
	return {
		id: 'test',
		name: 'Test',
		location: 'Test City',
		coordinates: [5.33, 50.93],
		zoom: 12,
		description: 'A test waypoint',
		dateRange: '2020 – present',
		...overrides
	};
}

// ─── getActiveWaypointIndex ──────────────────────────────────────────────────

describe('getActiveWaypointIndex', () => {
	describe('No intersecting entries', () => {
		it('returns currentIndex unchanged when entries array is empty', () => {
			// Given: no intersection entries and currentIndex = 2
			const entries: IntersectionObserverEntry[] = [];
			const currentIndex = 2;

			// When: we compute the active waypoint index
			const result = getActiveWaypointIndex(entries, currentIndex);

			// Then: currentIndex is returned as-is
			expect(result).toBe(2);
		});

		it('returns currentIndex when all entries have intersectionRatio below 0.5', () => {
			// Given: entries that are barely visible (ratio < 0.5)
			const entries = [makeEntry(0, 0.3), makeEntry(1, 0.1), makeEntry(2, 0.49)];
			const currentIndex = 1;

			// When: we compute the active waypoint index
			const result = getActiveWaypointIndex(entries, currentIndex);

			// Then: currentIndex is unchanged because no entry meets the threshold
			expect(result).toBe(1);
		});

		it('returns currentIndex when entries are not intersecting (ratio = 0)', () => {
			// Given: entries that have left the viewport
			const entries = [makeEntry(0, 0, false), makeEntry(1, 0, false)];
			const currentIndex = 3;

			// When: we compute the active waypoint index
			const result = getActiveWaypointIndex(entries, currentIndex);

			// Then: currentIndex is unchanged
			expect(result).toBe(3);
		});
	});

	describe('Single intersecting entry', () => {
		it('returns the waypoint index of the intersecting entry when ratio >= 0.5', () => {
			// Given: one entry intersecting at ratio 0.7 for waypoint index 2
			const entries = [makeEntry(2, 0.7)];
			const currentIndex = 0;

			// When: we compute the active waypoint index
			const result = getActiveWaypointIndex(entries, currentIndex);

			// Then: index 2 is returned
			expect(result).toBe(2);
		});

		it('returns the waypoint index when ratio is exactly 0.5 (boundary)', () => {
			// Given: one entry at exactly the threshold
			const entries = [makeEntry(1, 0.5)];
			const currentIndex = 0;

			// When: we compute the active waypoint index
			const result = getActiveWaypointIndex(entries, currentIndex);

			// Then: index 1 is returned (boundary is inclusive)
			expect(result).toBe(1);
		});
	});

	describe('Multiple intersecting entries', () => {
		it('returns the index of the entry with the HIGHEST intersectionRatio', () => {
			// Given: three entries all above threshold, with different ratios
			const entries = [makeEntry(0, 0.6), makeEntry(1, 0.9), makeEntry(2, 0.7)];
			const currentIndex = 0;

			// When: we compute the active waypoint index
			const result = getActiveWaypointIndex(entries, currentIndex);

			// Then: index 1 wins (ratio 0.9 is highest)
			expect(result).toBe(1);
		});

		it('ignores entries below threshold when others are above it', () => {
			// Given: a mix of entries above and below threshold
			const entries = [makeEntry(0, 0.3), makeEntry(1, 0.8), makeEntry(2, 0.2)];
			const currentIndex = 2;

			// When: we compute the active waypoint index
			const result = getActiveWaypointIndex(entries, currentIndex);

			// Then: only index 1 qualifies
			expect(result).toBe(1);
		});
	});
});

// ─── getMapAnimationOptions ──────────────────────────────────────────────────

describe('getMapAnimationOptions', () => {
	describe('Motion allowed (prefersReducedMotion = false)', () => {
		it('returns type "fly" with center, zoom, duration and essential flag', () => {
			// Given: a normal waypoint and motion is allowed
			const waypoint = aWaypoint({ coordinates: [5.33, 50.93], zoom: 12 });

			// When: we get animation options
			const result = getMapAnimationOptions(false, waypoint);

			// Then: fly animation with full options is returned
			expect(result.type).toBe('fly');
			expect(result.options).toMatchObject({
				center: [5.33, 50.93],
				zoom: 12,
				duration: 2000,
				essential: true
			});
		});

		it('returns fly options for Mars waypoint (coordinates [0, 0])', () => {
			// Given: the Mars waypoint with [0, 0] coordinates and motion allowed
			const mars = aWaypoint({ id: 'mars', coordinates: [0, 0], zoom: 1 });

			// When: we get animation options
			const result = getMapAnimationOptions(false, mars);

			// Then: fly type is returned with duration
			expect(result.type).toBe('fly');
			expect(result.options).toMatchObject({
				center: [0, 0],
				zoom: 1,
				duration: 2000
			});
		});
	});

	describe('Reduced motion (prefersReducedMotion = true)', () => {
		it('returns type "jump" with center and zoom only (no duration)', () => {
			// Given: a waypoint and reduced motion is preferred
			const waypoint = aWaypoint({ coordinates: [127.04, 37.55], zoom: 14 });

			// When: we get animation options
			const result = getMapAnimationOptions(true, waypoint);

			// Then: jump animation is returned without duration
			expect(result.type).toBe('jump');
			expect(result.options).toMatchObject({
				center: [127.04, 37.55],
				zoom: 14
			});
			expect((result.options as Record<string, unknown>).duration).toBeUndefined();
		});

		it('returns type "jump" for Mars waypoint when reduced motion is preferred', () => {
			// Given: Mars waypoint and reduced motion
			const mars = aWaypoint({ id: 'mars', coordinates: [0, 0], zoom: 1 });

			// When: we get animation options
			const result = getMapAnimationOptions(true, mars);

			// Then: jump type is returned
			expect(result.type).toBe('jump');
			expect(result.options).toMatchObject({ center: [0, 0], zoom: 1 });
		});
	});
});
