<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { saveHostKey } from '$lib/utils/host-keys';
	import SEO from '$lib/components/SEO.svelte';

	const eventId = $page.params.eventId;
	const hostKey = $page.url.searchParams.get('key') ?? '';

	let copied = $state(false);

	const manageUrl = $derived(
		`${$page.url.origin}/event/${eventId}/manage?key=${hostKey}`
	);

	$effect(() => {
		if (eventId && hostKey) {
			saveHostKey(eventId, hostKey);
		}
	});

	async function copyKey() {
		await navigator.clipboard.writeText(hostKey);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	let copiedLink = $state(false);
	async function copyManageLink() {
		await navigator.clipboard.writeText(manageUrl);
		copiedLink = true;
		setTimeout(() => (copiedLink = false), 2000);
	}

	function proceed() {
		goto(`/event/${eventId}`);
	}
</script>

<SEO title="Event Created — Keepsly" description="Your event has been created. Save your host key." />

<div class="mx-auto max-w-lg px-4 py-12">
	<div class="mb-8 text-center">
		<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
			<svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
			</svg>
		</div>
		<h1 class="mb-2 text-3xl font-bold text-gray-900">Event Created!</h1>
		<p class="text-gray-500">Save your host key to manage this event later</p>
	</div>

	<div class="mb-6 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
		<div class="mb-3 flex items-center gap-2 text-amber-800">
			<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
			</svg>
			<span class="text-sm font-semibold">This will only be shown once</span>
		</div>

		<p class="mb-4 text-sm text-amber-700">
			This is your secret key to manage your event. Copy it and save it somewhere safe. You will not be able to see it again.
		</p>

		<div class="mb-4 flex items-center gap-2 rounded-xl bg-white p-3 ring-1 ring-amber-200">
			<code class="flex-1 break-all text-center text-lg font-bold tracking-wider text-gray-900">{hostKey}</code>
			<button
				onclick={copyKey}
				class="shrink-0 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-200"
			>
				{copied ? 'Copied!' : 'Copy Key'}
			</button>
		</div>

		<button
			onclick={copyManageLink}
			class="w-full rounded-xl bg-amber-100 px-4 py-2.5 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-200"
		>
			{copiedLink ? 'Link Copied!' : 'Copy Manage Link'}
		</button>
	</div>

	<button
		onclick={proceed}
		class="w-full rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-primary-dark"
	>
		I've saved it — continue
	</button>
</div>
