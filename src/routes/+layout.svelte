<script lang="ts">
	import '../app.css';
	import quotes from '../data/quotes.json';
	import { page } from '$app/state';

	let currentPath = $derived(page.url.pathname);
	let { children } = $props();

	let headerNav = [
		{
			href: '/',
			text: 'Team Builder'
		},
		{
			href: '/compositions',
			text: 'Challenges compositions'
		},
		{
			href: '/multisearch',
			text: 'Multisearch'
		},
		{
			href: '/communities',
			text: 'Communities'
		},
		{
			href: '/faq',
			text: 'FAQ'
		}
	];

	let footerNav = [
		{
			text: 'discord',
			href: 'https://discord.gg/aHs3uDraNU',
			class: 'fa-brands fa-discord text-indigo-400'
		},
		{
			text: 'kofi',
			href: 'https://ko-fi.com/theraphael0000',
			class: 'fa-solid fa-heart text-rose-600'
		},
		{
			text: 'github',
			href: 'https://github.com/TheRaphael0000/tahm-ken.ch/',
			class: 'fa-brands fa-github text-zinc-50'
		}
	];

	let quote = $state(quotes.at(Math.random() * quotes.length));

	setInterval(() => {
		quote = quotes.at(Math.random() * quotes.length);
	}, 10000);
</script>

<header>
	<div class="bg_img"></div>
	<nav class="flex flex-wrap">
		<a class="px-4 py-2" href="/" aria-label="home">
			<img src="img/favicon.png" alt="logo" class="h-10" />
		</a>
		{#each headerNav as link}
			<a class="my-2 px-4 py-2" class:border-b-1={currentPath === link.href} href={link.href}
				>{link.text}</a
			>
		{/each}
	</nav>
</header>

<main class="p-6">
	{@render children()}
</main>

<footer class="p-6 text-center">
	<div>
		<cite>{quote}</cite> &mdash; The River King
	</div>

	<div class="m-2 flex flex-wrap justify-center">
		{#each footerNav as link}
			<a aria-label={link.text} href={link.href} target="_blank" class="m-2 text-3xl">
				<i class={link.class}></i>
			</a>
		{/each}
	</div>

	<div class="text-sm text-gray-500">
		<div>
			Tahm-Ken.ch isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot
			Games or anyone officially involved in producing or managing Riot Games properties.
		</div>
		<div>
			Riot Games, and all associated properties are trademarks or registered trademarks of Riot
			Games, Inc.
		</div>
	</div>
</footer>

<style>
	.bg_img {
		background-image: url('img/tahm_kench/TahmKench_30.jpg');
		position: fixed;
		background-position: center;
		background-size: cover;
		width: 100%;
		height: 100%;
		filter: blur(3px) saturate(180%);
		transform: scale(1.2) scaleX(-1);
		opacity: 0.2;
		z-index: -1;
	}
</style>
