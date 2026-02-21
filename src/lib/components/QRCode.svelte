<script lang="ts">
	import * as QRCodeLib from 'qrcode';

	let { url }: { url: string } = $props();
	let imgSrc = $state('');
	let offscreenCanvas: HTMLCanvasElement | null = null;

	$effect(() => {
		if (url) {
			if (!offscreenCanvas) {
				offscreenCanvas = document.createElement('canvas');
			}
			QRCodeLib.toCanvas(offscreenCanvas, url, {
				width: 256,
				margin: 2,
				color: { dark: '#000000', light: '#ffffff' }
			}).then(() => {
				imgSrc = offscreenCanvas!.toDataURL('image/png');
			});
		}
	});

	function save() {
		if (!imgSrc) return;
		const a = document.createElement('a');
		a.href = imgSrc;
		a.download = 'qr-code.png';
		a.click();
	}
</script>

<div class="flex flex-col items-center gap-3">
	{#if imgSrc}
		<img src={imgSrc} alt="QR code for {url}" width="256" height="256" class="rounded-lg shadow-md" />
	{/if}
	<button
		onclick={save}
		class="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100"
	>
		Save QR Code
	</button>
	<p class="max-w-xs break-all text-center text-sm text-gray-500">{url}</p>
</div>
