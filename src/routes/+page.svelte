<script lang="ts">
	import { Button, InputText } from '$lib/components';
	import champions_json from 'data/cache/champion.cache.json';

	const championsAll = Object.entries(champions_json.data).map((c) => c[1]);
	const championsMap = new Map(Object.entries(champions_json.data));
	let champions = $state([...championsAll]);
	const championsSelected: string[] = $state([]);
	const canAdd = $derived(championsSelected.length < 5);

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
	}

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

			<div class="m-1.5 h-11 w-11">
				{#if champion == undefined}
					<div class="v-full h-full rounded-full bg-white/50 p-3"></div>
				{:else}
					<button class="cursor-pointer" onclick={(e) => championClick(e, champion.id)}>
						<img src={`/img/cache/${champion?.image.full}`} alt={champion.name} />
					</button>
				{/if}
			</div>
		{/each}
	</div>
	<!-- <div class="col col-md-auto mt-2">
		<span id="attribution_score">0.00/5.00</span>
		<span class="tooltip_ hoverable"
			>?<span class="tooltip_text tooltip_right"
				>Attribution score, how well the comp is meta. The closer to 5 the closer each champion play
				its natural position</span
			></span
		>
	</div> -->
	<Button class="m-3" title="Clear selections" onclick={clear}>
		<i class="fa-solid fa-fw fa-trash"></i> Clear
	</Button>
	<Button class="m-3" title="Copy a link to your current selection to the clipboard">
		<i class="fa-solid fa-share"></i> Share
	</Button>
</div>

<div class="flex">
	<div class="flex flex-col">
		{#each Array.from(Array(10).keys()) as i}
			<input type="checkbox" />
		{/each}
	</div>

	<div class="flex flex-wrap justify-center">
		{#each champions as champion}
			<button
				class="m-1 ring-amber-400/75 transition-all duration-75"
				class:ring-2={championsSelected.includes(champion.id)}
				class:cursor-pointer={canAdd || championsSelected.includes(champion.id)}
				onclick={(e) => championClick(e, champion.id)}
			>
				<img src={`/img/cache/${champion.image.full}`} alt={champion.name} class="w-18" />
			</button>
		{/each}
	</div>
</div>
