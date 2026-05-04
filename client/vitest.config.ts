import { defineConfig } from 'vitest/config';
// Use vite-plugin-svelte v4 for tests (compatible with Vite 5 used by vitest)
// v7 is used by the main vite.config.ts for the app build
import { svelte } from '@sveltejs-test/vite-plugin-svelte';
import path from 'node:path';

export default defineConfig({
	plugins: [svelte({ preprocess: false })],
	resolve: {
		conditions: ['browser', 'default', 'module', 'import', 'require']
	},
	test: {
		environment: 'jsdom',
		globals: false,
		setupFiles: ['@testing-library/svelte/vitest', './src/__mocks__/resize-observer.ts'],
		include: ['src/**/*.{test,spec}.ts'],
		alias: {
			$lib: path.resolve('./src/lib'),
			'$app/environment': path.resolve('./src/__mocks__/app-environment.ts'),
			'$app/paths': path.resolve('./src/__mocks__/app-paths.ts')
		}
	}
});
