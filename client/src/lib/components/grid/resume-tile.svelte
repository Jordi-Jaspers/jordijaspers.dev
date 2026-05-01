<script lang="ts">
	function downloadResume(): void {
		const link = document.createElement('a');
		link.href = '/files/resume.pdf';
		link.download = 'resume.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-between">
	<div class="space-y-2">
		<h1 class="font-moranga text-2xl">You want to know more about me?</h1>
		<p class="font-body">
			Take a quick look at my resume by clicking button. Otherwise, look for the LinkedIn block to have a more in-depth oversight.
		</p>
	</div>

	<button
		class="group flex w-fit items-center justify-center space-x-2 rounded-2xl border-2 border-accent px-8 py-2 transition-colors duration-500 hover:bg-muted/50"
		onclick={downloadResume}
	>
		<span class="font-body text-xs">Download</span>
	</button>
</div>
