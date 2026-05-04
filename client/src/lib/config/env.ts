/**
 * Environment Configuration
 *
 * Centralizes all environment variables with type-safe access.
 * Uses VITE_ prefix for client-side variables (required for static/prerendered sites).
 */

const maptilerKey = import.meta.env.VITE_MAPTILER_KEY as string | undefined;

if (!maptilerKey && typeof window !== 'undefined') {
	console.error(
		'[env] Missing VITE_MAPTILER_KEY — map components will fail to render. ' +
			'Ensure the key is set during build (locally via .env, in CI via build-args).'
	);
}

export const env = {
	maptiler: {
		key: maptilerKey ?? ''
	}
} as const;
