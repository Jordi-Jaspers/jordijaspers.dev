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

<div class="flex h-full w-full flex-col justify-between">
	<div>
		<h3 class="font-heading text-foreground text-base font-semibold">Resume</h3>
		<p class="font-body text-muted-foreground mt-0.5 text-xs">Get my latest CV</p>
	</div>

	<div class="flex flex-col gap-2">
		<!-- Download PDF -->
		<button
			onclick={downloadResume}
			class="border-border bg-muted font-body text-foreground hover:border-primary/50 hover:bg-primary hover:text-primary-foreground flex w-full items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200"
			aria-label="Download resume PDF"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3.5 w-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="7 10 12 15 17 10" />
				<line x1="12" x2="12" y1="15" y2="3" />
			</svg>
			Download PDF
		</button>

		<!-- LinkedIn -->
		<a
			href="https://www.linkedin.com/in/jordi-jaspers/"
			target="_blank"
			rel="noopener noreferrer"
			class="border-border bg-muted font-body text-foreground hover:border-[#0A66C2]/50 hover:bg-[#0A66C2] hover:text-white flex w-full items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200"
			aria-label="View LinkedIn profile"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3.5 w-3.5"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
			</svg>
			LinkedIn
		</a>
	</div>
</div>
