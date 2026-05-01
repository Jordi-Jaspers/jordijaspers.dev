<script lang="ts">
	import { Link } from 'lucide-svelte';

	interface Props {
		class?: string;
		name: string;
		href: string;
	}

	let { class: className = '', name, href }: Props = $props();
</script>

<a class="link-button link-button-hover group {className}" {href}>
	<div class="flex h-full w-fit items-center justify-between overflow-hidden">
		<Link class="h-8 w-8 p-2" />
		<p class="font-montserrat text-xs">{name}</p>
	</div>
</a>
