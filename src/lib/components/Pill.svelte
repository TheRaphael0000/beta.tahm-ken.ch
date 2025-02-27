<script lang="ts">
	let { children, class: propClasses = '', ...props } = $props();
</script>

<div
	{...props}
	class={'inline-block rounded-3xl bg-white/90 px-2 text-sm font-semibold text-black ' +
		propClasses}
>
	{@render children()}
</div>
