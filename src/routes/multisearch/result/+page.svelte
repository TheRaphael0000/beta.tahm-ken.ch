<script lang="ts">
	import { page } from '$app/state';
	import { challengesSite } from '$lib/challenges';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let multisearch: any = $state();
	let order: Map<number, { completion: number; mae: number }> = $state(new Map());
	let completion: Map<string, number> = $state(new Map());

	let orderedMultiSearch = $derived.by(() => {
		return multisearch?.toSorted((a: any, b: any) => {
			const aCompletion = completion.get(a.account.puuid) ?? 0;
			const bCompletion = completion.get(b.account.puuid) ?? 0;
			return aCompletion - bCompletion;
		});
	});

	let ordredChallenges = $derived.by(() => {
		return challengesSite?.toSorted((a, b) => {
			const aOrder = order.get(a.id);
			const bOrder = order.get(b.id);
			if (aOrder?.completion != bOrder?.completion)
				return (aOrder?.completion ?? 0) - (bOrder?.completion ?? 0);
			return (bOrder?.mae ?? 0) - (aOrder?.mae ?? 0);
		});
	});

	$effect(() => {
		const urlParams = page.url.searchParams;
		const summoners = urlParams.get('summoners');
		const region = urlParams.get('region');

		if (!summoners || !region) {
			return;
		}

		(async () => {
			const response = await fetch(`/api/player_data/${region}/${summoners}?masteries=True`);
			multisearch = await response.json();
			order = computeOrder();
			completion = computeCompletion();
		})();
	});

	function computeOrder() {
		const output = new Map<number, { completion: number; mae: number }>();

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
			challenge.completion = line;
			output.set(challenge.id, line);
		}
		return output;
	}

	function computeCompletion() {
		const output = new Map<string, number>();
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
			output.set(summoner.account.puuid, completed / total);
		}
		return output;
	}
</script>

<svelte:head>
	<title>Multisearch result</title>
</svelte:head>

<p><i>Hover to see the challenge name</i></p>

<table>
	<thead>
		<tr>
			<th class="py-2 text-left" colspan="4">Summoners</th>
			<th class="py-2 text-left" colspan="9999">Challenges</th>
		</tr>
	</thead>
	<tbody>
		{#each orderedMultiSearch as summoner}
			{@const account = summoner.account}
			{@const challenges = summoner.challenges}
			{@const globalLevel = challenges.totalPoints.level.toLocaleLowerCase()}
			{@const icon = summoner.summoner.profileIconId}

			<tr>
				<td>
					<img
						class="h-10 max-h-10 w-10 max-w-10"
						src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${icon}.png`}
						alt={'icon' + icon}
					/>
				</td>
				<td class="px-2">
					<span class="whitespace-nowrap">{account.gameName}</span><span
						class="text-xs text-gray-500">#{account.tagLine}</span
					>
				</td>

				<td class="px-2 text-right">
					{(100 * (completion.get(summoner.account.puuid) ?? 0)).toFixed(1)}%
				</td>

				<td>
					<img
						class="h-10 max-h-10 w-10 max-w-10"
						src="/img/challengecrystal/{globalLevel}.ls_c2.png"
						alt={globalLevel}
					/>
				</td>

				<td class="flex flex-row flex-wrap">
					{#each ordredChallenges as challenge}
						{@const allChallenges = challenges.challenges}
						{@const summonerChallenge = allChallenges.find(
							(c: any) => c.challengeId == challenge.id
						)}
						{@const challengeLevel = summonerChallenge?.level?.toLocaleLowerCase() ?? 'iron'}
						<div>
							<div class="relative">
								<Tooltip>
									{#snippet text()}
										<span class="absolute right-1 bottom-0 text-right"
											>{summonerChallenge?.value ?? '0'}</span
										>
										<img
											class="h-9 max-h-9 w-9 max-w-9"
											src={`https://raw.communitydragon.org/latest/game/assets/challenges/config/${challenge.id}/tokens/${challengeLevel}.png`}
											alt={challengeLevel}
										/>
									{/snippet}
									<div class="text-nowrap">{challenge.name}</div>
								</Tooltip>
							</div>
						</div>
					{/each}
				</td>
			</tr>
		{/each}
		<tr class="h-3 border-b-1"> </tr>
		<tr>
			<td class="py-2 italic" colspan="4">Completion</td>

			<td class="flex flex-row flex-wrap">
				{#each challengesSite as challenge}
					<div class="h-9 max-h-9 w-9 max-w-9 text-center">
						{order.get(challenge.id)?.completion.toFixed(0)}
					</div>
				{/each}
			</td>
		</tr>
		<tr>
			<td class="py-2 italic" colspan="4">MAE</td>
			<td class="flex flex-row flex-wrap">
				{#each challengesSite as challenge}
					<div class="h-9 max-h-9 w-9 max-w-9 text-center">
						{order.get(challenge.id)?.mae.toFixed(1)}
					</div>
				{/each}
			</td>
		</tr>
	</tbody>
</table>
