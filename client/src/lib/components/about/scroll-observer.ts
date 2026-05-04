import type { Waypoint } from './types';

export type MapAnimationResult =
	| { type: 'fly'; options: { center: [number, number]; zoom: number; duration: number; essential: true } }
	| { type: 'jump'; options: { center: [number, number]; zoom: number } };

/**
 * Given a list of IntersectionObserver entries and the current active index,
 * returns the index of the most-visible waypoint card (ratio >= 0.5),
 * or the currentIndex if no card meets the threshold.
 */
export function getActiveWaypointIndex(entries: IntersectionObserverEntry[], currentIndex: number): number {
	let bestIndex: number = currentIndex;
	let bestRatio: number = 0.5 - Number.EPSILON; // threshold is inclusive at 0.5

	for (const entry of entries) {
		if (entry.intersectionRatio >= 0.5 && entry.intersectionRatio > bestRatio) {
			bestRatio = entry.intersectionRatio;
			const raw: string = (entry.target as HTMLElement).dataset.waypointIndex ?? '';
			const parsed: number = parseInt(raw, 10);
			if (!isNaN(parsed)) {
				bestIndex = parsed;
			}
		}
	}

	return bestIndex;
}

/**
 * Returns the Mapbox animation options for transitioning to a waypoint.
 * Uses flyTo when motion is allowed, jumpTo when reduced motion is preferred.
 */
export function getMapAnimationOptions(prefersReducedMotion: boolean, waypoint: Waypoint): MapAnimationResult {
	if (prefersReducedMotion) {
		return {
			type: 'jump',
			options: {
				center: waypoint.coordinates,
				zoom: waypoint.zoom
			}
		};
	}

	return {
		type: 'fly',
		options: {
			center: waypoint.coordinates,
			zoom: waypoint.zoom,
			duration: 2000,
			essential: true
		}
	};
}
