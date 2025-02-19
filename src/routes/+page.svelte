<script lang="ts">
	import { Button, InputText } from '$lib/components';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import champions_json from 'data/cache/champion.cache.json';
	import challenges_json from 'data/challenges.json';

	const challenges = Object.entries(challenges_json).map((c) => c[1]);

	const groups = [
		{
			main: challenges_json[303400],
			challenges: challenges.filter((c) => challenges_json[303400].childrenIds.includes(c.id))
		},
		{
			main: challenges_json[303500],
			challenges: challenges.filter((c) => challenges_json[303500].childrenIds.includes(c.id))
		}
	];

	function getSize(challenge: any) {
		if ([303407, 303408].includes(challenge.id) || challenge.parentId == 303500) return 5;
		else return 3;
	}

	const championsAll = Object.entries(champions_json.data).map((c) => c[1]);
	const championsMap = new Map(Object.entries(champions_json.data));
	let champions = $state([...championsAll]);
	const championsSelected: string[] = $state([]);
	let challengesSelected: any[] = $state([]);
	const championsKeyForSelectedChallenges = $derived(
		getChampions(challengesSelected).map((c) => c.key)
	);
	const canAdd = $derived(championsSelected.length < 5);

	const championsOrdered = $derived(orderChampions(champions));

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
		champions = championsAll.filter((c) =>
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
		challengesSelected = challengesSelected.filter(a => false);
	}

	function getChampions(challenges: any[]) {
		const sets = [];
		for (const challenge of challenges) {
			sets.push(new Set<number>(challenge.availableIds));
		}

		const result: any[] = [...intersectSets(sets)]
			.map((key: number) => championsAll.find((c) => c.key == key.toString()))
			.filter((k: any) => k != undefined);

		return result;
	}

	function intersectSets(sets: Set<any>[]) {
		if (!sets || sets.length === 0) {
			return new Set();
		}

		let intersection = new Set(sets[0]);

		for (let i = 1; i < sets.length; i++) {
			intersection = intersection.intersection(sets[i]);
		}

		return intersection;
	}

	$inspect(championsSelected, console.trace)
	// document.addEventListener("keypress", console.log)
</script>

<div class="flex flex-wrap justify-center">
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

<div class="flex">
	<table class="shrink grow">
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
			{#each groups as group}
				{@const main = group.main}
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
				{#each group.challenges as challenge}
					{@const championsChallenge = getChampions([challenge])}
					{@const championsSelectedChallenge = championsChallenge.filter((champion: any) =>
						championsSelected.includes(champion.id)
					)}
					{@const missingDots = getSize(challenge) - championsSelectedChallenge.length}
					<tr>
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
							<label for={`challenge_cb_${challenge.id}`} class="cursor-pointer">
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
								{#each Array.from(Array(missingDots).keys()) as i}
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

	<div>
		<div class="flex flex-wrap justify-center">
			{#each championsOrdered as champion}
				<button
					class="m-1 ring-amber-400/75 transition-all duration-75"
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
</div>
