<script lang="ts">
	import { Button, InputText } from '$lib/components';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import {
		champions,
		championsMap,
		getChampions,
		getChallengeRequirements,
		challengesGroups
	} from '$lib/challenges';

	let champions_filtered = $state([...champions]);
	const championsSelected: string[] = $state([]);
	let challengesSelected: any[] = $state([]);
	const championsKeyForSelectedChallenges = $derived(
		getChampions(challengesSelected).map((c) => c.key)
	);
	const canAdd = $derived(championsSelected.length < 5);

	const championsOrdered = $derived(orderChampions(champions_filtered));

	function orderChampions(champions: any) {
		// order by name first
		let order = champions.toSorted((a: any, b: any) => {
			return a.name.localeCompare(b.name);
		});

		// then by selected challenges
		if (championsKeyForSelectedChallenges.length > 0) {
			order.sort((a: any, b: any) => {
				const ai = championsKeyForSelectedChallenges.includes(a?.key) ? 1 : 0;
				const bi = championsKeyForSelectedChallenges.includes(b?.key) ? 1 : 0;
				return bi - ai;
			});
		}

		return order;
	}

	function filter(event: any) {
		const value = event.target.value as string;
		champions_filtered = champions.filter((c) =>
			c.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
		);
	}

	function filterKey(event: any) {
		if (event.key == 'Enter') {
			event.target.value = '';
			if (champions.length == 1) championClick(event, champions[0].id);
		}
		filter(event);
	}

	function championClick(event: any, id: string) {
		if (championsSelected.includes(id)) {
			championsSelected.splice(championsSelected.indexOf(id), 1);
		} else {
			if (canAdd) championsSelected.push(id);
		}
	}

	function clear(event: any) {
		championsSelected.splice(0, championsSelected.length);
		challengesSelected = challengesSelected.filter((a) => false);
	}
</script>

<div class="team_builder">
	<div class="menu flex flex-wrap justify-center">
		<Button class="m-3" title="Show/Hide completed challenges">
			<i class="fa-solid fa-fw fa-eye"></i>
		</Button>
		<InputText
			class="m-3"
			title="Search for champions, enter allows you to selected when only one champion matches the search"
			placeholder="Search champion..."
			oninput={filter}
			onkeypress={filterKey}
		/>
		<Button
			class="m-3"
			title="Find compositions that satify the current selection (selected champions and challenges)."
		>
			<i class="fa-solid fa-wand-magic-sparkles"></i> Optimize selection
		</Button>
		<div class="mx-3 flex items-center">
			{#each Array.from(Array(5).keys()) as i}
				{@const championSelected = championsSelected.at(i) ?? ''}
				{@const champion = championsMap.get(championSelected)}

				<div class={['m-1.5', 'h-11', 'w-11', champion == undefined ? 'p-[11px]' : '']}>
					{#if champion == undefined}
						<div class="v-full h-full rounded-full bg-white/50"></div>
					{:else}
						<button class="cursor-pointer" onclick={(e) => championClick(e, champion.id)}>
							<img src={`/img/cache/${champion?.image.full}`} alt={champion.name} />
						</button>
					{/if}
				</div>
			{/each}
		</div>
		<Button class="m-3" title="Clear selections" onclick={clear}>
			<i class="fa-solid fa-fw fa-trash"></i> Clear
		</Button>
		<Button class="m-3" title="Copy a link to your current selection to the clipboard">
			<i class="fa-solid fa-share"></i> Share
		</Button>
	</div>

	<table class="challenges_list">
		<thead>
			<tr>
				<th class="px-2"></th>
				<th class="px-2 text-right">#</th>
				<th class="px-2 text-left">Challenges</th>
				<th class="px-2"></th>
				<th class="px-2 text-left">Selection</th>
			</tr>
		</thead>
		<tbody>
			{#each challengesGroups as challengeGroup}
				{@const main = challengeGroup.main}
				<tr>
					<td class="px-2"></td>
					<td class="px-2"></td>
					<th class="px-2 text-left">{main.name}</th>
					<td class="px-2 text-left">
						<Tooltip text="?">
							{main.description}
						</Tooltip>
					</td>
				</tr>
				{#each challengeGroup.challenges as challenge}
					{@const championsChallenge = getChampions([challenge])}
					{@const championsSelectedChallenge = championsChallenge.filter((champion: any) =>
						championsSelected.includes(champion.id)
					)}
					{@const missingDots = Math.max(
						getChallengeRequirements(challenge) - championsSelectedChallenge.length,
						0
					)}
					<tr class:text-amber-400={missingDots <= 0}>
						<td class="px-2 pt-0.5 text-right"
							><input
								type="checkbox"
								id={`challenge_cb_${challenge.id}`}
								class="cursor-pointer"
								bind:group={challengesSelected}
								value={challenge}
							/></td
						>
						<td class="px-2 text-right">
							<label
								for={`challenge_cb_${challenge.id}`}
								class="cursor-pointer"
								style="width:30px; display inline-block;"
							>
								{getChampions([...challengesSelected, challenge]).length}
							</label>
						</td>
						<td class="px-2 text-left">
							<label for={`challenge_cb_${challenge.id}`} class="cursor-pointer text-nowrap">
								{challenge.name}
							</label>
						</td>
						<td class="px-2 text-left">
							<Tooltip text="?">
								{challenge.description}
							</Tooltip>
						</td>
						<td class="px-2 text-left">
							<div class="flex items-center">
								{#each championsSelectedChallenge as championSelectedChallenge}
									<div class="mx-0.5 h-[20px] w-[20px]">
										<img
											src={`/img/cache/${championSelectedChallenge?.image.full}`}
											alt={championSelectedChallenge?.name}
										/>
									</div>
								{/each}
								{#each Array(missingDots) as i}
									<div class="mx-0.5 h-[20px] w-[20px] p-[5px]">
										<div class="v-full h-full rounded-full bg-white/50"></div>
									</div>
								{/each}
							</div>
						</td>
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>

	<div class="champions_pool flex flex-wrap content-start justify-center">
		{#each championsOrdered as champion}
			<button
				class="m-1 ring-amber-400 transition-all duration-75"
				class:ring-2={championsSelected.includes(champion.id)}
				class:cursor-pointer={canAdd || championsSelected.includes(champion.id)}
				onclick={(e) => championClick(e, champion.id)}
				class:opacity-35={!championsKeyForSelectedChallenges.includes(champion.key) &&
					championsKeyForSelectedChallenges.length != 0}
			>
				<img src={`/img/cache/${champion.image.full}`} alt={champion.name} class="w-16" />
			</button>
		{/each}
	</div>
</div>

<style>
	.team_builder {
		display: grid;
		grid-template-areas:
			'menu menu'
			'chall pool';
	}

	@media screen and (max-width: 900px) {
		.menu {
			grid-area: 1 / span 2 !important;
		}
		.challenges_list {
			grid-area: 2 / span 2 !important;
		}
		.champions_pool {
			grid-area: 3 / span 2 !important;
		}
	}

	@media screen and (min-width: 900px) {
		.menu {
			grid-area: menu;
		}
		.challenges_list {
			grid-area: chall;
		}
		.champions_pool {
			grid-area: pool;
		}
	}
</style>
