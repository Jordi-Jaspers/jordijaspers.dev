// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { LightSwitch } from '$lib/components/general';
import {
	AniflixTile,
	GithubTile,
	IntroductionTile,
	LinkedInTile,
	MapTile,
	ResumeTile,
	SpotifyTile,
	TechStackTile
} from '$lib/components/grid';

export const prerender = true;

const desktopLayout: GridObject[] = [
	{ id: 'grid-item-1', x: 2, y: 0, w: 1, h: 1, component: LightSwitch, border: true, category: ['media'] },
	{ id: 'grid-item-2', x: 0, y: 2, w: 2, h: 1, component: MapTile, border: false, category: ['about'] },
	{ id: 'grid-item-3', x: 0, y: 0, w: 2, h: 2, component: IntroductionTile, border: true, category: ['about'] },
	{ id: 'grid-item-4', x: 2, y: 1, w: 2, h: 2, component: SpotifyTile, border: true, category: ['media'] },
	{ id: 'grid-item-5', x: 3, y: 0, w: 1, h: 1, component: GithubTile, border: true, category: ['about'] },
	{ id: 'grid-item-6', x: 1, y: 3, w: 1, h: 2, component: AniflixTile, border: true, category: ['projects'] },
	{ id: 'grid-item-7', x: 0, y: 4, w: 1, h: 2, component: TechStackTile, border: true, category: ['about'] },
	{ id: 'grid-item-8', x: 2, y: 3, w: 2, h: 2, component: ResumeTile, border: true, category: ['about'] },
	{ id: 'grid-item-9', x: 0, y: 3, w: 1, h: 1, component: LinkedInTile, border: true, category: ['about'] },
	{ id: 'grid-item-10', x: 0, y: 5, w: 4, h: 4, component: LinkedInTile, border: true, category: ['about'] }
];

const mobileLayout: GridObject[] = [
	{ id: 'grid-item-1', x: 0, y: 3, w: 1, h: 1, component: LightSwitch, border: true, category: ['media'] },
	{ id: 'grid-item-2', x: 0, y: 2, w: 2, h: 1, component: MapTile, border: false, category: ['about'] },
	{ id: 'grid-item-3', x: 0, y: 0, w: 2, h: 2, component: IntroductionTile, border: true, category: ['about'] },
	{ id: 'grid-item-4', x: 0, y: 6, w: 2, h: 2, component: SpotifyTile, border: true, category: ['media'] },
	{ id: 'grid-item-5', x: 1, y: 5, w: 1, h: 1, component: GithubTile, border: true, category: ['about'] },
	{ id: 'grid-item-6', x: 1, y: 3, w: 1, h: 2, component: AniflixTile, border: true, category: ['projects'] },
	{ id: 'grid-item-7', x: 0, y: 4, w: 1, h: 2, component: TechStackTile, border: true, category: ['about'] },
	{ id: 'grid-item-8', x: 0, y: 8, w: 2, h: 2, component: ResumeTile, border: true, category: ['about'] },
	{ id: 'grid-item-9', x: 0, y: 10, w: 1, h: 1, component: LinkedInTile, border: true, category: ['about'] }
];

export function load({ params }) {
	return {
		mobileLayout,
		desktopLayout
	};
}
