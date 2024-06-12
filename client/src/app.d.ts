import type {ComponentType} from "svelte";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	class Coordinates {
		id: string;
		x: number;
		y: number;
		w: number;
		h: number;

		constructor(id: string, x: number, y: number, w: number, h: number) {
			this.id = id;
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		}
	}

	class GridObject extends Coordinates {
		component?: ComponentType;
		category: string[];
		border: boolean;

		constructor(
			id: string,
			x: number,
			y: number,
			w: number,
			h: number,
			component: ComponentType,
			category: string[],
			border: boolean
		) {
			super(id, x, y, w, h);
			this.component = component;
			this.category = category;
			this.border = border;
		}
	}

}

export {};
