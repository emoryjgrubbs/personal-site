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
					class="aspect-2/3 lg:aspect-4/5"
				>
					<div
						class="flex h-full w-full flex-col items-center gap-2 select-none"
					>
						<h1 class="px-4 text-center text-2xl">
							{{ recipe.title }}
						</h1>
						<NuxtLink
							:to="{
								name: recipe.name,
								params: { variant: recipe.variant },
							}"
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
							class="xl:text-md flex h-full w-full flex-row gap-x-1 overflow-hidden text-sm md:gap-x-2 2xl:text-lg"
						>
							<div
								class="flex h-full w-1/2 flex-col gap-x-1 overflow-y-scroll text-center md:gap-x-2 lg:w-2/3 lg:flex-row lg:overflow-y-hidden"
							>
								<div
									class="contents w-1/2 overflow-x-clip overflow-y-scroll lg:flex lg:flex-col"
								>
									<h2
										class="bg-alice-blue sticky top-0 overflow-x-visible"
									>
										Ingredients
									</h2>
									<div class="flex flex-col gap-2">
										<div
											v-for="ingredient in recipe.ingredients"
											class="bg-columbia-blue cursor-pointer overflow-x-scroll rounded-md px-1 hyphens-auto capitalize xl:px-3"
											lang="en"
											@click="useClickedTag(ingredient)"
											title="Add Ingerdient to Filter"
										>
											{{ ingredient }}
										</div>
									</div>
								</div>
								<div
									class="contents w-1/2 overflow-x-clip overflow-y-scroll lg:flex lg:flex-col"
								>
									<h2
										class="bg-alice-blue sticky top-0 overflow-x-visible"
									>
										Equipment
									</h2>
									<div class="flex flex-col gap-2">
										<div
											v-for="piece in recipe.equipment"
											class="bg-columbia-blue cursor-pointer overflow-x-scroll rounded-md px-1 hyphens-auto capitalize xl:px-3"
											lang="en"
											@click="useClickedTag(piece)"
											title="Add equipment to Filter"
										>
											{{ piece }}
										</div>
									</div>
								</div>
							</div>
							<div
								class="flex h-full w-1/2 flex-col overflow-y-scroll text-center lg:w-1/3"
							>
								<h2 class="bg-alice-blue sticky top-0">
									Dietary
								</h2>
								<div class="flex flex-col gap-2">
									<div
										v-for="info in recipe.dietary"
										class="bg-columbia-blue cursor-pointer overflow-x-scroll rounded-md px-1 capitalize xl:px-3"
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
			name: "recipes-simple-syrup",
			variant: "",
		},
		{
			title: "Lemon-Limeade",
			ingredients: ["lemon", "lime", "water", "simple syrup"],
			equipment: ["knife", "juicer", "shaker", "strainer"],
			dietary: [],
			tags: ["drink"],
			dates: [],
			thumbnail: "/images/recipes/juice/lemon-limeade/thumbnail.webp",
			thumbnailAlt: "",
			name: "recipes-juice-variant",
			variant: "lemon-limeade",
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
			thumbnail: "/images/recipes/coffee/espresso/thumbnail.webp",
			thumbnailAlt: "",
			name: "recipes-coffee-variant",
			variant: "espresso",
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
			thumbnail: "/images/recipes/coffee/latte/thumbnail.webp",
			thumbnailAlt: "",
			name: "recipes-coffee-variant",
			variant: "latte",
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
			thumbnail: "/images/recipes/pasta/red/thumbnail.webp",
			thumbnailAlt: "",
			name: "recipes-pasta-variant",
			variant: "red",
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
			dietary: ["dessert", "gluten"],
			tags: [],
			dates: [],
			thumbnail: "/images/recipes/banana-brownies/thumbnail.webp",
			thumbnailAlt: "",
			name: "recipes-banana-brownies",
			variant: "",
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
