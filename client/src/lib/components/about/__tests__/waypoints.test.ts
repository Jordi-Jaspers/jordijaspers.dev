import { describe, it, expect } from 'vitest';
import { waypoints } from '$lib/components/about/waypoints';
import type { Waypoint } from '$lib/components/about/types';

describe('waypoints data', () => {
	describe('Array shape', () => {
		it('exports exactly 4 waypoints in order', () => {
			// Given: the waypoints export
			// When: we inspect the array
			// Then: exactly 4 entries exist
			expect(waypoints).toHaveLength(4);
		});

		it('waypoints are ordered Hasselt → Seoul → Maastricht → Mars', () => {
			// Given: the waypoints array
			// When: we read the ids in order
			// Then: ids match the expected sequence
			const ids = waypoints.map((w: Waypoint) => w.id);
			expect(ids).toEqual(['hasselt', 'seoul', 'maastricht', 'mars']);
		});
	});

	describe('Required fields', () => {
		it('every waypoint has all required string fields', () => {
			// Given: the waypoints array
			// When: we inspect each entry
			// Then: id, name, location, description, dateRange are non-empty strings
			for (const w of waypoints) {
				expect(typeof w.id).toBe('string');
				expect(w.id.length).toBeGreaterThan(0);
				expect(typeof w.name).toBe('string');
				expect(w.name.length).toBeGreaterThan(0);
				expect(typeof w.location).toBe('string');
				expect(w.location.length).toBeGreaterThan(0);
				expect(typeof w.description).toBe('string');
				expect(w.description.length).toBeGreaterThan(0);
				expect(typeof w.dateRange).toBe('string');
				expect(w.dateRange.length).toBeGreaterThan(0);
			}
		});

		it('every waypoint has a zoom value between 1 and 20', () => {
			// Given: the waypoints array
			// When: we inspect each zoom value
			// Then: all zooms are within valid Mapbox range
			for (const w of waypoints) {
				expect(w.zoom).toBeGreaterThanOrEqual(1);
				expect(w.zoom).toBeLessThanOrEqual(20);
			}
		});

		it('all waypoint ids are unique', () => {
			// Given: the waypoints array
			// When: we collect all ids
			// Then: no duplicates exist
			const ids = waypoints.map((w: Waypoint) => w.id);
			const unique = new Set(ids);
			expect(unique.size).toBe(waypoints.length);
		});

		it('every waypoint has a coordinates array of length 2', () => {
			// Given: the waypoints array
			// When: we inspect coordinates
			// Then: each is [lng, lat] tuple
			for (const w of waypoints) {
				expect(Array.isArray(w.coordinates)).toBe(true);
				expect(w.coordinates).toHaveLength(2);
			}
		});
	});

	describe('Hasselt waypoint', () => {
		it('has coordinates approximately [5.3325, 50.9307]', () => {
			// Given: the Hasselt waypoint
			const hasselt = waypoints.find((w: Waypoint) => w.id === 'hasselt')!;

			// When: we read its coordinates
			// Then: lng and lat are close to the expected values
			expect(hasselt).toBeDefined();
			expect(hasselt.coordinates[0]).toBeCloseTo(5.3325, 1);
			expect(hasselt.coordinates[1]).toBeCloseTo(50.9307, 1);
		});
	});

	describe('Seoul waypoint', () => {
		it('has coordinates approximately [127.0447, 37.5563]', () => {
			// Given: the Seoul waypoint
			const seoul = waypoints.find((w: Waypoint) => w.id === 'seoul')!;

			// When: we read its coordinates
			// Then: lng and lat are close to the expected values
			expect(seoul).toBeDefined();
			expect(seoul.coordinates[0]).toBeCloseTo(127.0447, 1);
			expect(seoul.coordinates[1]).toBeCloseTo(37.5563, 1);
		});
	});

	describe('Maastricht waypoint', () => {
		it('has coordinates approximately [5.6910, 50.8514]', () => {
			// Given: the Maastricht waypoint
			const maastricht = waypoints.find((w: Waypoint) => w.id === 'maastricht')!;

			// When: we read its coordinates
			// Then: lng and lat are close to the expected values
			expect(maastricht).toBeDefined();
			expect(maastricht.coordinates[0]).toBeCloseTo(5.691, 1);
			expect(maastricht.coordinates[1]).toBeCloseTo(50.8514, 1);
		});
	});

	describe('Mars waypoint', () => {
		it('has coordinates [0, 0] for globe view', () => {
			// Given: the Mars waypoint
			const mars = waypoints.find((w: Waypoint) => w.id === 'mars')!;

			// When: we read its coordinates
			// Then: coordinates are [0, 0] (globe/placeholder)
			expect(mars).toBeDefined();
			expect(mars.coordinates[0]).toBe(0);
			expect(mars.coordinates[1]).toBe(0);
		});

		it('has zoom <= 1.5 for globe-level view', () => {
			// Given: the Mars waypoint
			const mars = waypoints.find((w: Waypoint) => w.id === 'mars')!;

			// When: we read its zoom
			// Then: zoom is at globe level
			expect(mars.zoom).toBeLessThanOrEqual(1.5);
		});
	});
});
