import { timeline, clientData, stats, notableWork, certifications } from '$lib/data/career';
import type { Milestone, ClientData, Stat, NotableWork, Certification } from '$lib/data/career';

export interface PageData {
	timeline: Milestone[];
	client: ClientData;
	stats: Stat[];
	notableWork: NotableWork[];
	certifications: Certification[];
}

export function load(): PageData {
	return { timeline, client: clientData, stats, notableWork, certifications };
}
