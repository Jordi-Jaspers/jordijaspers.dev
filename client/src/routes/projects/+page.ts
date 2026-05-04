import { projects } from '$lib/data/projects';
import type { Project } from '$lib/data/projects';

export interface PageData {
	projects: Project[];
}

export function load(): PageData {
	return { projects };
}
