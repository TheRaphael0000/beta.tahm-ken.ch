<script lang="ts">

	let { children, class: propClasses = '', ...props } = $props();
</script>

<article {...props} class={['m-auto', 'xl:w-6xl', propClasses]}>
	{@render children()}
</article>
