/**
 * Environment Configuration
 *
 * Centralizes all environment variables with type-safe access.
 * Uses VITE_ prefix for client-side variables (required for static/prerendered sites).
 */

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string | undefined;

if (!mapboxToken && typeof window !== 'undefined') {
	console.error(
		'[env] Missing VITE_MAPBOX_ACCESS_TOKEN — map components will fail to render. ' +
			'Ensure the token is set during build (locally via .env, in CI via build-args).'
	);
}

export const env = {
	mapbox: {
		accessToken: mapboxToken ?? ''
	}
} as const;
