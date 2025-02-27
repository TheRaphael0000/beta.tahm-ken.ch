<script lang="ts">
	let { children, class: propClasses = '', ...props } = $props();
</script>

<div
	{...props}
	class={'rounded-3xl bg-white/90 px-2 font-semibold text-black' +
		propClasses}
>
	<span class="h-0.5">
		{@render children()}
	</span>
</div>
