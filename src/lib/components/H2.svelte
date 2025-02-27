<script lang="ts">
	let { children, class: propClasses = '', ...props } = $props();
</script>

<h2 {...props} class={'text-2xl mt-4' + propClasses}>
	{@render children()}
</h2>