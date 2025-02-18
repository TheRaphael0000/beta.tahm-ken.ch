import { writeFileSync } from 'fs';

const communities = ['aHs3uDraNU', 'zASN5E6RCv', 'FJXAvqxw6T', 'yapEVysv3b', 'cKGS6ASyuZ'];

async function query(invite_id) {
	const response = await fetch(`https://discord.com/api/v10/invites/${invite_id}`, {
		headers: {
			'User-Agent': 'TKBOT (https://tahm-ken.ch, 2.0)',
			'Content-Type': 'application/json'
		}
	});
	const json = await response.json();
	return json;
}

async function main() {
	const cache = new Map();
	for (const invite_id of communities) {
		const community = await query(invite_id);
		cache.set(invite_id, community);
	}
	console.log(cache)
	const communities_string = JSON.stringify(Object.fromEntries(cache), null, 2)
	console.log(communities_string)
	writeFileSync('src/data/discord.cache.json', communities_string);
}

main();
