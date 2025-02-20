import { intersectSets } from './utils';

import champions_json from 'data/cache/champion.cache.json';
import challenges_json from 'data/challenges.json';

export const champions = Object.entries(champions_json.data).map((c) => c[1]);
export const championsMap = new Map(Object.entries(champions_json.data));

export const challenges = Object.entries(challenges_json).map((c) => c[1]);

export const challengesGroups = [
	{
		main: challenges_json[303400],
		challenges: challenges.filter((c) => challenges_json[303400].childrenIds.includes(c.id))
	},
	{
		main: challenges_json[303500],
		challenges: challenges.filter((c) => challenges_json[303500].childrenIds.includes(c.id))
	}
];

export function getChallengeRequirements(challenge: any) {
	if ([303407, 303408].includes(challenge.id) || challenge.parentId == 303500) return 5;
	else return 3;
}

export function getChampions(challenges: any[]) {
	const sets = [];
	for (const challenge of challenges) {
		sets.push(new Set<number>(challenge.availableIds));
	}

	const result: any[] = [...intersectSets(sets)]
		.map((key: number) => champions.find((c) => c.key == key.toString()))
		.filter((k: any) => k != undefined);

	return result;
}
