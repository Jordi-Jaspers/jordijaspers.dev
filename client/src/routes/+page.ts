// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import {LightSwitch} from "$lib/components/general";
import {IntroductionTile, MapTile} from "$lib/components/grid";

export const prerender = true;

const desktopLayout: GridObject[] = [
    { id: 'grid-item-1', x: 0, y: 3, w: 1, h: 1, component: LightSwitch },
    { id: 'grid-item-2', x: 0, y: 2, w: 2, h: 1, component: MapTile },
    { id: 'grid-item-3', x: 0, y: 0, w: 2, h: 2, component: IntroductionTile}
]

const mobileLayout: GridObject[] = [
    { id: 'grid-item-1', x: 0, y: 3, w: 1, h: 1, component: LightSwitch },
    { id: 'grid-item-2', x: 0, y: 2, w: 2, h: 1, component: MapTile },
    { id: 'grid-item-3', x: 0, y: 0, w: 2, h: 2, component: IntroductionTile}
]

export function load({ params }) {
    return {
        mobileLayout,
        desktopLayout
    };
}
