<script lang="ts">
	let { photos }: { photos: string[] } = $props();
	let lightboxIndex = $state<number | null>(null);

	let lightboxUrl = $derived(lightboxIndex !== null ? photos[lightboxIndex] : null);

	function openLightbox(index: number) {
		lightboxIndex = index;
	}

	function closeLightbox() {
		lightboxIndex = null;
	}

	function prev() {
		if (lightboxIndex !== null) {
			lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length;
		}
	}

	function next() {
		if (lightboxIndex !== null) {
			lightboxIndex = (lightboxIndex + 1) % photos.length;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (lightboxIndex === null) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if photos.length === 0}
	<p class="py-12 text-center text-gray-400">No photos yet. Waiting for uploads...</p>
{:else}
	<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
		{#each photos as photo, i}
			<button
				onclick={() => openLightbox(i)}
				class="relative aspect-square overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
			>
				<div class="absolute inset-0 animate-pulse bg-gray-200"></div>
				<img
					src={photo}
					alt=""
					class="relative h-full w-full object-cover opacity-0 transition-opacity duration-300"
					loading="lazy"
					onload={(e) => { (e.currentTarget as HTMLImageElement).classList.remove('opacity-0'); }}
				/>
			</button>
		{/each}
	</div>
{/if}

{#if lightboxUrl !== null && lightboxIndex !== null}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
		onclick={closeLightbox}
		onkeydown={() => {}}
	>
		<button
			onclick={(e) => { e.stopPropagation(); prev(); }}
			class="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:left-4"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
		</button>

		<img
			src={lightboxUrl}
			alt="Full size"
			class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="img"
		/>

		<button
			onclick={(e) => { e.stopPropagation(); next(); }}
			class="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:right-4"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
		</button>

		<div class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
			{lightboxIndex + 1} / {photos.length}
		</div>
	</div>
{/if}
