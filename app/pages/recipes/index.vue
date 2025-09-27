<template>
	<div>
		<ReturnLink link="/" location="Home" />

		<div
			class="mx-16 my-16 mt-40 flex flex-col gap-8 md:mx-14 lg:mx-24 xl:mx-48"
		>
			<!--Search Component-->
			<CombiFilter
				:content="recipes"
				:tagList="tagList"
				placeholder="Recipe"
				@searchUpdate="
					(filterUpdate) => useUpdateElements(filterUpdate)
				"
				class="mb-10"
				:ref="useSelectedTags()"
			/>

			<!--Recipe Cards-->
			<div class="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
				<div
					v-for="recipe in filteredElements"
					class="flex items-center select-none"
				>
					<NuxtLink
						:to="recipe.link"
						:title="'Navigate To ' + recipe.title"
						class="h-full w-full cursor-pointer overflow-hidden rounded-3xl bg-black text-xl text-white"
					>
						<NuxtImg
							:src="recipe.thumbnail"
							:alt="recipe.thumbnailAlt"
							draggable="false"
							class="aspect-3/2"
						/>
						<h1 class="p-4 text-center">{{ recipe.title }}</h1>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const recipes = [
	{
		title: "Simple Syrup",
		tags: ["sugar", "water", "ingredient"],
		dates: [{ start: "2025-09-13", end: "2025-09-13" }],
		thumbnail: "/images/recipes/simple-syrup/thumbnail.webp",
		thumbnailAlt: "Ingredients for Simple Syrup",
		link: "/Recipes/Simple-Syrup",
	},
];
// {title: "", tags: [], dates: [{start: "", end: ""}], thumbnail: "/images/recipes//thumbnail.webp", thumbnailAlt: "", link: "/recipes/"},

const tagList = useTagList(recipes);
const filteredElements = useFilteredElements(recipes);
</script>
