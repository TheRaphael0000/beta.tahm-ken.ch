<script lang="ts">
	import { Select, Option } from '$lib/components';
	import Button from '$lib/components/Button.svelte';

	let isVisible: boolean = $state(false);
	let { background = $bindable() } = $props();
</script>

<div>
	<a
		href="."
		onclick={(event) => {
			event.preventDefault();
			isVisible = !isVisible;
		}}>Site Theme</a
	>

	{#if isVisible}
		<div
			class="fixed top-1/3 left-1/2 z-100 my-3 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-black p-5 shadow shadow-white"
		>
			<div class="flex flex-col gap-5">
				<label>
					Background:
					<Select bind:value={background}>
						<Option value="TahmKench_00.jpg">Original</Option>
						<Option value="TahmKench_01.jpg">Master Chef</Option>
						<Option value="TahmKench_02.jpg">Urf Kench</Option>
						<Option value="TahmKench_03.jpg">Coin Emperor</Option>
						<Option value="TahmKench_11.jpg">Arcana</Option>
						<Option value="TahmKench_20.jpg">High Noon</Option>
						<Option value="TahmKench_30.jpg">Shan Hai Scrolls</Option>
					</Select>
				</label>

				<div class="text-center">
					<Button onclick={() => (isVisible = false)}>Close</Button>
				</div>
			</div>
		</div>
	{/if}
</div>
