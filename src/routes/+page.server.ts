import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const actions = {
	create: async () => {
		const eventId = nanoid(10);
		throw redirect(303, `/event/${eventId}`);
	}
} satisfies Actions;
