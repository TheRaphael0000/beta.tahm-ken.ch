<script lang="ts">
	import Community from './Community.svelte';

	let { community } = $props();
</script>

<Community
	href={`https://discord.gg/${community.code}`}
	name={community.guild.name}
	text={community.guild.description}
	src={`https://cdn.discordapp.com/icons/${community.guild.id}/${community.guild.icon}.jpg?size=100`}
	buttonText="Join Discord"
/>
