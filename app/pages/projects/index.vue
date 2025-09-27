<template>
	<div>
		<ReturnLink link="/" location="Home" />

		<div
			class="mx-16 my-16 mt-40 flex flex-col gap-8 md:mx-14 lg:mx-24 xl:mx-48"
		>
			<!--Search Component-->
			<CombiFilter
				:content="projects"
				placeholder="Project"
				@searchUpdate="
					(filterUpdate) => useUpdateElements(filterUpdate)
				"
				class="mb-10"
				:ref="useSelectedTags()"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
const projects = [];

const tagList = useTagList(projects);
const filteredElements = useFilteredElements(projects);
</script>
