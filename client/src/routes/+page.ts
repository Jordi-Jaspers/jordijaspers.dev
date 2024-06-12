// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import {LightSwitch} from "$lib/components/general";
import {
    AniflixTile,
    GithubTile,
    IntroductionTile,
    LinkedInTile,
    MapTile,
    ResumeTile,
    SpotifyTile,
    TechStackTile
} from "$lib/components/grid";

export const prerender = true;

const desktopLayout: GridObject[] = [
    {id: 'grid-item-1', x: 2, y: 0, w: 1, h: 1, component: LightSwitch, border: true},
    {id: 'grid-item-2', x: 0, y: 2, w: 2, h: 1, component: MapTile, border: false},
    {id: 'grid-item-3', x: 0, y: 0, w: 2, h: 2, component: IntroductionTile, border: true},
    {id: 'grid-item-4', x: 2, y: 1, w: 2, h: 2, component: SpotifyTile, border: true},
    {id: 'grid-item-5', x: 3, y: 0, w: 1, h: 1, component: GithubTile, border: true},
    {id: 'grid-item-6', x: 1, y: 3, w: 1, h: 2, component: AniflixTile, border: true},
    {id: 'grid-item-7', x: 0, y: 4, w: 1, h: 2, component: TechStackTile, border: true},
    {id: 'grid-item-8', x: 2, y: 3, w: 2, h: 2, component: ResumeTile, border: true},
    {id: 'grid-item-9', x: 0, y: 3, w: 1, h: 1, component: LinkedInTile, border: true},
]

const mobileLayout: GridObject[] = [
    {id: 'grid-item-3', x: 0, y: 0, w: 2, h: 2, component: IntroductionTile, border: true},
    {id: 'grid-item-2', x: 0, y: 2, w: 2, h: 1, component: MapTile, border: false},
    {id: 'grid-item-1', x: 0, y: 3, w: 1, h: 1, component: LightSwitch, border: true},
    {id: 'grid-item-7', x: 0, y: 4, w: 1, h: 2, component: TechStackTile, border: true},
    {id: 'grid-item-6', x: 1, y: 3, w: 1, h: 2, component: AniflixTile, border: true},
    {id: 'grid-item-5', x: 1, y: 5, w: 1, h: 1, component: GithubTile, border: true},
    {id: 'grid-item-4', x: 0, y: 6, w: 2, h: 2, component: SpotifyTile, border: true},
    {id: 'grid-item-8', x: 0, y: 8, w: 2, h: 2, component: ResumeTile, border: true},
    {id: 'grid-item-9', x: 0, y: 10, w: 1, h: 1, component: LinkedInTile, border: true},
]

export function load({params}) {
    return {
        mobileLayout,
        desktopLayout
    };
}
