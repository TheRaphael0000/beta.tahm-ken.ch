<script lang="ts">
	import { inputClass } from './style';

	let { class: propClasses = '', value = $bindable(), ...props } = $props();
</script>

<textarea {...props} class={[inputClass, 'py-4', propClasses]} bind:value></textarea>
