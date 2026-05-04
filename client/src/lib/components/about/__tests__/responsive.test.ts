import { describe, it, expect } from 'vitest';
import { isMobileViewport, shouldLoadMapbox } from '$lib/components/about/responsive';

describe('isMobileViewport', () => {
	describe('Mobile widths (< 844)', () => {
		it('returns true for width 800', () => {
			// Given: a viewport width of 800px
			// When: we check if it is mobile
			// Then: true is returned
			expect(isMobileViewport(800)).toBe(true);
		});

		it('returns true for width 0', () => {
			// Given: a zero-width viewport (edge case)
			// When: we check if it is mobile
			// Then: true is returned
			expect(isMobileViewport(0)).toBe(true);
		});

		it('returns true for width 843 (just below boundary)', () => {
			// Given: a viewport one pixel below the breakpoint
			// When: we check if it is mobile
			// Then: true is returned
			expect(isMobileViewport(843)).toBe(true);
		});
	});

	describe('Desktop widths (>= 844)', () => {
		it('returns false for width 844 (boundary)', () => {
			// Given: a viewport exactly at the breakpoint
			// When: we check if it is mobile
			// Then: false is returned (844 is desktop)
			expect(isMobileViewport(844)).toBe(false);
		});

		it('returns false for width 1200', () => {
			// Given: a typical desktop viewport
			// When: we check if it is mobile
			// Then: false is returned
			expect(isMobileViewport(1200)).toBe(false);
		});

		it('returns false for width 1920', () => {
			// Given: a wide desktop viewport
			// When: we check if it is mobile
			// Then: false is returned
			expect(isMobileViewport(1920)).toBe(false);
		});
	});
});

describe('shouldLoadMapbox', () => {
	describe('Mobile viewport (width < 844)', () => {
		it('returns false for mobile width regardless of reduced motion setting (false)', () => {
			// Given: a mobile viewport and motion is allowed
			// When: we check if Mapbox should load
			// Then: false — Mapbox is skipped on mobile
			expect(shouldLoadMapbox(800, false)).toBe(false);
		});

		it('returns false for mobile width even when reduced motion is preferred', () => {
			// Given: a mobile viewport and reduced motion is preferred
			// When: we check if Mapbox should load
			// Then: false — mobile is the deciding factor, not reduced motion
			expect(shouldLoadMapbox(800, true)).toBe(false);
		});
	});

	describe('Desktop viewport (width >= 844)', () => {
		it('returns true for desktop width when motion is allowed', () => {
			// Given: a desktop viewport and motion is allowed
			// When: we check if Mapbox should load
			// Then: true — Mapbox loads on desktop
			expect(shouldLoadMapbox(1200, false)).toBe(true);
		});

		it('returns true for desktop width even when reduced motion is preferred', () => {
			// Given: a desktop viewport and reduced motion is preferred
			// When: we check if Mapbox should load
			// Then: true — reduced motion only disables animations, not the map itself
			expect(shouldLoadMapbox(1200, true)).toBe(true);
		});

		it('returns true for width exactly at boundary (844)', () => {
			// Given: a viewport exactly at the desktop breakpoint
			// When: we check if Mapbox should load
			// Then: true — 844 is desktop
			expect(shouldLoadMapbox(844, false)).toBe(true);
		});
	});
});
