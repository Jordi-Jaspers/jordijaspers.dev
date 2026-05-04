<script lang="ts">
	import { page } from '$app/state';
	import { House, Briefcase, User, Moon, Sun, FolderOpen } from 'lucide-svelte';
	import { toggleMode, setMode } from 'mode-watcher';
	import { isDarkMode } from '$lib/stores/localstorage.svelte';
	import { untrack } from 'svelte';
	import { crossfade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	$effect(() => {
		untrack(() => setMode(isDarkMode.value ? 'dark' : 'light'));
	});

	function handleToggleMode(): void {
		isDarkMode.value = !isDarkMode.value;
		toggleMode();
	}

	const pathname: string = $derived(page.url.pathname);

	function isActive(href: string): boolean {
		return href === '/' ? pathname === '/' : pathname.startsWith(href);
	}

	const [send, receive] = crossfade({
		duration: 400,
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;
			return {
				duration: 400,
				easing: cubicOut,
				css: (t) => `opacity: ${t}; transform: ${transform} rotate(${t * 360}deg);`
			};
		}
	});

	const navLinks = [
		{ href: '/projects', label: 'Projects', Icon: FolderOpen },
		{ href: '/career', label: 'Career', Icon: Briefcase },
		{ href: '/about', label: 'About', Icon: User }
	] as const;
</script>

<nav class="nav-pill surface-grain">
	<a
		href="/"
		class="font-heading duration-normal rounded-full px-3 py-1.5 text-sm tracking-widest uppercase transition-all
			{isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'}"
		aria-label="Home"
		aria-current={isActive('/') ? 'page' : undefined}
	>
		<span class="flex md:hidden"><House class="h-5 w-5" /></span>
		<span class="hidden md:inline">JJ</span>
	</a>

	<div class="bg-border/50 h-4 w-px" aria-hidden="true"></div>

	{#each navLinks as { href, label, Icon }}
		<a
			{href}
			class="font-body duration-normal relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all
				{isActive(href) ? 'text-primary' : 'text-foreground hover:text-primary'}"
			aria-label={label}
			aria-current={isActive(href) ? 'page' : undefined}
		>
			{#if isActive(href)}<span class="bg-primary/10 absolute inset-0 rounded-full"></span>{/if}
			<span class="relative flex md:hidden"><Icon class="h-4 w-4" /></span>
			<span class="relative hidden md:inline">{label}</span>
		</a>
	{/each}

	<div class="bg-border/50 h-4 w-px" aria-hidden="true"></div>

	<button
		onclick={handleToggleMode}
		class="text-foreground duration-fast hover:text-primary relative flex h-8 w-8 items-center justify-center rounded-full transition-colors"
		aria-label="Toggle theme"
	>
		{#if isDarkMode.value}
			<div class="absolute inset-0 flex items-center justify-center" in:receive={{ key: 'theme' }} out:send={{ key: 'theme' }}>
				<Sun class="h-4 w-4" />
			</div>
		{:else}
			<div class="absolute inset-0 flex items-center justify-center" in:receive={{ key: 'theme' }} out:send={{ key: 'theme' }}>
				<Moon class="h-4 w-4" />
			</div>
		{/if}
	</button>
</nav>

<style>
	.nav-pill {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		bottom: 1.5rem;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		border-radius: 9999px;
		border: 1px solid oklch(from var(--border) l c h / 0.5);
		background: oklch(from var(--background) l c h / 0.8);
		padding: 0.375rem 0.5rem;
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		view-transition-name: nav;
	}

	@media (min-width: 768px) {
		.nav-pill {
			top: 1rem;
			bottom: auto;
		}
	}
</style>
