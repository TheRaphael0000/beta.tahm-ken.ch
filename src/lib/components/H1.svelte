<script lang="ts">
	let { children, class: propClasses = '', ...props } = $props();
</script>

<h1 {...props} class={['text-3xl', 'my-4', propClasses]}>
	{@render children()}
</h1>
