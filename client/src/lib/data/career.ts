export interface Milestone {
	period: string;
	title: string;
	employer: string;
	clients?: string[];
	capabilities: string[];
	isPresent?: boolean;
}

export interface ClientData {
	names: string[];
}

export interface Stat {
	value: string;
	label: string;
	sublabel?: string;
}

export interface NotableWork {
	id: string;
	title: string;
	tagline: string;
	badge: string;
	badgeVariant: 'nda' | 'internal';
	description: string;
	iconName: 'Network' | 'Brain' | 'Bot';
}

export interface Certification {
	name: string;
	issuer: string;
}

export const timeline: Milestone[] = [
	{
		period: '2018–2021',
		title: 'Junior Software Engineer',
		employer: 'Ilionx',
		capabilities: ['Java/Spring Boot', 'REST APIs', 'CI/CD pipelines', 'First enterprise client exposure'],
		isPresent: false
	},
	{
		period: '2021–2024',
		title: 'Medior Software Engineer',
		employer: 'Ilionx',
		capabilities: [
			'Microservices architecture',
			'Kubernetes & Helm',
			'Distributed systems',
			'OAuth/OIDC integrations',
			'Observability (OpenTelemetry, Prometheus, Grafana)'
		],
		isPresent: false
	},
	{
		period: '2024–Present',
		title: 'Lead Engineer, AI Engineer & Consulting Manager',
		employer: 'Ilionx',
		clients: ['VodafoneZiggo', 'APG', 'TenneT'],
		capabilities: [
			'Leading team of 15+ engineers',
			'LLM training & fine-tuning',
			'RAG pipelines & vector databases',
			'Multi-agent orchestration',
			'Enterprise AI governance',
			'TOGAF & ArchiMate enterprise architecture',
			'Hands-on full-stack delivery'
		],
		isPresent: true
	}
];

export const clientData: ClientData = {
	names: ['VodafoneZiggo', 'APG', 'TenneT']
};

export const stats: Stat[] = [
	{ value: '7+', label: 'Years experience', sublabel: 'since 2018' },
	{ value: '2+', label: 'Years AI/ML', sublabel: 'LLMs & RAG' },
	{ value: '30+', label: 'Projects delivered' },
	{ value: '20+', label: 'Enterprise solutions' }
];

export const notableWork: NotableWork[] = [
	{
		id: 'ai-relay',
		title: 'AI Relay',
		tagline: 'Enterprise AI Gateway & Governance',
		badge: 'NDA · Ilionx',
		badgeVariant: 'nda',
		iconName: 'Network',
		description:
			'Multi-tenant AI provider management platform enabling organizations to safely consume LLMs (OpenAI, Anthropic, local models) with centralized API key issuance, fine-grained team permissions, usage tracking, and cost governance. Provider-agnostic abstraction layer with rate limiting and audit logging — designed to scale horizontally for enterprise AI workloads.'
	},
	{
		id: 'kirchroagpt',
		title: 'KirchroaGPT',
		tagline: 'Domain-Specific Local LLM',
		badge: 'NDA · Local Government',
		badgeVariant: 'nda',
		iconName: 'Brain',
		description:
			'Custom-trained LLM preserving the Kirchroa dialect through OCR digitization of historical books, vector + relational hybrid RAG, and domain-specific prompt tuning. Built for a regional government to enable structured querying of cultural heritage. Deployed in containerized environment with full observability.'
	},
	{
		id: 'multi-agent-platform',
		title: 'Multi-Agent Dev Platform',
		tagline: 'AI-Assisted Engineering',
		badge: 'Internal',
		badgeVariant: 'internal',
		iconName: 'Bot',
		description:
			'Multi-agent system orchestrating code generation, testing, documentation, and deployment for rapid POC/MVP delivery. Human-in-the-loop quality control with Ralph-loop optimizations. Drives a 5-10× productivity multiplier on greenfield builds.'
	}
];

export const certifications: Certification[] = [
	{ name: 'TOGAF Foundation', issuer: 'Global Knowledge' },
	{ name: 'ArchiMate Foundation', issuer: 'Global Knowledge' },
	{ name: 'ArchiMate Practitioner', issuer: 'Global Knowledge' },
	{ name: 'SvelteKit Certified Developer', issuer: 'Global Knowledge' },
	{ name: 'Oracle Certified SQL Developer', issuer: 'Oracle' },
	{ name: 'Oracle Database Design & Management', issuer: 'Coursera' },
	{ name: 'Advanced Micronaut & Spring', issuer: 'Coursera' },
	{ name: 'Machine Learning Basics', issuer: 'Coursera' }
];
