/**
 * Environment Configuration
 *
 * Centralizes all environment variables with type-safe access.
 * Uses VITE_ prefix for client-side variables (required for static/prerendered sites).
 */

export const env = {
	mapbox: {
		accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string
	}
} as const;
