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
					src: info.image,
					alt: info.alt,
				}"
				:ingredients="ingredients"
				:equipment="equipment"
				:instructions="instructions"
				:condenseContent="condenseContent"
				@maximize="(image) => useMaximize(image)"
			/>
			<div v-if="!condenseContent" class="contents">
				<ArticleBlockTextImage
					:heading="blocks[0].heading"
					:text="blocks[0].text"
					:image="blocks[0].image"
				/>
				<ArticleBlockText
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
				<ArticleBlockText
					:heading="blocks[3].heading"
					:text="blocks[3].text"
					:image="blocks[3].image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[4].heading"
					:text="blocks[4].text"
					:image="blocks[4].image"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const title = route.params.variant;
const info = computed(() => {
	let image;
	let alt;

	switch (route.params.variant.toLowerCase()) {
		case "lemon-limeade":
			image = "images/recipes/juice/lemon-limeade-ingredients.webp";
			alt = "Counter preped to brew espresso";
			break;
		default:
			console.debug("Bad juice variant");
	}

	return { image: image, alt: alt };
});
const ingredients = computed(() => {
	switch (route.params.variant.toLowerCase()) {
		case "lemon-limeade":
			return [
				{ name: "lemon", measurement: "1" },
				{ name: "lime", measurement: "1" },
				{ name: "water", measurement: "6 to 8 Ounces" },
				{ name: "simple-syrup", measurement: "1 to 1 1/2 Ounces" },
			];
	}

	return [];
});
const equipment = computed(() => {
	switch (route.params.variant.toLowerCase()) {
		case "lemon-limeade":
			return ["knife", "juicer", "shaker", "strainer"];
	}

	return [];
});
const instructions = computed(() => {
	switch (route.params.variant.toLowerCase()) {
		case "lemon-limeade":
			return [
				"Cut a lemon and a lime in half",
				"Juice the fruit into a shaker",
				"Add 1 1/4 ounces of simple syrup, 8 ounces of water, and 6 large ice cubes",
				"Shake lengthwise to combine and chill the juice",
				"Strain into a cup and add more ice",
			];
	}

	return [];
});

const blocks = [
	{
		heading: "",
		text: "Cut a lemon and a lime in half, and combine the juice with between 1 and 1.5 ounces of simple syrup and 6 to 8 ounces of water. I use a boston shaker because it’s easy to load and clean, but you could use a water tight container. The syrup I use is linked at the bottom of this page, as well as in the ingredients.",
		image: {
			src: "images/recipes/juice/lemon-limeade-juicing.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Once the other ingredients are in the shaker, I load 6 large ice cubes in as well. This allows the drink to be enjoyed immediately, although it does also introduce more water. So, if you choose not to shake with ice, add an extra couple ounces of water.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "With the shaker prepared, I shake lengthwise to fully incorporate the ingredients for about 30 seconds. At this point it should be fairly cold to the touch. Finally I strain the drink as I pour it, using both a hawthorn strainer and a conical fine mesh sieve. This fully filters any ice, pulp, or seeds while allowing a fast flow. I then add some more ice cubes to the cup and enjoy.",
		image: {
			src: "images/recipes/juice/lemon-limeade-shaken.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "I will make a lot more complicated drinks for people, but this always seems to be a favorite. Probably because it’s just a bunch of sugar, fresh citrus juice, and water. The same principles can be applied with other fruit, such as oranges, just consider the amount of juice you are getting out. I’m much more freeform when making this because it’s pretty hard to screw up, which is why I’m only specifying by number of fruit and not exact ounces. But, my recommendations would be to reduce to only using one fruit for something larger like a navel orange, or increasing to 3 for something smaller like a mandarin.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "For something more akin to an ultra-fresh sprite, you can carbonate your juice. This assumes your machine allows you to carbonate more than just water, which as far as I am aware is just the Drinkmate I have or a Brevil. I find just substituting carbonated water after shaking the other ingredients isn’t concentrated enough to make a noticeable difference. But I normally skip this entirely.",
		image: {
			src: "images/recipes/juice/lemon-limeade-carbonation.webp",
			alt: "",
		},
	},
];

const condenseContent = useCondenseContent();

const expand = useExpand();
</script>
