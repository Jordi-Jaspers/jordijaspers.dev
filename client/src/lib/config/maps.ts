/**
 * Map Style URL Constants
 *
 * Centralizes MapTiler style URLs used by map components.
 */

import { env } from './env';

const key = env.maptiler.key;

export const MAP_STYLES = {
	light: `https://api.maptiler.com/maps/positron/style.json?key=${key}`,
	dark: `https://api.maptiler.com/maps/darkmatter/style.json?key=${key}`
} as const;
