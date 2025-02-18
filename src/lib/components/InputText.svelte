<script lang="ts">
	import { inputClass } from './style';

	let { class: propClasses = '', ...props } = $props();
</script>

<input type="text" {...props} class={[inputClass, propClasses]} {...props} />
