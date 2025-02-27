<script lang="ts">
	import { Button, Select, Option, TextArea, Link } from '$lib/components';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import regions from 'data/regions.json';
	import donators from 'data/donators.json';
	import { goto } from '$app/navigation';
	import { parseJoinText } from '$lib/utils';

	let summoners: string = $state('');
	let region: string = $state('');
	let donatorsStr: string = $state('');

	$effect(() => {
		if (browser) {
			if (region === '') {
				region = localStorage.getItem('region') || '';
			}
			localStorage.setItem('region', region);
		}
	});

	onMount(async () => {
		donatorsStr = donators
			.sort(() => 0.5 - Math.random())
			.map((d) => `${d} joined the lobby`)
			.join('\n');
	});

	function search() {
		let cleanSummoners = summoners.replace('#', '-').replaceAll('\n', ',');
		let url = `/multisearch/result?region=${region}&summoners=${cleanSummoners}`;
		goto(url);
	}

	function paste(event: any) {
		const area = event.target;
		event.preventDefault();
		let paste = event.clipboardData.getData('text');

		paste = parseJoinText(paste)

		// handle selection
		const selectionStart = area.selectionStart
		const selectionEnd = area.selectionEnd
		const currentValue = area.value
		const modifiedValue = currentValue.substring(0, selectionStart) + paste + currentValue.substring(selectionEnd)
		area.value = modifiedValue
		const newPosition = selectionStart + paste.length
		area.setSelectionRange(newPosition, newPosition)
	}
</script>

<svelte:head>
	<title>Multisearch</title>
</svelte:head>

<p>
	Enter the summoners name + tag of all the players in your lobby. You can copy/paste join messages
	in chat.
</p>
<label>
	<p>Region</p>
	<Select class="block w-full" bind:value={region}>
		{#each regions as region}
			<Option value={region.id}>{region.abbreviation} - {region.name}</Option>
		{/each}
	</Select>
</label>

<label>
	<p>Summoners</p>
	<TextArea
		class="block w-full"
		rows="8"
		bind:value={summoners}
		placeholder={donatorsStr}
		onpaste={paste}
	/>
</label>

<p>
	<Button onclick={search}>Search</Button>
</p>

<div class="mt-2 text-gray-500" style="font-size:0.9em;">
	The placeholder contains the list of the Donators, thanks to them ! link to the
	<Link href="https://ko-fi.com/theraphael0000">donation page</Link>
	&lt;(^.^&lt;) <br />
</div>
