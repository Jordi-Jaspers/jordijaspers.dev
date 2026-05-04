import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

// ─── Path helpers ─────────────────────────────────────────────────────────────

// When running via `bun run test` from `client/`, process.cwd() === client/
// Fallback: resolve relative to this file (client/src/lib/seo/) → up 4 levels
const clientRoot = (() => {
	const cwd = process.cwd();
	// If cwd already ends with /client, use it directly
	if (cwd.endsWith('/client') || fs.existsSync(path.join(cwd, 'static'))) {
		return cwd;
	}
	// Otherwise walk up from this file
	return path.resolve(new URL(import.meta.url).pathname, '../../../../..');
})();

const staticDir = path.join(clientRoot, 'static');
const llmsTxtPath = path.join(staticDir, 'llms.txt');
const llmsFullTxtPath = path.join(staticDir, 'llms-full.txt');
const robotsTxtPath = path.join(staticDir, 'robots.txt');
const appHtmlPath = path.join(clientRoot, 'src', 'app.html');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readFile(filePath: string): string {
	return fs.readFileSync(filePath, 'utf-8');
}

function extractJsonLd(html: string): unknown {
	const match = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
	if (!match) throw new Error('No <script type="application/ld+json"> block found in app.html');
	return JSON.parse(match[1]);
}

function extractArticleBlock(html: string): string {
	const match = html.match(/<article[\s\S]*?<\/article>/i);
	if (!match) return '';
	return match[0];
}

function findNode(graph: unknown[], type: string): Record<string, unknown> | undefined {
	return graph.find(
		(n): n is Record<string, unknown> => typeof n === 'object' && n !== null && (n as Record<string, unknown>)['@type'] === type
	) as Record<string, unknown> | undefined;
}

function normalizeOne(val: unknown): Record<string, unknown> {
	const item = Array.isArray(val) ? val[0] : val;
	return item as Record<string, unknown>;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('LLM/AI Search Optimization SEO Artifacts', () => {
	// ─── 1. llms.txt ──────────────────────────────────────────────────────────

	describe('llms.txt', () => {
		it('file exists at client/static/llms.txt', () => {
			// Given: the static directory should contain llms.txt
			// When: checking file existence
			// Then: file must exist
			expect(fs.existsSync(llmsTxtPath), `Expected ${llmsTxtPath} to exist`).toBe(true);
		});

		it('is non-empty', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: content is non-empty
			expect(content.trim().length).toBeGreaterThan(0);
		});

		it('contains the name "Jordi Jaspers"', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: name is present
			expect(content).toContain('Jordi Jaspers');
		});

		it('contains "Lead" (matching Lead Engineer / Lead Software & Applied AI Engineer)', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: job title keyword is present
			expect(content).toContain('Lead');
		});

		it('contains "Ilionx" (employer)', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: employer name is present
			expect(content).toContain('Ilionx');
		});

		it('contains "Maastricht" (location)', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: location is present
			expect(content).toContain('Maastricht');
		});

		it('contains a projects section header (case-insensitive)', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: projects section exists
			expect(content).toMatch(/projects/i);
		});

		it('contains a contact section header (case-insensitive)', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: contact section exists
			expect(content).toMatch(/contact/i);
		});

		it('contains the email "jordijaspers@gmail.com"', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: email is present
			expect(content).toContain('jordijaspers@gmail.com');
		});

		it('references the canonical URL https://jordijaspers.dev', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: canonical URL is referenced
			expect(content).toContain('https://jordijaspers.dev');
		});

		it('references /llms-full.txt (link to expanded version)', () => {
			// Given: llms.txt exists
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsTxtPath);

			// Then: link to full version is present
			expect(content).toContain('/llms-full.txt');
		});
	});

	// ─── 2. llms-full.txt ─────────────────────────────────────────────────────

	describe('llms-full.txt', () => {
		it('file exists at client/static/llms-full.txt', () => {
			// Given: the static directory should contain llms-full.txt
			// When: checking file existence
			// Then: file must exist
			expect(fs.existsSync(llmsFullTxtPath), `Expected ${llmsFullTxtPath} to exist`).toBe(true);
		});

		it('is non-empty', () => {
			// Given: llms-full.txt exists
			expect(fs.existsSync(llmsFullTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsFullTxtPath);

			// Then: content is non-empty
			expect(content.trim().length).toBeGreaterThan(0);
		});

		it('is longer than llms.txt (more detailed)', () => {
			// Given: both files exist
			expect(fs.existsSync(llmsTxtPath)).toBe(true);
			expect(fs.existsSync(llmsFullTxtPath)).toBe(true);

			// When: comparing lengths
			const llmsLen = readFile(llmsTxtPath).length;
			const fullLen = readFile(llmsFullTxtPath).length;

			// Then: full version is longer
			expect(fullLen).toBeGreaterThan(llmsLen);
		});

		it('contains "Jordi Jaspers"', () => {
			// Given: llms-full.txt exists
			expect(fs.existsSync(llmsFullTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsFullTxtPath);

			// Then: name is present
			expect(content).toContain('Jordi Jaspers');
		});

		it('contains "Ilionx"', () => {
			// Given: llms-full.txt exists
			expect(fs.existsSync(llmsFullTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsFullTxtPath);

			// Then: employer is present
			expect(content).toContain('Ilionx');
		});

		it('contains at least 3 of the known project names', () => {
			// Given: llms-full.txt exists
			expect(fs.existsSync(llmsFullTxtPath)).toBe(true);

			// When: reading the file and counting project name matches
			const content = readFile(llmsFullTxtPath);
			const projectNames = ['JFrame', 'Eventify', 'Aniflix', 'AI Relay', 'KirchroaGPT'];
			const matchCount = projectNames.filter((name) => content.includes(name)).length;

			// Then: at least 3 project names are mentioned
			expect(matchCount).toBeGreaterThanOrEqual(3);
		});

		it('contains an experience/career section header', () => {
			// Given: llms-full.txt exists
			expect(fs.existsSync(llmsFullTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsFullTxtPath);

			// Then: experience or career section exists
			expect(content).toMatch(/experience|career/i);
		});

		it('contains an expertise/skills section header', () => {
			// Given: llms-full.txt exists
			expect(fs.existsSync(llmsFullTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsFullTxtPath);

			// Then: expertise or skills section exists
			expect(content).toMatch(/expertise|skills/i);
		});

		it('contains a FAQ section', () => {
			// Given: llms-full.txt exists
			expect(fs.existsSync(llmsFullTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(llmsFullTxtPath);

			// Then: FAQ section exists
			expect(content).toMatch(/FAQ|frequently asked|questions/i);
		});
	});

	// ─── 3. robots.txt ────────────────────────────────────────────────────────

	describe('robots.txt', () => {
		const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'Google-Extended', 'anthropic-ai', 'ClaudeBot', 'CCBot'] as const;

		it('file exists at client/static/robots.txt', () => {
			// Given: the static directory should contain robots.txt
			// When: checking file existence
			// Then: file must exist
			expect(fs.existsSync(robotsTxtPath), `Expected ${robotsTxtPath} to exist`).toBe(true);
		});

		it.each(AI_BOTS)('contains a User-agent entry for %s (case-sensitive)', (bot) => {
			// Given: robots.txt exists
			expect(fs.existsSync(robotsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(robotsTxtPath);

			// Then: the exact bot name appears in a User-agent directive
			expect(content).toContain(`User-agent: ${bot}`);
		});

		it.each(AI_BOTS)('has an explicit Allow: directive for %s', (bot) => {
			// Given: robots.txt exists
			expect(fs.existsSync(robotsTxtPath)).toBe(true);

			// When: reading the file and finding the block for this bot
			const content = readFile(robotsTxtPath);
			const lines = content.split('\n');

			// Find the User-agent line for this bot, then look for Allow: in the same block
			let inBlock = false;
			let hasAllow = false;
			for (const line of lines) {
				const trimmed = line.trim();
				if (trimmed === `User-agent: ${bot}`) {
					inBlock = true;
					continue;
				}
				if (inBlock) {
					// A blank line or another User-agent ends the block
					if (trimmed === '' || trimmed.startsWith('User-agent:')) {
						// If blank line, check if next non-blank is still part of this block
						// For simplicity: blank line ends block
						if (trimmed === '') break;
						// Another User-agent: could be a grouped block — keep scanning
						break;
					}
					if (/^allow:/i.test(trimmed)) {
						hasAllow = true;
						break;
					}
				}
			}

			// Then: Allow directive is present for this bot
			expect(hasAllow, `Expected Allow: directive for ${bot}`).toBe(true);
		});

		it('references /llms.txt (in a comment or directive)', () => {
			// Given: robots.txt exists
			expect(fs.existsSync(robotsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(robotsTxtPath);

			// Then: llms.txt is mentioned
			expect(content).toContain('/llms.txt');
		});

		it('contains the sitemap directive for jordijaspers.dev', () => {
			// Given: robots.txt exists
			expect(fs.existsSync(robotsTxtPath)).toBe(true);

			// When: reading the file
			const content = readFile(robotsTxtPath);

			// Then: sitemap line is present
			expect(content).toContain('Sitemap: https://jordijaspers.dev/sitemap.xml');
		});
	});

	// ─── 4. JSON-LD in app.html ───────────────────────────────────────────────

	describe('JSON-LD in app.html', () => {
		it('app.html exists', () => {
			// Given: the src directory should contain app.html
			// When: checking file existence
			// Then: file must exist
			expect(fs.existsSync(appHtmlPath), `Expected ${appHtmlPath} to exist`).toBe(true);
		});

		it('contains a <script type="application/ld+json"> block', () => {
			// Given: app.html exists
			expect(fs.existsSync(appHtmlPath)).toBe(true);

			// When: reading the file
			const html = readFile(appHtmlPath);

			// Then: JSON-LD script block is present
			expect(html).toMatch(/<script\s+type="application\/ld\+json">/i);
		});

		it('JSON-LD block parses as valid JSON', () => {
			// Given: app.html exists with a JSON-LD block
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			const html = readFile(appHtmlPath);

			// When: extracting and parsing the JSON-LD
			// Then: no parse error is thrown
			expect(() => extractJsonLd(html)).not.toThrow();
		});

		it('has @context === "https://schema.org"', () => {
			// Given: valid JSON-LD
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;

			// When: checking @context
			// Then: context is schema.org
			expect(jsonLd['@context']).toBe('https://schema.org');
		});

		it('has @graph as an array', () => {
			// Given: valid JSON-LD
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;

			// When: checking @graph
			// Then: @graph is an array
			expect(Array.isArray(jsonLd['@graph'])).toBe(true);
		});

		describe('Person node', () => {
			function getPersonNode(): Record<string, unknown> {
				const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;
				const graph = jsonLd['@graph'] as unknown[];
				const person = findNode(graph, 'Person');
				if (!person) throw new Error('No Person node found in @graph');
				return person;
			}

			it('contains a Person node in @graph', () => {
				// Given: valid JSON-LD with @graph
				expect(fs.existsSync(appHtmlPath)).toBe(true);

				// When: searching for Person node
				const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;
				const graph = jsonLd['@graph'] as unknown[];

				// Then: Person node exists
				expect(findNode(graph, 'Person')).toBeDefined();
			});

			it('Person.name === "Jordi Jaspers"', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking name
				// Then: name matches exactly
				expect(person['name']).toBe('Jordi Jaspers');
			});

			it('Person.jobTitle is a non-empty string', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking jobTitle
				// Then: jobTitle is a non-empty string
				expect(typeof person['jobTitle']).toBe('string');
				expect((person['jobTitle'] as string).trim().length).toBeGreaterThan(0);
			});

			it('Person.email matches /^mailto:|@/ (mailto URI or plain email)', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking email
				// Then: email is a valid mailto URI or plain email address
				expect(person['email']).toMatch(/^mailto:|@/);
			});

			it('Person.knowsAbout is an array with at least 5 entries', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking knowsAbout
				// Then: knowsAbout is an array with >= 5 items
				expect(Array.isArray(person['knowsAbout'])).toBe(true);
				expect((person['knowsAbout'] as unknown[]).length).toBeGreaterThanOrEqual(5);
			});

			it('Person.hasCredential is an array with at least 1 EducationalOccupationalCredential', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking hasCredential
				// Then: hasCredential is a non-empty array
				expect(Array.isArray(person['hasCredential'])).toBe(true);
				expect((person['hasCredential'] as unknown[]).length).toBeGreaterThanOrEqual(1);
			});

			it('Person.alumniOf references an EducationalOrganization with "Hasselt" or "KULeuven"', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking alumniOf (may be array or single object)
				const alumniOf = person['alumniOf'];
				const entries = Array.isArray(alumniOf) ? alumniOf : [alumniOf];

				// Then: at least one entry references Hasselt or KULeuven
				const hasMatch = entries.some((entry) => {
					const e = entry as Record<string, unknown>;
					const name = (e['name'] as string) ?? '';
					return name.includes('Hasselt') || name.includes('KULeuven') || name.includes('KU Leuven');
				});
				expect(hasMatch, 'Expected alumniOf to reference Hasselt or KULeuven').toBe(true);
			});

			it('Person.worksFor is an Organization with name "Ilionx"', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking worksFor
				const worksFor = normalizeOne(person['worksFor'] as Record<string, unknown>);

				// Then: worksFor is an Organization named Ilionx
				expect(worksFor['@type']).toBe('Organization');
				expect(worksFor['name']).toBe('Ilionx');
			});

			it('Person.hasOccupation is an object with @type === "Occupation"', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking hasOccupation
				const occupation = normalizeOne(person['hasOccupation'] as Record<string, unknown>);

				// Then: hasOccupation is an Occupation node
				expect(occupation['@type']).toBe('Occupation');
			});

			it('Person.address is a PostalAddress with addressLocality "Maastricht"', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking address (may be array or single object)
				const address = normalizeOne(person['address'] as Record<string, unknown>);

				// Then: address is a PostalAddress in Maastricht
				expect(address['@type']).toBe('PostalAddress');
				expect(address['addressLocality']).toBe('Maastricht');
			});

			it('Person.sameAs includes the GitHub URL', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking sameAs
				const sameAs = person['sameAs'] as string[];

				// Then: GitHub URL is present
				expect(Array.isArray(sameAs)).toBe(true);
				expect(sameAs).toContain('https://github.com/Jordi-Jaspers');
			});

			it('Person.sameAs includes the LinkedIn URL', () => {
				// Given: Person node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const person = getPersonNode();

				// When: checking sameAs
				const sameAs = person['sameAs'] as string[];

				// Then: LinkedIn URL is present
				expect(Array.isArray(sameAs)).toBe(true);
				expect(sameAs).toContain('https://www.linkedin.com/in/jordi-jaspers/');
			});
		});

		describe('WebSite node', () => {
			it('contains a WebSite node in @graph (preserves SEO-01)', () => {
				// Given: valid JSON-LD with @graph
				expect(fs.existsSync(appHtmlPath)).toBe(true);

				// When: searching for WebSite node
				const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;
				const graph = jsonLd['@graph'] as unknown[];

				// Then: WebSite node exists
				expect(findNode(graph, 'WebSite')).toBeDefined();
			});
		});

		describe('FAQPage node', () => {
			function getFaqNode(): Record<string, unknown> {
				const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;
				const graph = jsonLd['@graph'] as unknown[];
				const faq = findNode(graph, 'FAQPage');
				if (!faq) throw new Error('No FAQPage node found in @graph');
				return faq;
			}

			it('contains a FAQPage node in @graph', () => {
				// Given: valid JSON-LD with @graph
				expect(fs.existsSync(appHtmlPath)).toBe(true);

				// When: searching for FAQPage node
				const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;
				const graph = jsonLd['@graph'] as unknown[];

				// Then: FAQPage node exists
				expect(findNode(graph, 'FAQPage')).toBeDefined();
			});

			it('FAQPage.mainEntity is an array with 3–5 entries', () => {
				// Given: FAQPage node exists
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const faq = getFaqNode();

				// When: checking mainEntity
				const mainEntity = faq['mainEntity'] as unknown[];

				// Then: mainEntity is an array with 3 to 5 entries
				expect(Array.isArray(mainEntity)).toBe(true);
				expect(mainEntity.length).toBeGreaterThanOrEqual(3);
				expect(mainEntity.length).toBeLessThanOrEqual(5);
			});

			it('each FAQ entry has @type "Question", non-empty name, and acceptedAnswer', () => {
				// Given: FAQPage node exists with mainEntity
				expect(fs.existsSync(appHtmlPath)).toBe(true);
				const faq = getFaqNode();
				const mainEntity = faq['mainEntity'] as Record<string, unknown>[];

				// When: iterating over each question
				for (const entry of mainEntity) {
					// Then: each entry is a valid Question with an Answer
					expect(entry['@type']).toBe('Question');
					expect(typeof entry['name']).toBe('string');
					expect((entry['name'] as string).trim().length).toBeGreaterThan(0);

					const answer = entry['acceptedAnswer'] as Record<string, unknown>;
					expect(answer).toBeDefined();
					expect(answer['@type']).toBe('Answer');
					expect(typeof answer['text']).toBe('string');
					expect((answer['text'] as string).trim().length).toBeGreaterThan(0);
				}
			});
		});
	});

	// ─── 5. Semantic article block in app.html ────────────────────────────────

	describe('Semantic article block in app.html', () => {
		it('app.html contains an <article> tag', () => {
			// Given: app.html exists
			expect(fs.existsSync(appHtmlPath)).toBe(true);

			// When: reading the file
			const html = readFile(appHtmlPath);

			// Then: article tag is present
			expect(html).toContain('<article');
		});

		it('article block contains the literal string "Jordi Jaspers"', () => {
			// Given: app.html exists with an article block
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			const html = readFile(appHtmlPath);
			const article = extractArticleBlock(html);

			// When: checking article content
			// Then: name is present in the article
			expect(article).toContain('Jordi Jaspers');
		});

		it('article block uses class "sr-only" or "visually-hidden"', () => {
			// Given: app.html exists with an article block
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			const html = readFile(appHtmlPath);
			const article = extractArticleBlock(html);

			// When: checking for accessibility class
			// Then: article uses sr-only or visually-hidden to stay accessible but invisible
			const hasSrOnly = article.includes('sr-only');
			const hasVisuallyHidden = article.includes('visually-hidden');
			expect(hasSrOnly || hasVisuallyHidden, 'Expected article to use sr-only or visually-hidden class').toBe(true);
		});

		it('article block mentions at least 2 of: Ilionx, Maastricht, Software, AI, Engineer', () => {
			// Given: app.html exists with an article block
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			const html = readFile(appHtmlPath);
			const article = extractArticleBlock(html);

			// When: counting keyword matches
			const keywords = ['Ilionx', 'Maastricht', 'Software', 'AI', 'Engineer'];
			const matchCount = keywords.filter((kw) => article.includes(kw)).length;

			// Then: at least 2 keywords are present
			expect(matchCount, `Expected at least 2 keywords in article, found ${matchCount}`).toBeGreaterThanOrEqual(2);
		});
	});

	// ─── 6. Cross-source consistency ─────────────────────────────────────────

	describe('Cross-source consistency', () => {
		it('Person.name in JSON-LD equals "Jordi Jaspers" (same as in llms.txt)', () => {
			// Given: both app.html and llms.txt exist
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: extracting Person.name from JSON-LD and checking llms.txt
			const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;
			const graph = jsonLd['@graph'] as unknown[];
			const person = findNode(graph, 'Person') as Record<string, unknown>;
			const llmsContent = readFile(llmsTxtPath);

			// Then: both sources agree on the canonical name
			expect(person['name']).toBe('Jordi Jaspers');
			expect(llmsContent).toContain('Jordi Jaspers');
		});

		it('Ilionx appears in both llms.txt and JSON-LD worksFor.name', () => {
			// Given: both files exist
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: checking both sources for Ilionx
			const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;
			const graph = jsonLd['@graph'] as unknown[];
			const person = findNode(graph, 'Person') as Record<string, unknown>;
			const worksFor = normalizeOne(person['worksFor'] as Record<string, unknown>);
			const llmsContent = readFile(llmsTxtPath);

			// Then: Ilionx is consistent across both sources
			expect(worksFor['name']).toBe('Ilionx');
			expect(llmsContent).toContain('Ilionx');
		});

		it('email "jordijaspers@gmail.com" appears in both llms.txt and JSON-LD Person.email', () => {
			// Given: both files exist
			expect(fs.existsSync(appHtmlPath)).toBe(true);
			expect(fs.existsSync(llmsTxtPath)).toBe(true);

			// When: checking both sources for the email
			const jsonLd = extractJsonLd(readFile(appHtmlPath)) as Record<string, unknown>;
			const graph = jsonLd['@graph'] as unknown[];
			const person = findNode(graph, 'Person') as Record<string, unknown>;
			const emailField = (person['email'] as string) ?? '';
			const llmsContent = readFile(llmsTxtPath);

			// Then: email is consistent across both sources (with or without mailto: prefix)
			expect(emailField).toContain('jordijaspers@gmail.com');
			expect(llmsContent).toContain('jordijaspers@gmail.com');
		});
	});
});
