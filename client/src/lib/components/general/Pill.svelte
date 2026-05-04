<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<span class="font-body bg-secondary text-secondary-foreground inline-block rounded-full px-2.5 py-0.5 text-xs font-medium {className}">
	{@render children()}
</span>
