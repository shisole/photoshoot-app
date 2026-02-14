<script lang="ts">
	import { enhance } from '$app/forms';

	let creating = $state(false);
</script>

<svelte:head>
	<title>Create Event — Keepsly</title>
	<meta name="description" content="Create a new event and let guests share photos via QR code." />
	<meta property="og:title" content="Create Event — Keepsly" />
	<meta property="og:description" content="Create a new event and let guests share photos via QR code." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Create Event — Keepsly" />
	<meta name="twitter:description" content="Create a new event and let guests share photos via QR code." />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8">
	<a href="/" class="mb-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark">
		<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
		</svg>
		Back
	</a>

	<div class="mb-8 text-center">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">Create Event</h1>
		<p class="text-gray-500">Set up your event and share the QR code with your guests</p>
	</div>

	<form method="POST" action="?/create" use:enhance={() => {
		creating = true;
		return async ({ update }) => {
			await update();
			creating = false;
		};
	}} class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<div>
			<label for="eventName" class="mb-1 block text-xs font-medium text-gray-500">Event name</label>
			<input
				type="text"
				id="eventName"
				name="eventName"
				placeholder="e.g. Sarah's Birthday"
				required
				disabled={creating}
				class="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
			/>
		</div>

		<div>
			<label for="maxPhotos" class="mb-1 block text-xs font-medium text-gray-500">Max photos per guest</label>
			<input
				type="number"
				id="maxPhotos"
				name="maxPhotos"
				value="5"
				min="5"
				max="15"
				required
				disabled={creating}
				class="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
			/>
		</div>

		<div>
			<label for="duration" class="mb-1 block text-xs font-medium text-gray-500">Upload deadline</label>
			<select
				id="duration"
				name="duration"
				required
				disabled={creating}
				class="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
			>
				<option value="" disabled selected>Select duration</option>
				<option value="1d">1 day</option>
				<option value="3d">3 days</option>
				<option value="7d">1 week</option>
			</select>
		</div>

		<button
			type="submit"
			disabled={creating}
			class="rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
		>
			{#if creating}
				<span class="inline-flex items-center gap-2">
					<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
					</svg>
					Creating...
				</span>
			{:else}
				Publish Event
			{/if}
		</button>
	</form>
</div>
