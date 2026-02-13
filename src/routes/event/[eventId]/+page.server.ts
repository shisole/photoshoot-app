import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { eventId } = params;

	if (!eventId || eventId.length < 5) {
		throw error(400, 'Invalid event ID');
	}

	return { eventId };
};
