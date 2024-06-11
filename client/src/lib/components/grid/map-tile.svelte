<script lang="ts">
    import Profile1 from "$lib/images/profile_picture_1.webp?enhanced";
    import Profile2 from "$lib/images/profile_picture_2.webp?enhanced";
    import { RefreshCcw } from "lucide-svelte";
    import { scale } from "svelte/transition";
    import {quintOut} from "svelte/easing";

    const duration: number = 700;

    let showProfile1: boolean = true;
    let showProfile2: boolean = false;
    let isSwitching: boolean = false;
    function toggleProfile(): void {
        if (isSwitching) return;
        isSwitching = true;

        showProfile2 = !showProfile2;
        showProfile1 = !showProfile1;

        setTimeout(() => {
            isSwitching = false;
        }, duration);
    }
</script>

<div class="flex flex-col justify-between w-full h-full">
    <img src="https://api.mapbox.com/styles/v1/nevflynn/ckmq30o0a0pzx17qoi8dxp3ou/static/-6.2639433,53.304238,8/180x180?access_token=pk.eyJ1IjoibmV2Zmx5bm4iLCJhIjoiY2ttcTJlbHptMms0cjJ2cW9uaGxxNjI0NSJ9.RJAjJtHGrGB43W_XaylAnA&attribution=false&logo=false" alt="Location" class="h-full aspect-square rounded-full"/>
</div>
