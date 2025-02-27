<script lang="ts">
	let { children, class: propClasses = '', ...props } = $props();
</script>

<article {...props} class={['m-auto', 'xl:w-7xl', 'bg-black/50', 'p-6', 'rounded-md', propClasses]}>
	{@render children()}
</article>
