<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		KotlinLogo,
		SpringLogo,
		PostgresLogo,
		DockerLogo,
		KubernetesLogo,
		SvelteLogo,
		TailwindCssLogo,
		GradleLogo,
		LinuxLogo,
		GnuBashLogo,
		JenkinsLogo,
		KeycloakLogo,
		BunLogo,
		NextjsLogo
	} from '$lib/components/stack/index.ts';

	let isHovering1: boolean = $state(false);
	let isHovering2: boolean = $state(false);

	const row1 = [
		{ name: 'Kotlin', logo: KotlinLogo },
		{ name: 'Spring', logo: SpringLogo },
		{ name: 'Postgres', logo: PostgresLogo },
		{ name: 'Docker', logo: DockerLogo },
		{ name: 'K8s', logo: KubernetesLogo },
		{ name: 'Svelte', logo: SvelteLogo },
		{ name: 'Tailwind', logo: TailwindCssLogo }
	];

	const row2 = [
		{ name: 'Gradle', logo: GradleLogo },
		{ name: 'Linux', logo: LinuxLogo },
		{ name: 'Bash', logo: GnuBashLogo },
		{ name: 'Jenkins', logo: JenkinsLogo },
		{ name: 'Keycloak', logo: KeycloakLogo },
		{ name: 'Bun', logo: BunLogo },
		{ name: 'Next.js', logo: NextjsLogo }
	];
</script>

<a href={resolve('/career')} class="group relative flex h-full w-full flex-col justify-between overflow-hidden">
	<h3 class="font-heading text-foreground text-base font-semibold">Tech Stack</h3>

	<!-- Double carousel -->
	<div class="carousel-container">
		<!-- Row 1: scrolls left -->
		<div
			class="carousel-row"
			role="region"
			aria-label="Tech stack row 1"
			onpointerover={() => (isHovering1 = true)}
			onpointerout={() => (isHovering1 = false)}
		>
			<ul class="carousel-track {isHovering1 && 'pause'}">
				{#each row1 as { name, logo: Logo } (name)}
					<li class="carousel-item">
						<Logo class="fill-foreground h-5 w-5 sm:h-6 sm:w-6 dark:fill-white" />
						<p class="font-body text-muted-foreground text-[7px] font-medium whitespace-nowrap">{name}</p>
					</li>
				{/each}
			</ul>
			<ul class="carousel-track {isHovering1 && 'pause'}" aria-hidden="true">
				{#each row1 as { name, logo: Logo } (name + '-dup')}
					<li class="carousel-item">
						<Logo class="fill-foreground h-5 w-5 sm:h-6 sm:w-6 dark:fill-white" />
						<p class="font-body text-muted-foreground text-[7px] font-medium whitespace-nowrap">{name}</p>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Row 2: scrolls right -->
		<div
			class="carousel-row"
			role="region"
			aria-label="Tech stack row 2"
			onpointerover={() => (isHovering2 = true)}
			onpointerout={() => (isHovering2 = false)}
		>
			<ul class="carousel-track-reverse {isHovering2 && 'pause'}">
				{#each row2 as { name, logo: Logo } (name)}
					<li class="carousel-item">
						<Logo class="fill-foreground h-5 w-5 sm:h-6 sm:w-6 dark:fill-white" />
						<p class="font-body text-muted-foreground text-[7px] font-medium whitespace-nowrap">{name}</p>
					</li>
				{/each}
			</ul>
			<ul class="carousel-track-reverse {isHovering2 && 'pause'}" aria-hidden="true">
				{#each row2 as { name, logo: Logo } (name + '-dup')}
					<li class="carousel-item">
						<Logo class="fill-foreground h-5 w-5 sm:h-6 sm:w-6 dark:fill-white" />
						<p class="font-body text-muted-foreground text-[7px] font-medium whitespace-nowrap">{name}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</a>

<style>
	.carousel-container {
		position: relative;
		margin-top: 0.5rem;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
		overflow: hidden;
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
		gap: 1rem;
		padding-right: 1rem;
		flex-shrink: 0;
		animation: scroll-left 30s linear infinite;
	}

	.carousel-track-reverse {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-right: 1rem;
		flex-shrink: 0;
		animation: scroll-right 30s linear infinite;
	}

	.carousel-item {
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 2px 0;
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
