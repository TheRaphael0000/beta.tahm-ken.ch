<script lang="ts">
	import { H1, Article } from '$lib/components';
	import Community from './Community.svelte';
	import DiscordCommunity from './DiscordCommunity.svelte';
	import discord_invites from 'data/cache/discord.cache.json';
</script>

<svelte:head>
	<title>Community - Tahm-Ken.ch</title>
	<meta name="description" content="League of Legends challenges communities affiliated with Tahm-Ken.ch" />
</svelte:head>

<Article>
	<H1>Community</H1>

	<Community
		href="https://challenges.darkintaqt.com/"
		name="Challenge Tracker"
		src="/img/challenges_darkintaqt_com.png"
		buttonText="Visit Website"
		text="League of Legends Challenge Tracker & Leaderboards by DarkIntaqt.com"
	/>
	<!-- League Challenges -->
	<DiscordCommunity community={discord_invites.FJXAvqxw6T} />
	<!-- League Desafíos LoL ESP -->
	<DiscordCommunity community={discord_invites.cKGS6ASyuZ} />
	<!-- Achievement Hunting -->
	<DiscordCommunity community={discord_invites.yapEVysv3b} />
	<!-- High Mastery -->
	<DiscordCommunity community={discord_invites.zASN5E6RCv} />

	<!-- Tahm-Ken.ch -->
	<DiscordCommunity community={discord_invites.aHs3uDraNU} />
	<p>
		You can ask on the Tahm-Ken.ch Discord server if you want to add your community on the site (it
		doesn't need to be a Discord server). You must be admin of this community.
	</p>
</Article>
