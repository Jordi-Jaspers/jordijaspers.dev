<script lang="ts">
	import { Link } from 'lucide-svelte';

	let className: string = 'fill-[#1ED760] h-[256px] w-[256px]';
	export { className as class };
	export let name: string;
	export let href: string;
</script>

<a class="link-button link-button-hover group {className}" {href}>
	<div class="flex h-full w-fit items-center justify-between overflow-hidden">
		<Link class="h-8 w-8 p-2" />
		<p class="font-montserrat text-xs">{name}</p>
	</div>
</a>
