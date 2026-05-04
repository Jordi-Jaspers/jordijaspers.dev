import { timeline, stats, notableWork, certifications } from '$lib/data/career';
import type { Milestone, Stat, NotableWork, Certification } from '$lib/data/career';

export interface PageData {
	timeline: Milestone[];
	stats: Stat[];
	notableWork: NotableWork[];
	certifications: Certification[];
}

export function load(): PageData {
	return { timeline, stats, notableWork, certifications };
}
