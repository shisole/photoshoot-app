<script lang="ts">
	let {
		current,
		total,
		status,
		filePercent = 0
	}: { current: number; total: number; status: string; filePercent?: number } = $props();

	let overallPercent = $derived(
		total > 0
			? Math.round((current / total) * 100)
			: 0
	);
</script>

{#if total > 0}
	<div class="space-y-2">
		<div class="flex justify-between text-sm">
			<span class="text-gray-600">{status}</span>
			<span class="font-medium text-gray-900">{overallPercent}%</span>
		</div>
		<div class="h-2 overflow-hidden rounded-full bg-gray-200">
			<div
				class="h-full rounded-full bg-primary transition-all duration-150"
				style="width: {overallPercent}%"
			></div>
		</div>
		<div class="text-xs text-gray-400 text-right">{current}/{total} photos</div>
	</div>
{/if}
