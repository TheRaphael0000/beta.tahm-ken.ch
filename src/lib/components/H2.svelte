<script lang="ts">
	let { children, class: propClasses = '', ...props } = $props();
</script>

<h1 {...props} class={['text-2xl', propClasses]}>
	{@render children()}
</h1>
