import type { Waypoint } from './types';

export const waypoints: Waypoint[] = [
	{
		id: 'hasselt',
		name: 'Hasselt',
		location: 'Belgium',
		coordinates: [5.3325, 50.9307],
		zoom: 12,
		description: 'MSc Electronic & Software Engineering — UHasselt / KULeuven. Where it all started.',
		dateRange: '2014–2019'
	},
	{
		id: 'seoul',
		name: 'Seoul',
		location: 'South Korea',
		coordinates: [127.0447, 37.5563],
		zoom: 11,
		description: 'Exchange semester at Hanyang University. A formative window into Asian engineering culture.',
		dateRange: '2018'
	},
	{
		id: 'maastricht',
		name: 'Maastricht',
		location: 'Netherlands',
		coordinates: [5.691, 50.8514],
		zoom: 12,
		description: 'Lead Software Engineer at Ilionx. Designing systems that matter.',
		dateRange: 'Present'
	},
	{
		id: 'mars',
		name: 'Mars',
		location: 'Space',
		coordinates: [0, 0],
		zoom: 1,
		description: 'Building the future with AI — LLMs, multi-agent systems, and whatever comes after.',
		dateRange: 'Next'
	}
];
