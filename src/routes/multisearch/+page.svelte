<script lang="ts">
	import { Article, Button, H1, Select, Option, TextArea, A } from '$lib/components';
	import { onMount } from 'svelte';
	import regions from 'data/regions.json';
	import donators from 'data/donators.json';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { challengesSite } from '$lib/challenges';

	let summoners: string = $state('');
	let region: string = $state('');
	let donatorsStr: string = $state('');
	let multisearch: any = $state();
	let order: Map<number, { completion: number; mae: number }> = $state(new Map());
	let completion: Map<string, number> = $state(new Map());

	onMount(async () => {
		donatorsStr = donators
			.sort(() => 0.5 - Math.random())
			.map((d) => `${d} joined the lobby`)
			.join('\n');
		await multiSearch();
	});

	function search() {
		let cleanSummoners = summoners.replace('#', '-').replaceAll('\n', ',');
		let url = `${page.url.pathname}?region=${region}&summoners=${cleanSummoners}`;
		goto(url);
		multiSearch();
	}

	async function multiSearch() {
		const urlParams = page.url.searchParams;
		const summoners = urlParams.get('summoners');
		const region = urlParams.get('region');

		if (!summoners || !region) {
			return;
		}
		const response = await fetch(
			`/api/challenges_player_data/${region}/${summoners}?masteries=True`
		);
		multisearch = await response.json();
		computeOrder();
		computeCompletion();
	}

	function computeOrder() {
		for (let challenge of challengesSite) {
			const line = { completion: 0, mae: 0 };
			for (let summoner of multisearch) {
				const summonerChallenge = summoner.challenges.challenges.find(
					(c: any) => c.challengeId == challenge.id
				);
				const value = summonerChallenge?.value ?? 0;
				const threshold = challenge.thresholds.MASTER.value;
				if (value >= threshold) line.completion += 1;
				else line.mae += (threshold - value) / multisearch.length;
			}
			order.set(challenge.id, line);
		}
		challengesSite.sort((a, b) => {
			const aOrder = order.get(a.id);
			const bOrder = order.get(b.id);
			if (aOrder?.completion != bOrder?.completion)
				return (aOrder?.completion ?? 0) - (bOrder?.completion ?? 0);
			return (bOrder?.mae ?? 0) - (aOrder?.mae ?? 0);
		});
	}

	function computeCompletion() {
		for (let summoner of multisearch) {
			let completed = 0;
			let total = 0;
			for (let challenge of challengesSite) {
				const summonerChallenge = summoner.challenges.challenges.find(
					(c: any) => c.challengeId == challenge.id
				);
				const value = summonerChallenge?.value ?? 0;
				const threshold = challenge.thresholds.MASTER.value;
				total += threshold;
				completed += Math.min(value, threshold);
			}
			console.log(completed, total);
			completion.set(summoner.account.puuid, completed / total);
		}
		// multisearch.sort((a, b) => {
		// 	const aOrder = order.get(a.id);
		// 	const bOrder = order.get(b.id);
		// 	if (aOrder?.completion != bOrder?.completion)
		// 		return (aOrder?.completion ?? 0) - (bOrder?.completion ?? 0);
		// 	return (bOrder?.mae ?? 0) - (aOrder?.mae ?? 0);
		// });
	}
</script>

<Article>
	<H1>Multisearch</H1>

	{#if multisearch}
		<table>
			<thead>
				<tr>
					<th class="py-2 text-left" colspan="2">Summoner</th>
					<th class="py-2 text-left" colspan="9999">Challenges</th>
				</tr>
			</thead>
			<tbody>
				{#each multisearch as summoner}
					{@const account = summoner.account}
					{@const challenges = summoner.challenges}
					{@const globalLevel = challenges.totalPoints.level.toLocaleLowerCase()}

					<tr>
						<td class="px-2">
							<span class="whitespace-nowrap">{account.gameName}</span>#{account.tagLine}
						</td>
						<td>
							<img
								class="h-10 max-h-10 w-10 max-w-10"
								src="/img/challengecrystal/{globalLevel}.ls_c2.png"
								alt={globalLevel}
							/>
						</td>

						{#each challengesSite as challenge}
							{@const allChallenges = challenges.challenges}
							{@const summonerChallenge = allChallenges.find(
								(c: any) => c.challengeId == challenge.id
							)}
							{@const challengeLevel = summonerChallenge?.level?.toLocaleLowerCase() ?? 'iron'}
							<td class="relative">
								<span class="absolute right-0 bottom-0 text-right"
									>{summonerChallenge?.value ?? '0'}</span
								>
								<img
									class="h-10 max-h-10 w-10 max-w-10"
									src={`https://raw.communitydragon.org/latest/game/assets/challenges/config/${challenge.id}/tokens/${challengeLevel}.png`}
									alt={challengeLevel}
								/>
							</td>
						{/each}

						<td class="px-2 text-right">
							{(100 * (completion.get(summoner.account.puuid) ?? 0)).toFixed(1)}%
						</td>
					</tr>
				{/each}
				<tr class="border-b-1 h-3">

				</tr>
				<tr>
					<td class="py-2 italic" colspan="2">Completion</td>
					{#each challengesSite as challenge}
						<td class="text-center italic">{order.get(challenge.id)?.completion}</td>
					{/each}
				</tr>
				<tr>
					<td class="py-2 italic" colspan="2">MAE</td>
					{#each challengesSite as challenge}
						<td class="text-center italic">{order.get(challenge.id)?.mae.toFixed(1)}</td>
					{/each}
				</tr>
			</tbody>
		</table>
	{:else}
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
	{/if}
</Article>
