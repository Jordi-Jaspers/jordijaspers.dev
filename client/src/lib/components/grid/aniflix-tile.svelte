<script lang="ts">
	import { LinkButton } from '$lib/components/general/index.js';
	import Webpage from '$lib/images/aniflix_mobile.webp?enhanced';
</script>

<div class="flex h-full w-full flex-col justify-between">
	<enhanced:img
		src={Webpage}
		alt="Aniflix"
		class="h-full w-auto translate-x-[40px] translate-y-[32px] rotate-[-25deg] scale-[1.45] rounded-xl"
	/>
	<LinkButton class="bottom-0 left-0" name="Aniflix" href="https://aniflix.stream/" />
</div>
