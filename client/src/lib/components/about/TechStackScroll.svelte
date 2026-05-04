<script lang="ts">
	import type { Component } from 'svelte';
	import {
		JavaLogo,
		SpringLogo,
		KotlinLogo,
		PythonLogo,
		PytorchLogo,
		HuggingfaceLogo,
		TensorflowLogo,
		LangchainLogo,
		OpenaiLogo,
		GoLogo,
		QuarkusLogo,
		GradleLogo,
		MavenLogo,
		SvelteLogo,
		TypescriptLogo,
		JavascriptLogo,
		ReactLogo,
		AngularLogo,
		VueLogo,
		NextjsLogo,
		HtmlLogo,
		CssLogo,
		TailwindCssLogo,
		BunLogo,
		NodejsLogo,
		DockerLogo,
		KubernetesLogo,
		PostgresLogo,
		MariadbLogo,
		RedisLogo,
		TimescaledbLogo,
		MongodbLogo,
		ElasticsearchLogo,
		GithubActionsLogo,
		CloudflareLogo,
		TraefikLogo,
		GrafanaLogo,
		LinuxLogo,
		GitLogo
	} from '$lib/components/stack/index.ts';

	let isHovering1: boolean = $state(false);
	let isHovering2: boolean = $state(false);
	let isHovering3: boolean = $state(false);

	const row1: { name: string; logo: Component<{ class?: string }> }[] = [
		{ name: 'Java', logo: JavaLogo },
		{ name: 'Spring', logo: SpringLogo },
		{ name: 'Kotlin', logo: KotlinLogo },
		{ name: 'Python', logo: PythonLogo },
		{ name: 'PyTorch', logo: PytorchLogo },
		{ name: 'HuggingFace', logo: HuggingfaceLogo },
		{ name: 'TensorFlow', logo: TensorflowLogo },
		{ name: 'LangChain', logo: LangchainLogo },
		{ name: 'OpenAI', logo: OpenaiLogo },
		{ name: 'Go', logo: GoLogo },
		{ name: 'Quarkus', logo: QuarkusLogo },
		{ name: 'Gradle', logo: GradleLogo },
		{ name: 'Maven', logo: MavenLogo }
	];

	const row2: { name: string; logo: Component<{ class?: string }> }[] = [
		{ name: 'Svelte', logo: SvelteLogo },
		{ name: 'TypeScript', logo: TypescriptLogo },
		{ name: 'JavaScript', logo: JavascriptLogo },
		{ name: 'React', logo: ReactLogo },
		{ name: 'Angular', logo: AngularLogo },
		{ name: 'Vue', logo: VueLogo },
		{ name: 'Next.js', logo: NextjsLogo },
		{ name: 'HTML', logo: HtmlLogo },
		{ name: 'CSS', logo: CssLogo },
		{ name: 'Tailwind', logo: TailwindCssLogo },
		{ name: 'Bun', logo: BunLogo },
		{ name: 'Node.js', logo: NodejsLogo }
	];

	const row3: { name: string; logo: Component<{ class?: string }> }[] = [
		{ name: 'Docker', logo: DockerLogo },
		{ name: 'Kubernetes', logo: KubernetesLogo },
		{ name: 'PostgreSQL', logo: PostgresLogo },
		{ name: 'MariaDB', logo: MariadbLogo },
		{ name: 'Redis', logo: RedisLogo },
		{ name: 'TimescaleDB', logo: TimescaledbLogo },
		{ name: 'MongoDB', logo: MongodbLogo },
		{ name: 'Elasticsearch', logo: ElasticsearchLogo },
		{ name: 'GitHub Actions', logo: GithubActionsLogo },
		{ name: 'Cloudflare', logo: CloudflareLogo },
		{ name: 'Traefik', logo: TraefikLogo },
		{ name: 'Grafana', logo: GrafanaLogo },
		{ name: 'Linux', logo: LinuxLogo },
		{ name: 'Git', logo: GitLogo }
	];
</script>

<div class="carousel-container">
	<!-- Row 1: scrolls right → -->
	<div
		class="carousel-row"
		role="region"
		aria-label="Tech stack row 1 — backend and AI"
		onpointerover={() => (isHovering1 = true)}
		onpointerout={() => (isHovering1 = false)}
	>
		<ul class="carousel-track {isHovering1 && 'pause'}">
			{#each row1 as { name, logo: Logo } (name)}
				<li class="carousel-item">
					<!-- svelte-ignore svelte_component_deprecated -->
					<svelte:component this={Logo} class="fill-foreground h-8 w-8 dark:fill-white" />
					<p class="font-body text-muted-foreground text-[9px] font-medium whitespace-nowrap">{name}</p>
				</li>
			{/each}
		</ul>
		<ul class="carousel-track {isHovering1 && 'pause'}" aria-hidden="true">
			{#each row1 as { name, logo: Logo } (name + '-dup')}
				<li class="carousel-item">
					<!-- svelte-ignore svelte_component_deprecated -->
					<svelte:component this={Logo} class="fill-foreground h-8 w-8 dark:fill-white" />
					<p class="font-body text-muted-foreground text-[9px] font-medium whitespace-nowrap">{name}</p>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Row 2: scrolls left ← -->
	<div
		class="carousel-row"
		role="region"
		aria-label="Tech stack row 2 — frontend"
		onpointerover={() => (isHovering2 = true)}
		onpointerout={() => (isHovering2 = false)}
	>
		<ul class="carousel-track-reverse {isHovering2 && 'pause'}">
			{#each row2 as { name, logo: Logo } (name)}
				<li class="carousel-item">
					<!-- svelte-ignore svelte_component_deprecated -->
					<svelte:component this={Logo} class="fill-foreground h-8 w-8 dark:fill-white" />
					<p class="font-body text-muted-foreground text-[9px] font-medium whitespace-nowrap">{name}</p>
				</li>
			{/each}
		</ul>
		<ul class="carousel-track-reverse {isHovering2 && 'pause'}" aria-hidden="true">
			{#each row2 as { name, logo: Logo } (name + '-dup')}
				<li class="carousel-item">
					<!-- svelte-ignore svelte_component_deprecated -->
					<svelte:component this={Logo} class="fill-foreground h-8 w-8 dark:fill-white" />
					<p class="font-body text-muted-foreground text-[9px] font-medium whitespace-nowrap">{name}</p>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Row 3: scrolls right → -->
	<div
		class="carousel-row"
		role="region"
		aria-label="Tech stack row 3 — data and devops"
		onpointerover={() => (isHovering3 = true)}
		onpointerout={() => (isHovering3 = false)}
	>
		<ul class="carousel-track {isHovering3 && 'pause'}">
			{#each row3 as { name, logo: Logo } (name)}
				<li class="carousel-item">
					<!-- svelte-ignore svelte_component_deprecated -->
					<svelte:component this={Logo} class="fill-foreground h-8 w-8 dark:fill-white" />
					<p class="font-body text-muted-foreground text-[9px] font-medium whitespace-nowrap">{name}</p>
				</li>
			{/each}
		</ul>
		<ul class="carousel-track {isHovering3 && 'pause'}" aria-hidden="true">
			{#each row3 as { name, logo: Logo } (name + '-dup')}
				<li class="carousel-item">
					<!-- svelte-ignore svelte_component_deprecated -->
					<svelte:component this={Logo} class="fill-foreground h-8 w-8 dark:fill-white" />
					<p class="font-body text-muted-foreground text-[9px] font-medium whitespace-nowrap">{name}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.carousel-container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		overflow: hidden;
		padding: 1rem 0;
	}

	.carousel-row {
		display: flex;
		overflow-x: hidden;
		overflow-y: visible;
		width: 100%;
	}

	.carousel-track {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding-right: 2rem;
		flex-shrink: 0;
		animation: scroll-left 30s linear infinite;
	}

	.carousel-track-reverse {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding-right: 2rem;
		flex-shrink: 0;
		animation: scroll-right 30s linear infinite;
	}

	.carousel-item {
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 4px 0;
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}

	@keyframes scroll-right {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.pause {
		animation-play-state: paused;
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-track,
		.carousel-track-reverse {
			animation: none;
		}
	}
</style>
