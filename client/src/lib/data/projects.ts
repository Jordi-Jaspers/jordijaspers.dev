import aniflixWeb from '$lib/images/aniflix_web.webp';
import eventify1 from '$lib/images/eventify_1.webp';
import eventify2 from '$lib/images/eventify_2.webp';
import jframeLogo from '$lib/images/jframe.webp';

export interface Project {
	id: string;
	title: string;
	tagline: string;
	techStack: string[];
	status: 'active' | 'archived';
	liveUrl?: string;
	githubUrl: string;
	image?: string | string[];
	imageFit?: 'cover' | 'contain';
	placeholderType?: 'framework' | 'monitoring';
	detail: string;
}

export const projects: Project[] = [
	{
		id: 'aniflix',
		title: 'Aniflix',
		tagline: 'Ad-free anime streaming with modern UI and quality-of-life features',
		techStack: ['Spring Boot', 'SvelteKit', 'TailwindCSS', 'MariaDB', 'Redis', 'Docker', 'Cloudflare'],
		status: 'archived',
		liveUrl: 'https://aniflix.stream/',
		githubUrl: 'https://github.com/Jordi-Jaspers/Aniflix',
		image: aniflixWeb,
		detail:
			'Full-stack streaming platform with auth, search, library management, watch history, recommendations, and a custom video player. Built with a Spring Boot backend and SvelteKit frontend, using MariaDB for persistence and Redis for caching. Deployed via Docker behind Cloudflare. Currently archived but represents a complete production-grade implementation of a modern streaming experience.'
	},
	{
		id: 'jframe',
		title: 'JFrame',
		tagline: 'Enterprise-grade utilities for Spring Boot and Quarkus applications',
		techStack: ['Java 21', 'Spring Boot 4.1', 'Quarkus 3.20', 'Gradle', 'OpenTelemetry'],
		status: 'active',
		githubUrl: 'https://github.com/JFrameOSS/JFrame',
		image: jframeLogo,
		imageFit: 'contain',
		detail:
			'A modular Java framework providing structured exception handling, ECS-compliant logging, paginated search, OpenTelemetry tracing, fluent validation, and SQL query logging. Multi-module architecture: jframe-core for shared primitives, jframe-spring for Spring Boot integration, jframe-quarkus for Quarkus. Apache 2.0 licensed and designed to eliminate boilerplate across enterprise Java services.'
	},
	{
		id: 'eventify',
		title: 'Eventify',
		tagline: 'Intelligent service monitoring and event management platform',
		techStack: ['Spring Boot', 'SvelteKit', 'TailwindCSS', 'TimescaleDB', 'RabbitMQ', 'Bun'],
		status: 'active',
		liveUrl: 'https://eventify-tst.jordijaspers.dev/',
		githubUrl: 'https://github.com/Jordi-Jaspers/Eventify',
		image: [eventify1, eventify2],
		detail:
			'Full-stack monitoring tool for service health tracking, intelligent event creation, organization management, and real-time visualization. TimescaleDB powers time-series storage for metric history; RabbitMQ handles async event processing. Frontend served via Bun for fast cold starts. Designed for teams that need observability without the complexity of full APM suites.'
	}
];
