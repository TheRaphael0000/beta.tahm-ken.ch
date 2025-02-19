<script lang="ts">
	let { children, class: propClasses = '', text, ...props } = $props();
	let visible = $state(false);
</script>

<span
	{...props}
	class={['cursor-help', "border-b-1 border-dashed border-white", propClasses]}
	onmouseover={() => (visible = true)}
	onmouseleave={() => (visible = false)}
>
	{text}
	{#if visible}
		<div class="absolute bg-black/95 p-3 -mt-10 ml-5 z-10 pointer-events-none">
			{@render children()}
		</div>
	{/if}
</span>
