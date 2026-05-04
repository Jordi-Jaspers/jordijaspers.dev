import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: false,
		include: ['src/**/*.{test,spec}.ts'],
		alias: {
			$lib: path.resolve('./src/lib'),
			'$app/environment': path.resolve('./src/__mocks__/app-environment.ts')
		}
	}
});
