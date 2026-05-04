/**
 * Map Utility — shared map initialization helper.
 *
 * Lazy-loads maplibre-gl at runtime so it is not bundled into the initial
 * entry chunk. Returns the initialized map instance and a cleanup function
 * that disconnects the ResizeObserver and removes the map.
 */

import type { Map, MapOptions } from 'maplibre-gl';

export type { Map };

export async function createMap(options: MapOptions): Promise<{ map: Map; cleanup: () => void }> {
	const { default: maplibregl } = await import('maplibre-gl');
	await import('maplibre-gl/dist/maplibre-gl.css');

	const map = new maplibregl.Map(options);

	const resizeObserver = new ResizeObserver(() => map.resize());
	resizeObserver.observe(options.container as HTMLElement);

	return {
		map,
		cleanup: () => {
			resizeObserver.disconnect();
			map.remove();
		}
	};
}
