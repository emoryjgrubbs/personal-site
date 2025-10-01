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

			<h1 class="text-3xl">
				CURRENTLY ALL RECIPES BUT SIMPLES SYRUP ARE FOR TESTING PURPOSES
			</h1>
			<!--Recipe Cards-->
			<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
				<div
					v-for="recipe in filteredElements"
					class="aspect-2/3 md:aspect-4/5"
				>
					<div
						class="flex h-full w-full flex-col items-center gap-2 select-none"
					>
						<h1 class="px-4 text-center text-2xl">
							{{ recipe.title }}
						</h1>
						<NuxtLink
							:to="recipe.link"
							:title="'Navigate To ' + recipe.title"
							class="w-full cursor-pointer"
						>
							<NuxtImg
								:src="recipe.thumbnail"
								:alt="recipe.thumbnailAlt"
								draggable="false"
								class="aspect-3/2"
							/>
						</NuxtLink>
						<div
							class="flex h-full w-full flex-row gap-1 overflow-hidden"
						>
							<div class="flex h-full w-1/3 flex-col text-center">
								<h2>Ingredients</h2>
								<div
									class="sm:text-md flex h-full flex-col gap-2 overflow-y-scroll text-sm lg:text-lg"
								>
									<div
										v-for="ingredient in recipe.ingredients"
										class="bg-columbia-blue cursor-pointer gap-2 rounded-md px-1 capitalize sm:px-3"
										@click="useClickedTag(ingredient)"
										title="Add Ingerdient to Filter"
									>
										{{ ingredient }}
									</div>
								</div>
							</div>
							<div class="flex h-full w-1/3 flex-col text-center">
								<h2>Equipment</h2>
								<div
									class="sm:text-md flex flex-col gap-2 overflow-y-scroll text-sm lg:text-lg"
								>
									<div
										v-for="piece in recipe.equipment"
										class="bg-columbia-blue cursor-pointer gap-2 rounded-md px-1 capitalize sm:px-3"
										@click="useClickedTag(piece)"
										title="Add equipment to Filter"
									>
										{{ piece }}
									</div>
								</div>
							</div>
							<div class="flex h-full w-1/3 flex-col text-center">
								<h2>Dietary</h2>
								<div
									class="sm:text-md flex flex-col gap-2 overflow-y-scroll text-sm lg:text-lg"
								>
									<div
										v-for="info in recipe.dietary"
										class="bg-columbia-blue cursor-pointer gap-2 rounded-md px-1 capitalize sm:px-3"
										@click="useClickedTag(info)"
										title="Add Dietary Information to Filter"
									>
										{{ info }}
									</div>
								</div>
							</div>
						</div>
						<!--
                    --></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
//iife to automatically concat anything in ingredients/equipment/dietary into the tags property
const recipes = (function () {
	let internal = [
		{
			title: "Simple Syrup",
			ingredients: ["sugar", "water"],
			equipment: ["scale", "sauce pan", "funnel", "bottle"],
			dietary: [],
			tags: ["ingredient"],
			dates: [{ start: "2025-09-13", end: "2025-09-13" }],
			thumbnail: "/images/recipes/simple-syrup/thumbnail.webp",
			thumbnailAlt: "Ingredients for Simple Syrup",
			link: "/Recipes/Simple-Syrup",
		},
		{
			title: "Lemon-Limeade",
			ingredients: ["lemon", "lime", "water", "simple-syrup"],
			equipment: ["knife", "juicer", "shaker", "strainer"],
			dietary: [],
			tags: ["drink"],
			dates: [],
			thumbnail: "/images/recipes/simple-syrup/thumbnail.webp",
			thumbnailAlt: "Ingredients for Simple Syrup",
			link: "/Recipes/Simple-Syrup",
		},
		{
			title: "Espresso",
			ingredients: ["coffee beans", "water"],
			equipment: [
				"grinder",
				"distribution tool",
				"scale",
				"espresso machine",
			],
			dietary: ["caffeine"],
			tags: ["drink"],
			dates: [],
			thumbnail: "/images/recipes/simple-syrup/thumbnail.webp",
			thumbnailAlt: "Ingredients for Simple Syrup",
			link: "/Recipes/Simple-Syrup",
		},
		{
			title: "Latte",
			ingredients: ["coffee beans", "water", "milk"],
			equipment: [
				"grinder",
				"distribution tool",
				"scale",
				"pitcher",
				"espresso machine",
			],
			dietary: ["caffeine", "lactose"],
			tags: ["drink"],
			dates: [],
			thumbnail: "/images/recipes/simple-syrup/thumbnail.webp",
			thumbnailAlt: "Ingredients for Simple Syrup",
			link: "/Recipes/Simple-Syrup",
		},
		{
			title: "Red Pasta",
			ingredients: [
				"whole peeled tomatos",
				"water",
				"olive oil",
				"garlic",
				"red pepper flakes",
				"salt",
				"pepper",
				"oregano",
				"basil",
				"ground beef",
				"noodles",
			],
			equipment: [
				"mixing bowl",
				"potato masher",
				"knife",
				"measuring cup",
				"sauce pan",
				"teaspoon",
				"skillet",
				"spatula",
				"pot",
			],
			dietary: ["meat", "gluten"],
			tags: [],
			dates: [],
			thumbnail: "/images/recipes/simple-syrup/thumbnail.webp",
			thumbnailAlt: "Ingredients for Simple Syrup",
			link: "/Recipes/Simple-Syrup",
		},
		{
			title: "Banana Brownies",
			ingredients: [
				"cocoa",
				"butter",
				"egg",
				"banana",
				"vanilla",
				"flour",
				"sugar",
				"salt",
			],
			equipment: [
				"sauce pan",
				"whisk",
				"mixing bowl",
				"measuring cup",
				"baking pan",
			],
			dietary: ["dessert"],
			tags: [],
			dates: [],
			thumbnail: "/images/recipes/simple-syrup/thumbnail.webp",
			thumbnailAlt: "Ingredients for Simple Syrup",
			link: "/Recipes/Simple-Syrup",
		},
	];

	internal.map((element) => {
		element.tags = element.tags.concat(
			element.ingredients,
			element.equipment
		);
	});

	return internal;
})();
// {title: "", tags: [], dates: [{start: "", end: ""}], thumbnail: "/images/recipes//thumbnail.webp", thumbnailAlt: "", link: "/recipes/"},

const tagList = useTagList(recipes);
const filteredElements = useFilteredElements(recipes);
</script>
