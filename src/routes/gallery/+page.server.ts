import type { PageServerLoad } from './$types';
import { getEventMeta } from '$lib/server/r2';

export const load: PageServerLoad = async ({ url }) => {
	const eventId = url.searchParams.get('event');

	if (!eventId || eventId.length < 5) {
		return { bannerUrl: null };
	}

	const meta = await getEventMeta(eventId);
	return { bannerUrl: meta?.bannerUrl ?? null };
};
