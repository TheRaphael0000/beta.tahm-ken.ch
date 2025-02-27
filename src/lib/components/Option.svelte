<script lang="ts">
	let { children, class: propClasses = '', ...props } = $props();
</script>

<option {...props} class={['bg-white', 'text-black', propClasses]}>{@render children()}</option>
