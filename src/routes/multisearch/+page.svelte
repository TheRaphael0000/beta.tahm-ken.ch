<script lang="ts">
	import { Article, Button, H1, Select, TextArea } from '$lib/components';
	import regions from 'data/regions.json';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let summoners: string = $state('');
	let region: string = $state('');

	function search() {
		let cleanSummoners = summoners.replace('#', '-').replaceAll('\n', ',');
		let url = `${page.url.pathname}/${region}/${cleanSummoners}`;
		goto(url);
	}
</script>

<Article>
	<H1>Multisearch</H1>

	<label>
		<p>Region</p>
		<Select class="block w-full" bind:value={region}>
			{#each regions as region}
				<option value={region.id}>{region.abbreviation} ({region.name})</option>
			{/each}
		</Select>
	</label>

	<label>
		<p>Summoners</p>
		<TextArea class="block w-full" rows="8" bind:value={summoners} />
	</label>

	<p>
		<Button onclick={search}>Search</Button>
	</p>
</Article>
