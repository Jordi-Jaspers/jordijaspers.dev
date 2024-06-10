<script lang="ts">
    import {page} from '$app/stores';
</script>

{#if $page.status === 404}
    <div class="flex h-screen flex-col items-center justify-center space-y-4">
        <h1 class="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
        <p class="mb-8 text-lg">Oops! The page you're looking for doesn't exist.</p>
        <a href="/browse" class="text-blue-500 hover:underline">Go back to the homepage</a>
    </div>
{/if}
