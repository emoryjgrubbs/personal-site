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
					@click="useToggleCondense()"
					:title="
						condenseContent
							? 'Expand Recipe View'
							: 'Condense Recipe View'
					"
				>
					<Icon
						:name="
							condenseContent
								? 'famicons:radio-button-on'
								: 'famicons:radio-button-off'
						"
					/>
					Condensed
				</button>
			</div>

			<ArticleBlockRecipeInfo
				:recipe="title"
				:image="{
					src: '/images/recipes/banana-brownies/ingredients.webp',
					alt: 'Brownie Ingredients Laid Out',
				}"
				:ingredients="ingredients"
				:equipment="equipment"
				:instructions="instructions"
				:condenseContent="condenseContent"
				@maximize="(image) => useMaximize(image)"
			/>
			<div v-if="!condenseContent" class="contents">
				<ArticleBlockText
					:heading="blocks[0].heading"
					:text="blocks[0].text"
				/>

				<ArticleBlockTextImage
					:heading="blocks[1].heading"
					:text="blocks[1].text"
					:image="blocks[1].image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[2].heading"
					:text="blocks[2].text"
					:image="blocks[2].image"
					left="image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[3].heading"
					:text="blocks[3].text"
					:image="blocks[3].image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[4].heading"
					:text="blocks[4].text"
					:image="blocks[4].image"
					left="image"
				/>

				<ArticleBlockText
					:heading="blocks[5].heading"
					:text="blocks[5].text"
				/>

				<ArticleBlockImage
					:heading="blocks[6].heading"
					:image="blocks[6].image"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const title = "Banana Brownies";
const ingredients = [
	{ name: "Cocoa", measurement: "¾ Cup" },
	{ name: "Butter", measurement: "12 TBSP" },
	{ name: "Eggs", measurement: "2" },
	{ name: "Bananas", measurement: "1 ½" },
	{ name: "Vanilla Extract", measurement: "1 TSP" },
	{ name: "All Purpose Flour", measurement: "¾ Cup" },
	{ name: "Unrefined Brown Sugar", measurement: "1 Cup" },
	{ name: "Pure Cane Sugar", measurement: "¾ Cup" },
];
const equipment = [
	"sauce pan",
	"whisk",
	"mixing bowl",
	"measuring cup",
	"baking pan",
];
const instructions = [
	"Pre-heat the oven to 325 degrees",
	"Add 12 tbsp butter and ¾ cup cocoa to a sauce pan",
	"Set sauce pan on low heat, stirring occasionally",
	"Once smooth pour into a mixing bowl and let cool",
	"Combine ¾ cup of flour, 1 cup of brown sugar, ¾ cup of cane sugar, and a pinch of salt in a separate bowl",
	"Whisk 2 eggs, 1 ½ bananas, and 1 tsp of vanilla extract into the butter and cocoa",
	"Whisk the dry ingredients into the wet ingredients until homogeneous",
	"Pour brownie mix into a buttered baking pan",
	"Bake at 325 for about 50 minutes",
	"Remove from the oven, let cool, and cut",
];

const blocks = [
	{
		heading: "",
		text: "Pre-heat oven to 325.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Add 12 tbsp of butter to a sauce pan with ¾ a cup cocoa, stirring occasionally over low heat. Once smooth, take off the heat and let cool.",
		image: {
			src: "images/recipes/banana-brownies/sauce-pan.webp",
			alt: "Sacue pan with the combined butter and cocoa",
		},
	},
	{
		heading: "",
		text: "While the butter and cocoa is cooling, add 1 cup of brown sugar, ¾ a cup of cane sugar, ¾ a cup of flour, and a large pinch of salt to a bowl.",
		image: {
			src: "images/recipes/banana-brownies/dry.webp",
			alt: "Bowl of the dry ingredients",
		},
	},
	{
		heading: "",
		text: "Once the butter and cocoa have cooled, pour the mixture into a mixing bowl. Then whisk in 2 eggs and 1 ½ bananas, along with 1 teaspoon of vanilla. The banana will incorporate when whisked, but I like to try and leave some chunks still intact. It’s best to use a ripe banana for this because they are softer.",
		image: {
			src: "images/recipes/banana-brownies/wet.webp",
			alt: "Wisked wet ingredients",
		},
	},
	{
		heading: "",
		text: "After the binders have been added to the cocoa mixture, add the dry ingredients. Stir all the ingredients together until homogeneous. Then transfer to a buttered 8 by 8 square pan, baking for about 50 minutes.",
		image: {
			src: "images/recipes/banana-brownies/wet-dry.webp",
			alt: "Mixing bowl with the wet and dry ingreidents",
		},
	},
	{
		heading: "",
		text: "Let cool then cut.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "",
		image: {
			src: "images/recipes/banana-brownies/product.webp",
			alt: "Finished brownies",
		},
	},
];

const condenseContent = useCondenseContent();

const expand = useExpand();
</script>
