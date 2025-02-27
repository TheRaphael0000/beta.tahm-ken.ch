<script lang="ts">
	let { children, class: propClasses = '', ...props } = $props();
</script>

<h1 {...props} class={'mb-7 border-b-1 pb-2 text-3xl ' + propClasses}>
	{@render children()}
</h1>
