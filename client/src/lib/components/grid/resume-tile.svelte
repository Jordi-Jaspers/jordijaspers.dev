<script lang="ts">
	import { Download, Link, RefreshCcw, Share } from 'lucide-svelte';

	// Function to handle the download of the PDF file
	function downloadResume() {
		const link = document.createElement('a');
		link.href = '/files/resume.pdf'; // Path to the resume file in the static folder
		link.download = 'resume.pdf'; // Set the download attribute to the desired filename
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-between">
	<div class="space-y-2">
		<h1 class="font-moranga text-2xl">You want to know more about me?</h1>
		<p class="font-montserrat">
			Take a quick look at my resume by clicking button. Otherwise, look for the LinkedIn block to have a more in-depth oversight.
		</p>
	</div>

	<button
		class="group flex w-fit items-center justify-center space-x-2 rounded-2xl border-2 border-accent px-8 py-2 transition-colors duration-500 hover:bg-muted/50"
		on:click={downloadResume}
	>
		<Download class="h-4 w-4" />
		<span class="font-montserrat text-xs">Download</span>
	</button>
</div>
