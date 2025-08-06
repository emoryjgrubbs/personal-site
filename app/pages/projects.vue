<template>
	<div>
		<HomeLink />

		<div class="mx-16 my-16 mt-40 flex flex-col md:mx-14 lg:mx-20">
			<CombiFilter
				:content="projects"
				placeholder="Project"
				@searchUpdate="(filterUpdate) => updateDisplay(filterUpdate)"
				class="mb-10"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
const projects = [];
</script>
