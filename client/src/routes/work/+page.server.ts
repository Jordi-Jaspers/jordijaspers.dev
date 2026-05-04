import { redirect } from '@sveltejs/kit';

export const prerender = false;

export function load(): never {
	throw redirect(308, '/career');
}
