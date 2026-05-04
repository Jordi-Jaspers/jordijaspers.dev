export interface Narrative {
	eyebrow: string;
	heading: string;
	body: string;
	footer: string;
}

export const narratives: Narrative[] = [
	{
		eyebrow: 'Chapter 01 · 2002',
		heading: 'Where it began',
		body: 'A small Belgian town. Curious kid, two parents, one bike. Long before code, there were LEGOs and an obsession with how things fit together. The puzzle never really stopped.',
		footer: '📍 Hasselt, Belgium · The early years'
	},
	{
		eyebrow: 'Chapter 02 · 2018',
		heading: '9,000 km from home',
		body: 'A semester abroad turned into the year that rewired everything. Different language, different food, different way of thinking. Came back changed — restless, hungry, certain that the world was bigger than I\'d imagined.',
		footer: '📍 Seoul, South Korea · Exchange semester'
	},
	{
		eyebrow: 'Chapter 03 · Now',
		heading: 'Building things that matter',
		body: 'Seven years of enterprise software later. Backend systems, distributed architectures, teams shipped, problems solved. Maastricht is base camp — a quiet university town where the real work happens between cups of coffee.',
		footer: '📍 Maastricht, Netherlands · Currently'
	},
	{
		eyebrow: 'Chapter ∞ · Someday',
		heading: 'The next frontier',
		body: 'AI is rewriting what software can do. Models that reason, agents that act, systems that learn. The map ends here for now — but the journey doesn\'t. Whatever comes next, I want to be building it.',
		footer: '📍 Somewhere out there · The future'
	}
];
