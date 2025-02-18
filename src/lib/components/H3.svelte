<script lang="ts">

	let { children, class: propClasses = '', ...props } = $props();
</script>

<h1 {...props} class={['text-xl', propClasses]}>
	{@render children()}
</h1>
