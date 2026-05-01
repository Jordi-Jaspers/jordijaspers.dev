import type { Component } from 'svelte';

declare global {
	namespace App {}

	interface Coordinates {
		id: string;
		x: number;
		y: number;
		w: number;
		h: number;
	}

	interface GridObject extends Coordinates {
		component?: Component;
		category: string[];
		border: boolean;
	}
}

export {};
