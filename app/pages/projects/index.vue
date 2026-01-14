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
							class="flex w-full cursor-pointer flex-row"
						>
							<h1
								class="text-left text-2xl font-bold duration-300 ease-in-out group-hover:transition hover:scale-110"
							>
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
		tags: [
			"personal",
			"web",
			"website",
			"webdeb",
			"vue",
			"nuxt",
			"tailwind",
		],
		dates: [
			{ start: "2024-08-12", end: "2024-09-04" },
			{ start: "2025-08-05", end: "now" },
		],
		name: "projects-personal-site",
	},
	{
		title: "Waybar Modifications",
		tags: ["c++"],
		dates: [{ start: "2025-10-09", end: "2025-10-09" }],
		name: "projects-waybar-modifications",
	},
];

const tagList = useTagList(projects);
const filteredElements = useFilteredElements(projects);
</script>
