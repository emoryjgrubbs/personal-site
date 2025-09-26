<template>
	<div class="gap-y-24 md:gap-y-16">
		<ReturnLink link="/Recipes" location="Recipes" />

		<!--Expanded Image Handling-->
		<ImgExpand
			:src="expand.src"
			:alt="expand.alt"
			:open="expand.open"
			@minimize="useMinimize"
		/>

		<div
			class="mx-16 my-16 mt-36 flex flex-col gap-y-24 sm:mt-16 md:mx-14 md:gap-y-16 lg:mx-24 xl:mx-48"
		>
			<!--Button for toggling Condensed Recipe-->
			<div class="flex w-full justify-end">
				<button
					class="flex w-fit cursor-pointer flex-row items-center gap-2 text-xl transition ease-in-out hover:scale-102"
					@click="toggleCondensed"
					:title="
						contentCondensed
							? 'Expand Recipe View'
							: 'Condense Recipe View'
					"
				>
					<Icon
						:name="
							contentCondensed
								? 'famicons:radio-button-on'
								: 'famicons:radio-button-off'
						"
					/>
					Condensed
				</button>
			</div>

			<ArticleBlockRecipeInfo
				:image="{
					src: '/images/recipes/simple-syrup/ingredients.webp',
					alt: 'Simple Syrup Ingredients',
				}"
				:ingredients="ingredients"
				:equipment="equipment"
				:instructions="instructions"
				:contentCondensed="contentCondensed"
				@maximize="(image) => useMaximize(image)"
			/>
			<div v-if="!contentCondensed" class="contents">
				<ArticleBlockText
					:heading="blocks[0].heading"
					:text="blocks[0].text"
				/>
				<ArticleBlockTextImage
					:heading="blocks[1].heading"
					:text="blocks[1].text"
					:image="blocks[1].image"
					@maximize="(image) => useMaximize(image)"
				/>
				<ArticleBlockTextImage
					:heading="blocks[2].heading"
					:text="blocks[1].text"
					:image="blocks[2].image"
					left="image"
					@maximize="(image) => useMaximize(image)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const ingredients = [
	{ name: "Pure Cane Sugar", measurement: "3 Parts" },
	{ name: "Unrefined Brown Sugar", measurement: "1 Parts" },
	{ name: "Water", measurement: "2 Parts" },
];
const equipment = ["Scale", "Sauce Pan", "Funnel", "Bottle"];
const instructions = [
	"Measure out 3 parts pure cane sugar, 1 part unrefined brown sugar, and 2 parts water",
	"Heat the on medium-low heat until the sugar has fully dissolved",
	"Pour into storage bottle using a funnel",
];

const blocks = [
	{
		heading: "",
		text: "I start by measuring out the 1 part water & 2 parts sugar on a scale. Here I used 300 grams of cane sugar, 100 grams of brown sugar, and 200 grams of water. Alternatively, you can use a volumetric measure, but I find measuring by weight to be the fastest and most consistent method. While simple syrups are mostly made with equal parts white sugar and water, I prefer a bit of a molasses taste in most recipes. With the best mixture I’ve found being this 3:1 ratio of cane sugar and an unrefined brown sugar, like demerara or turbinado. I also find it easier to make all my syrups rich as they can be thinned down elsewhere. This has the added benefit of putting my mind at ease about storage.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Next, I combine the ingredients in a sauce pan and place it on a burner set to medium low. This step isn’t about cooking anything, only heating the mixture enough for the sugar to be completely dissolved into the water. While on the heat, I stir the solution occasionally, paying attention to whether or not there are still sugar crystals. Usually I know it’s finished when steam is coming from the pot and the surface turns somewhat grey when undisturbed, but before many bubbles start forming.",
		image: {
			src: "/images/recipes/simple-syrup/cooking.webp",
			alt: "Heating syrup on stove top burner",
		},
	},
	{
		heading: "",
		text: "Finally, I take the solution off the heat, and I pour the syrup into a bottle through a funnel. I leave the bottle out at least overnight to minimize stress to the glass. It should be perfectly shelf stable, although I keep it refrigerated so it’s cold when I use it.",
		image: {
			src: "/images/recipes/simple-syrup/bottling.webp",
			alt: "Bottle of simple syrup",
		},
	},
];

const contentCondensed = ref(false);
function toggleCondensed() {
	contentCondensed.value = !contentCondensed.value;
}

const expand = useExpand();
</script>
