import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getEventMeta, deletePhoto } from '$lib/server/r2';

export const DELETE: RequestHandler = async ({ params, url }) => {
	const { eventId, photoId } = params;
	const key = url.searchParams.get('key');

	if (!eventId || eventId.length < 5) {
		throw error(400, 'Invalid event ID');
	}

	if (!photoId) {
		throw error(400, 'Invalid photo ID');
	}

	if (!key) {
		throw error(401, 'Host key required');
	}

	const meta = await getEventMeta(eventId);
	if (!meta || meta.hostKey !== key) {
		throw error(403, 'Invalid host key');
	}

	try {
		await deletePhoto(eventId, photoId);
		return json({ success: true });
	} catch (err) {
		console.error('DELETE /api/photos error:', err);
		throw error(500, err instanceof Error ? err.message : 'Failed to delete photo');
	}
};
