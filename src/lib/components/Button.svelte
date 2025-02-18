<script lang="ts">
	import { inputClass } from './style';

	let { children, class: propClasses = '', ...props } = $props();
</script>

<button
	{...props}
	class={[
		inputClass,
		'transition-all',
		'hover:bg-white',
		'hover:text-black',
		'text-nowrap',
		propClasses
	]}
>
	{@render children()}
</button>
