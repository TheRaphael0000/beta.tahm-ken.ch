<script lang="ts">
	import { Article, Button, H1, Select, Option, TextArea, A } from '$lib/components';
	import { onMount } from 'svelte';
	import regions from 'data/regions.json';
	import donators from 'data/donators.json';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let summoners: string = $state('');
	let region: string = $state('');
	let donatorsStr: string = $state('');

	onMount(() => {
		donatorsStr = donators
			.sort(() => 0.5 - Math.random())
			.map((d) => `${d} joined the lobby`)
			.join('\n');
	});

	function search() {
		let cleanSummoners = summoners.replace('#', '-').replaceAll('\n', ',');
		let url = `${page.url.pathname}?region=${region}&summoners=${cleanSummoners}`;
		goto(url);
	}
</script>

<Article>
	<H1>Multisearch</H1>

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
		<TextArea class="block w-full" rows="8" bind:value={summoners} placeholder={donatorsStr} />
	</label>

	<p>
		<Button onclick={search}>Search</Button>
	</p>

	<div class="mt-2 text-gray-500" style="font-size:0.9em;">
		The placeholder contains the list of the Donators, thanks to them ! link to the <A
			href="https://ko-fi.com/theraphael0000">donation page</A
		>
		&lt;(^.^&lt;) <br />
	</div>
</Article>
