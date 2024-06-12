// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	class GridObject {
		id: string;
		x: number;
		y: number;
		w: number;
		h: number;
		component?: any;
		border: boolean;
	}
}



export {};
