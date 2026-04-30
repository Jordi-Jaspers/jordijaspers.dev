<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<main>
	<ModeWatcher defaultMode="light" />
	<slot />
	<Toaster />
</main>
