<script lang="ts">
	import { Button } from '$lib/components';
	import H3 from '../../lib/components/H3.svelte';

	let { src, href, name, text, buttonText } = $props();
</script>

<div
	class="my-6 flex flex-col items-center justify-between rounded-md border-1 px-8 py-6 text-white sm:flex-row"
>
	<img {src} alt={name} class="h-[100px] w-[100px] rounded-full" />
	<div class="m-6 flex w-full flex-col">
		<H3>
			{name}
		</H3>
		<div>
			{text}
		</div>
	</div>
	<a {href} class="my-auto" target="_blank">
		<Button>{buttonText}</Button>
	</a>
</div>
