<script lang="ts">
	import '../app.css';
	import quotes from 'data/quotes.json';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let currentPath = $derived(page.url.pathname);
	let { children } = $props();

	let headerNav = [
		{
			href: '/',
			text: 'Tahm-Ken.ch'
		},
		{
			href: '/multisearch',
			text: 'Multisearch'
		},
		{
			href: '/team_builder',
			text: 'Team Builder'
		},
		{
			href: '/compositions',
			text: 'Compositions'
		},
		{
			href: '/community',
			text: 'Community'
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
			href: 'https://github.com/TheRaphael0000/beta.tahm-ken.ch/',
			class: 'fa-brands fa-github text-zinc-50'
		}
	];

	let quote: string = $state('');

	function updateQuote() {
		quote = quotes?.at(Math.random() * quotes.length) ?? '';
	}

	onMount(updateQuote);
	setInterval(updateQuote, 10000);
</script>

<svelte:head>
	<title>Team Builder</title>
</svelte:head>

<header>
	<div class="bg_img"></div>
	<nav class="mx-7 my-3 flex flex-col items-center justify-start gap-7 md:flex-row">
		<a href="/" aria-label="home">
			<img src="/img/favicon.png" alt="logo" class="h-10" />
		</a>
		{#each headerNav as link, i}
			<!-- svelte-ignore a11y_accesskey -->
			<a
				class:border-b-1={currentPath === link.href}
				href={link.href}
				accesskey={(i + 1).toString()}>{link.text}</a
			>
		{/each}
	</nav>
</header>

<main>
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
		background-image: url('/img/tahm_kench/TahmKench_11.jpg');
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
