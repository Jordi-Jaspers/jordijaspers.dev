<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { Download } from 'lucide-svelte';

	let years: number = $state(0);
	let projects: number = $state(0);
	const yearsTarget: number = 7;
	const projectsTarget: number = 30;

	let container: HTMLElement | undefined = $state();
	let hasAnimated: boolean = false;

	function animateCount(setter: (v: number) => void, target: number, duration: number): void {
		const start: number = performance.now();
		function tick(now: number): void {
			const elapsed: number = now - start;
			const progress: number = Math.min(elapsed / duration, 1);
			const eased: number = 1 - Math.pow(1 - progress, 3);
			setter(Math.round(target * eased));
			if (progress < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}

	onMount(() => {
		if (!container) return;
		const reduced: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			years = yearsTarget;
			projects = projectsTarget;
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting && !hasAnimated) {
						hasAnimated = true;
						animateCount((v) => (years = v), yearsTarget, 800);
						animateCount((v) => (projects = v), projectsTarget, 1000);
						observer.disconnect();
					}
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(container);
		return () => observer.disconnect();
	});

	function downloadResume(e: MouseEvent): void {
		e.preventDefault();
		e.stopPropagation();
		const link: HTMLAnchorElement = document.createElement('a');
		link.href = '/files/resume.pdf';
		link.download = 'resume.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<a href={resolve('/career')} bind:this={container} class="group flex h-full w-full flex-col" aria-label="View career and download resume">
	<!-- Header -->
	<div class="flex items-start justify-between">
		<div>
			<h3 class="font-heading text-foreground text-base font-semibold">Career</h3>
			<p class="font-body text-muted-foreground mt-0.5 text-xs">7 years engineering</p>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="text-muted-foreground h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</svg>
	</div>

	<!-- Stats duo — flex-1 so it fills available space -->
	<div class="surface-grain mt-3 flex flex-1 gap-2">
		<div
			class="border-border/50 bg-card/50 flex flex-1 flex-col items-center justify-center rounded-lg border p-2 transition-transform duration-200 group-hover:scale-[1.02]"
		>
			<div class="font-heading text-primary text-2xl leading-none font-bold">{years}+</div>
			<div class="font-body text-muted-foreground mt-1 text-[10px] tracking-wide uppercase">Years</div>
		</div>
		<div
			class="border-border/50 bg-card/50 flex flex-1 flex-col items-center justify-center rounded-lg border p-2 transition-transform duration-200 group-hover:scale-[1.02]"
		>
			<div class="font-heading text-primary text-2xl leading-none font-bold">{projects}+</div>
			<div class="font-body text-muted-foreground mt-1 text-[10px] tracking-wide uppercase">Projects</div>
		</div>
	</div>

	<!-- PDF download row — in flow, right-aligned, never overlaps stats -->
	<button
		type="button"
		onclick={downloadResume}
		class="text-muted-foreground hover:text-primary mt-2 flex shrink-0 items-center justify-end gap-1 self-end text-[10px] font-medium transition-colors duration-200"
		aria-label="Download resume PDF"
	>
		<Download class="h-3 w-3" />
		Download PDF
	</button>
</a>
