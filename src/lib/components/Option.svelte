<script lang="ts">
	import { inputClass } from './style';

	let { children, class: propClasses = '', ...props } = $props();
</script>

<option {...props} class={['bg-white', 'text-black', propClasses]}
	>{@render children()}</option
>