<script lang="ts">
	import { Button, InputText } from '$lib/components';
</script>

<div class="flex flex-wrap justify-center">
	<Button class="mx-3" title="Show/Hide completed challenges">
		<i class="fa-solid fa-fw fa-eye"></i>
	</Button>
	<InputText
		class="mx-3"
		title="Search for champions, enter allows you to selected when only one champion matches the search"
		placeholder="Search champion..."
	/>
	<Button
		class="mx-3"
		title="Find compositions that satify the current selection (selected champions and challenges)."
	>
		<i class="fa-solid fa-wand-magic-sparkles"></i> Optimize selection
	</Button>
	<!-- <div class="col col-md-auto">
		<div id="selection"></div>
	</div>
	<div class="col col-md-auto mt-2">
		<span id="attribution_score">0.00/5.00</span>
		<span class="tooltip_ hoverable"
			>?<span class="tooltip_text tooltip_right"
				>Attribution score, how well the comp is meta. The closer to 5 the closer each champion play
				its natural position</span
			></span
		>
	</div> -->
	<Button class="mx-3" title="Clear selections">
		<i class="fa-solid fa-fw fa-trash"></i> Clear
	</Button>
	<Button class="mx-3" title="Copy a link to your current selection to the clipboard">
		<i class="fa-solid fa-share"></i> Share
	</Button>
</div>
