<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import { browser } from '$app/environment';
	import { GithubLogo, LinkedInLogo, SpotifyLogo } from '$lib/components/general';

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		radius: number;
		opacity: number;
	}

	interface Bubble {
		id: string;
		label: string;
		href: string;
		x: number; // 0-1 normalized
		y: number; // 0-1 normalized
		radius: number;
		vx: number;
		vy: number;
		hovered: boolean;
	}

	const SOCIAL_LINKS: { id: string; label: string; href: string; initX: number; initY: number }[] = [
		{
			id: 'github',
			label: 'GitHub',
			href: 'https://github.com/Jordi-Jaspers',
			initX: 0.15,
			initY: 0.35
		},
		{
			id: 'linkedin',
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/jordi-jaspers/',
			initX: 0.82,
			initY: 0.28
		},
		{
			id: 'spotify',
			label: 'Spotify',
			href: 'https://open.spotify.com/user/jordi_jaspers',
			initX: 0.72,
			initY: 0.68
		},
		{
			id: 'email',
			label: 'Email',
			href: 'mailto:jordijaspers@gmail.com',
			initX: 0.22,
			initY: 0.72
		}
	];

	let canvas: HTMLCanvasElement | undefined = $state();
	let containerEl: HTMLDivElement | undefined = $state();
	let reducedMotion: boolean = $state(false);

	// Bubble pixel positions for overlay anchors — updated via rAF, not reactive to avoid loops
	let bubblePositions: { id: string; px: number; py: number; r: number }[] = $state([]);

	// Internal mutable state (NOT reactive — used only inside canvas draw loop)
	let _bubbles: Bubble[] = [];

	$effect(() => {
		if (!browser) return;

		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) return;

		const isMobile = window.innerWidth < 844;
		const PARTICLE_COUNT = isMobile ? 30 : 80;
		const BUBBLE_RADIUS = isMobile ? 28 : 32;
		const BUBBLE_SPEED = 0.15;

		let width = 0;
		let height = 0;
		let particles: Particle[] = [];
		let mouseX = -9999;
		let mouseY = -9999;
		let rafId: number;

		// Init bubbles (plain array, not reactive)
		_bubbles = SOCIAL_LINKS.map((s) => ({
			id: s.id,
			label: s.label,
			href: s.href,
			x: s.initX,
			y: s.initY,
			radius: BUBBLE_RADIUS,
			vx: (Math.random() - 0.5) * BUBBLE_SPEED,
			vy: (Math.random() - 0.5) * BUBBLE_SPEED,
			hovered: false
		}));

		function resize(): void {
			if (!canvas || !containerEl) return;
			width = containerEl.clientWidth;
			height = containerEl.clientHeight;
			canvas.width = width;
			canvas.height = height;
			initParticles();
		}

		function initParticles(): void {
			particles = Array.from({ length: PARTICLE_COUNT }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.4,
				radius: Math.random() * 1.5 + 0.5,
				opacity: Math.random() * 0.5 + 0.2
			}));
		}

		function draw(): void {
			if (!canvas) return;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			ctx.clearRect(0, 0, width, height);

			// Determine colors from CSS vars
			const isDark = document.documentElement.classList.contains('dark');
			const particleColor = isDark ? 'rgba(255,255,255,' : 'rgba(0,0,0,';
			const lineColor = isDark ? 'rgba(255,255,255,' : 'rgba(0,0,0,';

			// Update + draw particles
			for (const p of particles) {
				// Mouse repel
				if (!isMobile) {
					const dx = p.x - mouseX;
					const dy = p.y - mouseY;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 100 && dist > 0) {
						const force = (100 - dist) / 100;
						p.vx += (dx / dist) * force * 0.3;
						p.vy += (dy / dist) * force * 0.3;
					}
				}

				// Dampen velocity
				p.vx *= 0.99;
				p.vy *= 0.99;

				// Clamp speed
				const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
				if (speed > 1.5) {
					p.vx = (p.vx / speed) * 1.5;
					p.vy = (p.vy / speed) * 1.5;
				}

				p.x += p.vx;
				p.y += p.vy;

				// Wrap edges
				if (p.x < 0) p.x = width;
				if (p.x > width) p.x = 0;
				if (p.y < 0) p.y = height;
				if (p.y > height) p.y = 0;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = `${particleColor}${p.opacity})`;
				ctx.fill();
			}

			// Draw connections
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 120) {
						const alpha = (1 - dist / 120) * 0.15;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.strokeStyle = `${lineColor}${alpha})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				}
			}

			// Update + draw bubbles
			const newPositions: { id: string; px: number; py: number; r: number }[] = [];

			for (const b of _bubbles) {
				const px = b.x * width;
				const py = b.y * height;
				const displayR = b.hovered ? b.radius * 1.2 : b.radius;

				// Move
				b.x += b.vx / width;
				b.y += b.vy / height;

				// Bounce off edges
				const margin = (b.radius * 1.5) / width;
				const marginY = (b.radius * 1.5) / height;
				if (b.x < margin || b.x > 1 - margin) b.vx *= -1;
				if (b.y < marginY || b.y > 1 - marginY) b.vy *= -1;
				b.x = Math.max(margin, Math.min(1 - margin, b.x));
				b.y = Math.max(marginY, Math.min(1 - marginY, b.y));

				// Draw bubble circle
				const gradient = ctx.createRadialGradient(px, py, 0, px, py, displayR);
				if (isDark) {
					gradient.addColorStop(0, 'rgba(255,255,255,0.12)');
					gradient.addColorStop(1, 'rgba(255,255,255,0.04)');
				} else {
					gradient.addColorStop(0, 'rgba(0,0,0,0.08)');
					gradient.addColorStop(1, 'rgba(0,0,0,0.02)');
				}

				ctx.beginPath();
				ctx.arc(px, py, displayR, 0, Math.PI * 2);
				ctx.fillStyle = gradient;
				ctx.fill();

				// Border
				ctx.beginPath();
				ctx.arc(px, py, displayR, 0, Math.PI * 2);
				ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)';
				ctx.lineWidth = 1;
				ctx.stroke();

				newPositions.push({ id: b.id, px, py, r: displayR });
			}

			bubblePositions = newPositions;

			rafId = requestAnimationFrame(draw);
		}

		function onMouseMove(e: MouseEvent): void {
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}

		resize();
		draw();

		const ro = new ResizeObserver(resize);
		if (containerEl) ro.observe(containerEl);
		if (!isMobile) canvas?.addEventListener('mousemove', onMouseMove);

		return () => {
			cancelAnimationFrame(rafId);
			ro.disconnect();
			canvas?.removeEventListener('mousemove', onMouseMove);
		};
	});

	function onBubbleHover(id: string, hovered: boolean): void {
		const b = _bubbles.find((b) => b.id === id);
		if (b) b.hovered = hovered;
	}
</script>

<div bind:this={containerEl} class="relative h-full w-full">
	{#if reducedMotion}
		<!-- Static fallback -->
		<div class="flex h-full w-full items-center justify-center">
			<div class="flex flex-wrap justify-center gap-4">
				{#each SOCIAL_LINKS as link (link.id)}
					<a
						href={link.href}
						target={link.href.startsWith('mailto') ? '_self' : '_blank'}
						rel="noopener noreferrer"
						class="border-border bg-card font-body text-foreground hover:bg-accent flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{:else}
		<!-- svelte-ignore a11y_no_interactive_element_to_noninteractive_role -->
		<canvas
			bind:this={canvas}
			class="absolute inset-0 h-full w-full"
			role="img"
			aria-label="Animated particle network background with social links"
		></canvas>

		<!-- Invisible a11y overlays for social bubbles -->
		{#each bubblePositions as pos (pos.id)}
			{@const link = SOCIAL_LINKS.find((l) => l.id === pos.id)}
			{#if link}
				<a
					href={link.href}
					target={link.href.startsWith('mailto') ? '_self' : '_blank'}
					rel="noopener noreferrer"
					aria-label={link.label}
					class="absolute flex items-center justify-center rounded-full transition-transform duration-200"
					style="left: {pos.px - pos.r}px; top: {pos.py - pos.r}px; width: {pos.r * 2}px; height: {pos.r *
						2}px; min-width: 48px; min-height: 48px;"
					onmouseenter={() => onBubbleHover(pos.id, true)}
					onmouseleave={() => onBubbleHover(pos.id, false)}
				>
					<span class="pointer-events-none flex flex-col items-center gap-1">
						{#if pos.id === 'github'}
							<GithubLogo class="fill-foreground h-5 w-5" />
						{:else if pos.id === 'linkedin'}
							<LinkedInLogo class="h-5 w-5 fill-[#0A66C2]" />
						{:else if pos.id === 'spotify'}
							<SpotifyLogo class="h-5 w-5 fill-[#1ED760]" />
						{:else if pos.id === 'email'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<rect width="20" height="16" x="2" y="4" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</svg>
						{/if}
						<span class="font-body text-foreground/70 text-[9px] font-medium">{link.label}</span>
					</span>
				</a>
			{/if}
		{/each}
	{/if}
</div>
