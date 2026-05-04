/**
 * Returns true if the given viewport width is considered mobile (< 844px).
 */
export function isMobileViewport(width: number): boolean {
	return width < 844;
}

/**
 * Returns true if Mapbox GL should be loaded for the given viewport and motion preference.
 * Mapbox is skipped on mobile regardless of reduced-motion preference.
 * On desktop, it always loads (reduced motion only disables animations, not the map).
 */
export function shouldLoadMapbox(width: number, prefersReducedMotion: boolean): boolean {
	void prefersReducedMotion; // reduced motion does not affect map loading
	return !isMobileViewport(width);
}
