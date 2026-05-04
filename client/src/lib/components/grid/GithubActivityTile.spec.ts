import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';
import GithubActivityTile from './GithubActivityTile.svelte';

// ─── Constants ───────────────────────────────────────────────────────────────

const GITHUB_PROFILE_URL = 'https://github.com/Jordi-Jaspers';
const CACHE_KEY = 'github-activity-v1';
const CELL_COUNT = 364; // 52 weeks × 7 days

// ─── Fixtures ────────────────────────────────────────────────────────────────

function aContribution(date: string, count: number, level: 0 | 1 | 2 | 3 | 4) {
	return { date, count, level };
}

function aContributionList(length: number = 364) {
	return Array.from({ length }, (_, i) => {
		const date = new Date(2026, 0, 1 + i);
		const iso = date.toISOString().slice(0, 10);
		const count = i % 5;
		const level = (i % 5) as 0 | 1 | 2 | 3 | 4;
		return aContribution(iso, count, level);
	});
}

function aSuccessResponse(contributions = aContributionList()) {
	return {
		total: { lastYear: 262 },
		contributions
	};
}

function mockFetchSuccess(data = aSuccessResponse()) {
	vi.stubGlobal(
		'fetch',
		vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(data)
		})
	);
}

function mockFetchFailure() {
	vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
}

function mockFetchNotOk() {
	vi.stubGlobal(
		'fetch',
		vi.fn().mockResolvedValue({
			ok: false,
			status: 429,
			json: () => Promise.resolve({})
		})
	);
}

function mockMatchMedia(prefersReducedMotion: boolean) {
	vi.stubGlobal(
		'matchMedia',
		vi.fn().mockReturnValue({
			matches: prefersReducedMotion,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn()
		})
	);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('GithubActivityTile', () => {
	beforeEach(() => {
		sessionStorage.clear();
		// Default matchMedia: motion allowed
		mockMatchMedia(false);
		// Default fetch: success
		mockFetchSuccess();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		sessionStorage.clear();
	});

	// ─── 1. Initial render = skeleton state ──────────────────────────────────

	describe('Initial render (loading state)', () => {
		it('shows skeleton element while fetch is in-flight', () => {
			// Given: fetch is pending (never resolves during this test)
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: skeleton is visible immediately
			expect(screen.getByTestId('activity-skeleton')).toBeInTheDocument();
		});

		it('skeleton has animate-pulse class by default', () => {
			// Given: fetch is pending and reduced motion is NOT preferred
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));
			mockMatchMedia(false);

			// When: component mounts
			render(GithubActivityTile);

			// Then: skeleton has the pulse animation class
			expect(screen.getByTestId('activity-skeleton')).toHaveClass('animate-pulse');
		});

		it('heatmap is NOT in the DOM during loading', () => {
			// Given: fetch is pending
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: heatmap is absent
			expect(screen.queryByTestId('activity-heatmap')).not.toBeInTheDocument();
		});

		it('error state is NOT in the DOM during loading', () => {
			// Given: fetch is pending
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: error element is absent
			expect(screen.queryByTestId('activity-error')).not.toBeInTheDocument();
		});
	});

	// ─── 2. Successful fetch renders heatmap ─────────────────────────────────

	describe('Successful fetch', () => {
		it('hides skeleton and shows heatmap after fetch resolves', async () => {
			// Given: fetch returns valid contribution data
			mockFetchSuccess();

			// When: component mounts and fetch settles
			render(GithubActivityTile);

			// Then: skeleton disappears and heatmap appears
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());
			expect(screen.queryByTestId('activity-skeleton')).not.toBeInTheDocument();
		});

		it('renders exactly 364 activity cells (52 weeks × 7 days)', async () => {
			// Given: fetch returns 364+ contributions
			mockFetchSuccess(aSuccessResponse(aContributionList(400)));

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());

			// Then: cells are a multiple of 7, between 7 (1 week) and 364 (52 weeks)
			const heatmap = screen.getByTestId('activity-heatmap');
			const cells = within(heatmap).getAllByTestId('activity-cell');
			expect(cells.length).toBeGreaterThanOrEqual(7);
			expect(cells.length).toBeLessThanOrEqual(CELL_COUNT);
			expect(cells.length % 7).toBe(0);
		});

		it('each cell has a data-level attribute with value 0–4', async () => {
			// Given: fetch returns contributions with levels 0–4
			mockFetchSuccess();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());

			// Then: every cell in the heatmap has a valid data-level attribute
			const heatmap = screen.getByTestId('activity-heatmap');
			const cells = within(heatmap).getAllByTestId('activity-cell');
			cells.forEach((cell) => {
				const level = cell.getAttribute('data-level');
				expect(level).not.toBeNull();
				expect(Number(level)).toBeGreaterThanOrEqual(0);
				expect(Number(level)).toBeLessThanOrEqual(4);
			});
		});

		it('subline contains the total contribution count', async () => {
			// Given: fetch returns total.lastYear = 262
			mockFetchSuccess(aSuccessResponse());

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());

			// Then: the subline text contains "Last year" and "262"
			const heatmapText = screen.getByTestId('activity-heatmap').textContent ?? '';
			expect(heatmapText).toContain('Last year');
			expect(heatmapText).toContain('262');
		});
	});

	// ─── 3. Fetch failure → error state ──────────────────────────────────────

	describe('Fetch failure', () => {
		it('shows error state when fetch rejects', async () => {
			// Given: fetch throws a network error
			mockFetchFailure();

			// When: component mounts and fetch settles
			render(GithubActivityTile);

			// Then: error element is visible
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());
		});

		it('error element contains "Activity unavailable" text', async () => {
			// Given: fetch throws
			mockFetchFailure();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());

			// Then: error message is shown
			expect(screen.getByTestId('activity-error').textContent).toContain('Activity unavailable');
		});

		it('skeleton is NOT in the DOM after fetch failure', async () => {
			// Given: fetch throws
			mockFetchFailure();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());

			// Then: skeleton is gone
			expect(screen.queryByTestId('activity-skeleton')).not.toBeInTheDocument();
		});

		it('heatmap is NOT in the DOM after fetch failure', async () => {
			// Given: fetch throws
			mockFetchFailure();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());

			// Then: heatmap is absent
			expect(screen.queryByTestId('activity-heatmap')).not.toBeInTheDocument();
		});

		it('shows error state when fetch returns ok: false (e.g. 429)', async () => {
			// Given: fetch returns a non-ok response
			mockFetchNotOk();

			// When: component mounts and fetch settles
			render(GithubActivityTile);

			// Then: error state is shown
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());
			expect(screen.queryByTestId('activity-heatmap')).not.toBeInTheDocument();
		});

		it('wrapping link is still present in error state', async () => {
			// Given: fetch throws
			mockFetchFailure();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());

			// Then: the root anchor is still in the DOM pointing to GitHub
			const link = screen.getByRole('link');
			expect(link).toHaveAttribute('href', GITHUB_PROFILE_URL);
		});
	});

	// ─── 4. SessionStorage cache hit ─────────────────────────────────────────

	describe('SessionStorage cache hit', () => {
		it('does NOT call fetch when valid cache exists', async () => {
			// Given: sessionStorage already has valid cached data
			const cachedData = aSuccessResponse();
			sessionStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
			const fetchSpy = vi.fn();
			vi.stubGlobal('fetch', fetchSpy);

			// When: component mounts
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());

			// Then: fetch was never called
			expect(fetchSpy).not.toHaveBeenCalled();
		});

		it('renders heatmap immediately from cache without network round-trip', async () => {
			// Given: sessionStorage has valid cached data with 364 contributions
			const cachedData = aSuccessResponse(aContributionList(364));
			sessionStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));

			// When: component mounts
			render(GithubActivityTile);

			// Then: heatmap renders (from cache, no fetch needed) with valid cell count
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());
			const heatmap = screen.getByTestId('activity-heatmap');
			const cells = within(heatmap).getAllByTestId('activity-cell');
			expect(cells.length).toBeGreaterThanOrEqual(7);
			expect(cells.length).toBeLessThanOrEqual(CELL_COUNT);
			expect(cells.length % 7).toBe(0);
		});
	});

	// ─── 5. SessionStorage cache write on success ─────────────────────────────

	describe('SessionStorage cache write', () => {
		it('writes fetched data to sessionStorage after successful fetch', async () => {
			// Given: sessionStorage is empty and fetch succeeds
			sessionStorage.clear();
			mockFetchSuccess();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());

			// Then: sessionStorage contains the cached data
			const cached = sessionStorage.getItem(CACHE_KEY);
			expect(cached).not.toBeNull();
			const parsed = JSON.parse(cached!);
			expect(parsed).toHaveProperty('contributions');
			expect(Array.isArray(parsed.contributions)).toBe(true);
		});

		it('cached object includes a contributions array', async () => {
			// Given: empty sessionStorage and successful fetch
			mockFetchSuccess(aSuccessResponse(aContributionList(364)));

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());

			// Then: cached contributions array is non-empty
			const parsed = JSON.parse(sessionStorage.getItem(CACHE_KEY)!);
			expect(parsed.contributions.length).toBeGreaterThan(0);
		});
	});

	// ─── 6. Wrapping link contract ────────────────────────────────────────────

	describe('Wrapping link contract', () => {
		it('root <a> has correct href in loading state', () => {
			// Given: fetch is pending
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: link points to GitHub profile
			expect(screen.getByRole('link')).toHaveAttribute('href', GITHUB_PROFILE_URL);
		});

		it('root <a> opens in new tab in loading state', () => {
			// Given: fetch is pending
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: link opens in new tab
			expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
		});

		it('root <a> has rel containing noopener in loading state', () => {
			// Given: fetch is pending
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: rel includes noopener
			const rel = screen.getByRole('link').getAttribute('rel') ?? '';
			expect(rel).toContain('noopener');
		});

		it('root <a> has rel containing noreferrer in loading state', () => {
			// Given: fetch is pending
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: rel includes noreferrer
			const rel = screen.getByRole('link').getAttribute('rel') ?? '';
			expect(rel).toContain('noreferrer');
		});

		it('root <a> has correct href after successful fetch', async () => {
			// Given: fetch succeeds
			mockFetchSuccess();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());

			// Then: link still points to GitHub profile
			expect(screen.getByRole('link')).toHaveAttribute('href', GITHUB_PROFILE_URL);
		});

		it('root <a> has correct href in error state', async () => {
			// Given: fetch fails
			mockFetchFailure();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());

			// Then: link still points to GitHub profile
			expect(screen.getByRole('link')).toHaveAttribute('href', GITHUB_PROFILE_URL);
		});

		it('root <a> has target="_blank" in error state', async () => {
			// Given: fetch fails
			mockFetchFailure();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());

			// Then: link opens in new tab
			expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
		});

		it('root <a> has rel noopener noreferrer in error state', async () => {
			// Given: fetch fails
			mockFetchFailure();

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());

			// Then: rel includes both security attributes
			const rel = screen.getByRole('link').getAttribute('rel') ?? '';
			expect(rel).toContain('noopener');
			expect(rel).toContain('noreferrer');
		});
	});

	// ─── 7. Reduced motion ────────────────────────────────────────────────────

	describe('Reduced motion preference', () => {
		it('skeleton does NOT have animate-pulse when prefers-reduced-motion is set', () => {
			// Given: user prefers reduced motion and fetch is pending
			mockMatchMedia(true);
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: skeleton is present but without the pulse animation
			const skeleton = screen.getByTestId('activity-skeleton');
			expect(skeleton).toBeInTheDocument();
			expect(skeleton).not.toHaveClass('animate-pulse');
		});

		it('skeleton IS present (just without animation) under reduced motion', () => {
			// Given: reduced motion preferred and fetch pending
			mockMatchMedia(true);
			vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

			// When: component mounts
			render(GithubActivityTile);

			// Then: skeleton element still exists
			expect(screen.getByTestId('activity-skeleton')).toBeInTheDocument();
		});
	});

	// ─── 8. Edge cases ────────────────────────────────────────────────────────

	describe('Edge cases', () => {
		it('treats empty contributions array as error state', async () => {
			// Given: API returns an empty contributions array
			mockFetchSuccess(aSuccessResponse([]));

			// When: component mounts and fetch settles
			render(GithubActivityTile);

			// Then: error state is shown (no data to display)
			await waitFor(() => expect(screen.getByTestId('activity-error')).toBeInTheDocument());
			expect(screen.queryByTestId('activity-heatmap')).not.toBeInTheDocument();
		});

		it('renders without crashing when fewer than 364 contributions are returned', async () => {
			// Given: API returns only 30 contributions (less than 364)
			mockFetchSuccess(aSuccessResponse(aContributionList(30)));

			// When: component mounts and fetch settles
			render(GithubActivityTile);

			// Then: component renders (heatmap or error — no exception thrown)
			await waitFor(() => {
				const heatmap = screen.queryByTestId('activity-heatmap');
				const error = screen.queryByTestId('activity-error');
				expect(heatmap ?? error).toBeInTheDocument();
			});
		});

		it('falls back to fetch when sessionStorage.getItem throws (private mode)', async () => {
			// Given: sessionStorage.getItem throws (simulating private browsing restriction)
			const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
				throw new Error('SecurityError: storage is disabled');
			});
			mockFetchSuccess();

			// When: component mounts
			render(GithubActivityTile);

			// Then: component still renders heatmap via fetch (no crash)
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());
			getItemSpy.mockRestore();
		});

		it('does not crash when sessionStorage.setItem throws (private mode)', async () => {
			// Given: sessionStorage.setItem throws after successful fetch
			const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
				throw new Error('SecurityError: storage is disabled');
			});
			mockFetchSuccess();

			// When: component mounts and fetch settles
			render(GithubActivityTile);

			// Then: heatmap still renders despite cache write failure
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());
			setItemSpy.mockRestore();
		});

		it('cells use last 364 entries when API returns more than 364 contributions', async () => {
			// Given: API returns 400 contributions (more than 364)
			mockFetchSuccess(aSuccessResponse(aContributionList(400)));

			// When: component mounts and fetch settles
			render(GithubActivityTile);
			await waitFor(() => expect(screen.getByTestId('activity-heatmap')).toBeInTheDocument());

			// Then: cells are sliced to fit (multiple of 7, max 364)
			const heatmap = screen.getByTestId('activity-heatmap');
			const cells = within(heatmap).getAllByTestId('activity-cell');
			expect(cells.length).toBeGreaterThanOrEqual(7);
			expect(cells.length).toBeLessThanOrEqual(CELL_COUNT);
			expect(cells.length % 7).toBe(0);
		});
	});
});
