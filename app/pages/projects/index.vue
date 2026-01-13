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

			<!--Recipe Cards-->
			<div class="">
				<div v-for="project in filteredElements" class="">
					<div class="">
						<NuxtLink
							:to="{
								name: project.name,
								params: { variant: project.variant },
							}"
							:title="'Navigate To ' + project.title"
							class="w-full cursor-pointer"
						>
							<h1 class="px-4 text-center text-2xl">
								{{ project.title }}
							</h1>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const projects = [
	{
		title: "Personal Site",
		tags: [],
		dates: [{ start: "YYYY-MM-DD", end: "YYYY-MM-DD" }],
		name: "projects-personal-site",
	},
	{
		title: "Waybar Modifications",
		tags: [],
		dates: [{ start: "YYYY-MM-DD", end: "YYYY-MM-DD" }],
		name: "projects-waybar-modifications",
	},
];

const tagList = useTagList(projects);
const filteredElements = useFilteredElements(projects);
</script>
