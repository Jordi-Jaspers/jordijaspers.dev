import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
	plugins: [sveltekit(), enhancedImages()],
	define: {
		__NAME__: `"${pkg.name}"`,
		__VERSION__: `"${pkg.version}"`
	},
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib"),
		},
	}
});
