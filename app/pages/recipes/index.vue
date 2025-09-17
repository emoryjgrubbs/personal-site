<template>
	<div>
		<ReturnLink link="/" location="Home" />

		<div
			class="mx-16 my-16 mt-40 flex flex-col md:mx-14 gap-8 lg:mx-24 xl:mx-48"
		>
			<!--Search Component-->
			<CombiFilter
				:content="recipes"
				:tagList="tagList"
				placeholder="Recipe"
				@searchUpdate="(filterUpdate) => updateDisplay(filterUpdate)"
				class="mb-10"
				ref="filter"
			/>

			<!--Button for toggling Recipe Details-->
			<div class="flex w-full justify-end">
				<button
					class="flex w-fit cursor-pointer flex-row items-center gap-2 text-lg sm:text-xl transition ease-in-out hover:scale-102"
					@click="toggleDetails"
					:title="
						showDetails
							? 'Hide Image Details'
							: 'Show Image Details'
					"
				>
					<Icon
						:name="
							showDetails
								? 'famicons:radio-button-on'
								: 'famicons:radio-button-off'
						"
					/>
					Ingredient
				</button>
			</div>

			<!--Recipe Cards-->
			<div
				class="grid"
				:class="
					showDetails
						? 'grid-cols-1 gap-12'
						: 'grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5'
				"
			>
				<div
					v-for="recipe in filteredRecipes"
					class="flex items-center select-none"
					:class="showDetails ? 'flex' : ''"
				>
					<NuxtLink
						:to="recipe.link"
						:title="'Navigate To ' + recipe.title"
						class="h-full cursor-pointer text-xl"
						:class="
							showDetails
								? 'xl:w-3/8'
								: 'w-full overflow-hidden rounded-3xl bg-black text-white'
						"
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

function computeTagList() {
	let list = [];
	for (const recipe of recipes) {
		list.push(...recipe.tags);
	}
	list = [...new Set(list)];
	list.sort();
	list = list.map((element) => ({ sign: "p", value: element }));
	return list;
}

const tagList = computeTagList();
const filter = ref(null);

function addClickedTag(value) {
	if (
		!filter.value.selectedTags
			.map((element) => element.value)
			.includes(value)
	) {
		filter.value.selectedTags.push({ sign: "p", value: value });
	}
}

const filteredRecipes = ref(recipes);

function updateDisplay(filterUpdate) {
	filteredRecipes.value = filterUpdate;
}
</script>
