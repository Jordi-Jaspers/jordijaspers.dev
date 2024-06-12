<script lang="ts">
    import {Link} from "lucide-svelte";

    let className: string = "fill-[#1ED760] h-[256px] w-[256px]"
    export { className as class };
    export let name: string;
    export let href: string;
</script>

<a class="group link-button link-button-hover {className}" href="{href}">
    <div class="w-fit h-full flex overflow-hidden items-center justify-between">
        <Link class="w-8 h-8 p-2"/>
        <p class="font-montserrat text-xs">{name}</p>
    </div>
</a>
