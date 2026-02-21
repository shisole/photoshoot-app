const STORAGE_KEY = 'keepsly_host_keys';

function getAll(): Record<string, string> {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

export function saveHostKey(eventId: string, hostKey: string): void {
	const keys = getAll();
	keys[eventId] = hostKey;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

export function getHostKey(eventId: string): string | null {
	return getAll()[eventId] ?? null;
}
