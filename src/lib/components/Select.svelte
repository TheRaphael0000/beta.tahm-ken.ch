<script lang="ts">
	import { inputClass } from './style';

	let { children, class: propClasses = '', value = $bindable(), ...props } = $props();
</script>

<select
	{...props}
	class={[inputClass, 'transition-all', 'hover:bg-white', 'hover:text-black', propClasses]}
	bind:value
>
	{@render children()}
</select>
