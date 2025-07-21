<script>
	import { H1, H2, Article, Link } from '$lib/components';
</script>

<svelte:head>
	<title>Tahm-Ken.ch</title>
	<meta
		name="description"
		content="Tools to help you complete Harmony and Globetrotter challenges in League of Legends!"
	/>
</svelte:head>

<Article>
	<H1>Welcome to Tahm-Ken.ch</H1>

	<p>
		This website is designed to help you complete <b>Harmony</b> and <b>Globetrotter</b> challenges in
		League of Legends!
	</p>

	<H2>Our Tools</H2>
	<p>We offer three main tools to assist you:</p>
	<ul class="ml-8 list-disc">
		<li>
			<Link href="/multisearch">Multisearch</Link>
			<br />
			Find out which challenges are missing from your premade group.
		</li>
		<li>
			<Link href="/team_builder">Team Builder</Link>
			<br />
			Discover which champions you should pick to complete specific challenges.
		</li>
		<li>
			<Link href="/compositions">Compositions</Link>
			<br />
			Access pre-computed team compositions optimized for maximizing challenge completion.
		</li>
	</ul>

	<H2>Community</H2>
	<p>
		Looking for teammates for these or other challenges? Check out our <Link href="/community"
			>Community</Link
		> page.
	</p>

	<p>
		If you encounter any <b>bugs</b> or have <b>suggestions</b> for website <b>improvements</b>,
		please let us know on our discord server. [<Link href="https://discord.gg/aHs3uDraNU"
			>Discord</Link
		>]
	</p>

	<H2>Support Us</H2>
	<p>
		Tahm-Ken.ch is <b>ad-free</b> and we don't collect any personal data, only page visit statistics
		(using <Link href="https://github.com/umami-software/umami">Umami</Link>). If you'd like to
		support our work, you can <b>donate</b> here. [<Link href="https://ko-fi.com/theraphael0000"
			>Donation page</Link
		>]
	</p>
	<p>
		Donating offers no special advantages, though we can display your name in the Multisearch bar
		placeholder if you wish.
	</p>
	<p>
		For those concerned about tracking and advertisements, we recommend reading this insightful
		article:
		<Link href="https://lichess.org/ads">https://lichess.org/ads</Link>
	</p>

	<H2>Source Code</H2>
	<p>
		Tahm-Ken.ch is entirely <b>open source</b>. Feel free to explore the code to understand how it
		works or contribute to its improvement! [<Link
			href="https://github.com/TheRaphael0000/beta.tahm-ken.ch/">Source Code</Link
		>]
	</p>
</Article>
