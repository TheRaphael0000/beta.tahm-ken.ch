<script lang="ts">
	import { inputClass } from './style';

	let { class: propClasses = '', value = $bindable(), ...props } = $props();
</script>

<input type="text" {...props} class={[inputClass, propClasses]} {...props} bind:value />
