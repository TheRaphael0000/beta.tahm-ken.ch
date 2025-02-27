import { writeFileSync, readFileSync } from 'fs';

const endpoint = 'https://ddragon.leagueoflegends.com';
const dataFolder = 'src/data/cache/';
const staticFolder = 'static/img/cache/';

async function queryJson(pathname, filename) {
	const url = `${endpoint}/${pathname}`;
	console.log(url);
	const response = await fetch(url);
	const json = await response.json();
	writeFileSync(`${dataFolder}${filename}`, JSON.stringify(json, null, 2));
	return json;
}

async function queryBlob(pathname, filename) {
	const url = `${endpoint}/${pathname}`;
	console.log(url);
	const response = await fetch(url);
	const blob = await response.blob();
	const arrayBuffer = await blob.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	writeFileSync(`${staticFolder}${filename}`, buffer);
}

export default async function main() {
	console.log('Caching datadragon...');

	const versionFilename = 'versions.cache.json';
	let currentVersions = [''];
	try {
		currentVersions = JSON.parse(readFileSync(`${dataFolder}${versionFilename}`));
	} catch (e) {}
	const versions = await queryJson('api/versions.json', versionFilename);
	const version = versions.at(0);

	console.log(`riot version: ${version}`);
	console.log(`current downloaded version: ${currentVersions.at(0)}`);
	
	if (version == currentVersions.at(0)) return;

	const champions = await queryJson(
		`cdn/${version}/data/en_US/champion.json`,
		'champion.cache.json'
	);

	for (const [id, champion] of Object.entries(champions['data'])) {
		await queryBlob(
			`cdn/${version}/img/champion/${champion['image']['full']}`,
			champion['image']['full']
		);
	}
}
