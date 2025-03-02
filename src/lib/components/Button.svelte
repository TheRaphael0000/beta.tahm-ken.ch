<script lang="ts">
	import { inputClass } from './style';

	let { children, class: propClasses = '', disabled = false, ...props } = $props();
</script>

<button
	{...props}
	class={[
		...inputClass,
		'transition-all',
		'hover:bg-white',
		'hover:text-black',
		disabled ? 'opacity-50' : '',
		'text-nowrap',
		propClasses
	]}
	{disabled}
>
	{@render children()}
</button>
