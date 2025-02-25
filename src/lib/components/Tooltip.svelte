<script lang="ts">
	let { text, children } = $props();
	let visible = $state(false);
</script>

<span onmouseover={() => (visible = true)} onmouseleave={() => (visible = false)}>
	{@render text()}

	{#if visible}
		<div class="pointer-events-none absolute z-10 -mt-10 ml-5 bg-black/95 p-3">
			{@render children()}
		</div>
	{/if}
</span>
