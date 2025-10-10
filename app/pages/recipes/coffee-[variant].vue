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
				<ArticleBlockText
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
					left="image"
				/>
				<ArticleBlockImage
					v-if="route.params.variant.toLowerCase() == 'espresso'"
					:heading="blocks[5].heading"
					:text="blocks[5].text"
					:image="blocks[5].image"
				/>
				<div
					v-if="route.params.variant.toLowerCase() == 'latte'"
					class="contents"
				>
					<ArticleBlockTextImage
						:heading="blocks[6].heading"
						:text="blocks[6].text"
						:image="blocks[6].image"
					/>
				</div>
				<ArticleBlockText
					:heading="blocks[7].heading"
					:text="blocks[7].text"
					:image="blocks[7].image"
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
		case "espresso":
			image = "images/recipes/coffee/espresso-ingredients.webp";
			alt = "Counter preped to brew espresso";
			break;
		case "latte":
			image = "images/recipes/coffee/latte-ingredients.webp";
			alt = "Counter preped to pour a latte";
			break;
		default:
			console.debug("Bad coffee variant");
	}

	return { image: image, alt: alt };
});
const ingredients = computed(() => {
	switch (route.params.variant.toLowerCase()) {
		case "espresso":
			return [
				{ name: "Coffee Beans", measurement: "19 Grams" },
				{ name: "Water", measurement: "" },
			];
		case "latte":
			return [
				{ name: "Coffee Beans", measurement: "19 Grams" },
				{ name: "Water", measurement: "" },
				{ name: "Milk", measurement: "165 Grams" },
			];
	}

	return [];
});
const equipment = computed(() => {
	switch (route.params.variant.toLowerCase()) {
		case "espresso":
			return [
				"grinder",
				"distribution tool",
				"scale",
				"espresso machine",
			];
		case "latte":
			return [
				"grinder",
				"distribution tool",
				"scale",
				"pitcher",
				"espresso machine",
			];
	}

	return [];
});
const instructions = computed(() => {
	let espresso = [
		"Let your machine fully heat up for at around half an hour",
		"Insert your portafilter to warm, while you grind you coffee",
		"Prepare your puck. If possible distribute your grounds, then tamp with moderate force",
		"For stock Gaggias, push water through the machine untill it drops below temp, then after the light comes back on wait an 10 seconds, finally push the steam button and wait an additional 5 seconds",
		"Pull your shot, aiming for about 2:1 in 35 seconds",
	];
	let latte = [
		"Measure out about 160 grams of milk in a pitcher",
		"Introduce air for 3 to 5 seconds",
		"At about a 45 degree angle, incorporate the air into the milk until hot to the touch",
		"Pour the milk into the espresso shot, starting high and slow, then bringing the pitcher down close to the surface to pour a design",
	];

	switch (route.params.variant.toLowerCase()) {
		case "espresso":
			return espresso;
		case "latte":
			return espresso.concat(latte);
	}

	return [];
});

const blocks = [
	{
		heading: "",
		text: "Before you do anything, let your machine fully heat up. I usually turn mine on before getting ready in the morning. Heating the whole group head will result in a more consistent temperature throughout a shot.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Once your machine is preheated, lock in your portafilter as you grind your beans. I have a hand grinder so I find this is a good time to heat the basket. However, if you have an electric grinder or pre-ground coffee, you may want to let it heat for longer. The amount of coffee you need to appropriately fill your basket will depend on your specific machine and basket. For my Gaggia Classic Pro E24 with a 17 - 21g IMS basket, I find 19 grams usually puts my puck at the right height. To find the height for your set up, you want the top of the puck to be just below the shower screen, so check your prepared portafilter after locking it in. If you see an indent it’s too high and you should reduce the amount of grounds slightly. Another complication is that different beans perform best at different grind sizes. This is also affected by how long ago the beans we roasted. With my 1zpresso J-Ultra hand grinder, I start at 1.2.0 and adjust according to taste.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "The next step is to prepare your puck. I have issues with channeling that seem to stem from my inability to pour the grounds so they are flat before the tamp. I’ve found that a small fork does the job, but a proper needle tool is a necessary upgrade if you have this issue. If you don’t want to make a mess while you comb through the coffee, some sort of dosing funnel really helps. After I am satisfied with the distribution, I tamp with my arm as straight above the portafilter as possible, giving a little twist before pulling up to prevent anything from sticking.",
		image: {
			src: "images/recipes/coffee/espresso-puck-prep.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "This section applies to unmodified Gaggia Classic Pros. I only do one ‘hack’ when I’m pulling shots, and find that I can get consistently great tasting coffee. I push water through, into a waste cup, until the light turns off. Then when the light comes on, I wait 10 seconds. Finally, I push the steam button to increase the temperature for an additional 5 seconds before starting my shot. More than anything, this is just to get a consistent temperature.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "When pulling shots, I rely on an espresso scale for insight into the shot(maybe change to something about “quantifying” results). I have gotten the best results pulling shots at about a 2:1 ratio, in about 35 seconds. If you want the best coffee possible, you should be tasting your espresso, as it will provide the most feedback. The general rule is that sour espresso is underextracting and bitter espresso is overextracted. Once you are familiar with how a particular batch of beans pulls, you can look at the time and extraction stream as a measure of the shot’s performance.",
		image: {
			src: "images/recipes/coffee/espresso-pulling.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "",
		image: {
			src: "images/recipes/coffee/espresso-thumbnail.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "For a latte, I use about 160 grams of whole milk that just came out of the refrigerator. I set my pitcher at a slight angle using the spout as a guide, with the steam nozzle right at the surface. Once the milk has been sufficiently aerated, I move the nozzle down to incorporate the air. I know the milk is up to temp when I really don’t want to be holding on to the pitcher anymore, at which point I use a wet rag to clean the tip and purge it into a waste cup. At this point I stir my espresso and pour it into the cup I will be using. Then I start pouring my milk high and slow to mix with the coffee. Nearing the top of the cup, I will bring down my pitcher and start pouring a design.",
		image: {
			src: "images/recipes/coffee/latte-product.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "After finishing my coffee, I always use some extra water to flush the machine, reducing the build up of grounds in the waterblock/shower screen. I also thoroughly clean my portafilter and basket, and spray air using the included hand pump to clean my grinder. This doesn’t take long and will make future maintenance easier and result in better coffee. Once a week I will take a bit more time to clean my machine with a proper detergent, 5 rounds of 10 seconds on 10 seconds off with a blind basket. And about once every other week, or whenever I get new beans, I will disassemble and fully clean my grinder.",
		image: {
			src: "",
			alt: "",
		},
	},
];

const condenseContent = useCondenseContent();

const expand = useExpand();
</script>
