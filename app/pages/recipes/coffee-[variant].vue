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

			<VariantLinks
				address="recipes-coffee-variant"
				:variants="variants"
			/>
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
				<div
					v-if="
						route.params.variant.toLowerCase() == 'espresso' ||
						route.params.variant.toLowerCase() == 'latte'
					"
					class="contents"
				>
					<ArticleBlockText
						:heading="blocks[0].heading"
						:text="blocks[0].text"
						:image="blocks[0].image"
					/>
					<ArticleBlockTextImage
						:heading="blocks[1].heading"
						:text="blocks[1].text"
						:image="blocks[1].image"
						@maximize="(image) => useMaximize(image)"
					/>
					<ArticleBlockText
						:heading="blocks[2].heading"
						:text="blocks[2].text"
						:image="blocks[2].image"
					/>
					<ArticleBlockTextImage
						:heading="blocks[3].heading"
						:text="blocks[3].text"
						:image="blocks[3].image"
						left="image"
						@maximize="(image) => useMaximize(image)"
					/>
					<ArticleBlockText
						:heading="blocks[4].heading"
						:text="blocks[4].text"
						:image="blocks[4].image"
					/>
					<ArticleBlockTextImage
						:heading="blocks[5].heading"
						:text="blocks[5].text"
						:image="blocks[5].image"
						@maximize="(image) => useMaximize(image)"
					/>
					<ArticleBlockImage
						v-if="route.params.variant.toLowerCase() == 'espresso'"
						:heading="blocks[6].heading"
						:text="blocks[6].text"
						:image="blocks[6].image"
						@maximize="(image) => useMaximize(image)"
					/>
					<div
						v-if="route.params.variant.toLowerCase() == 'latte'"
						class="contents"
					>
						<ArticleBlockTextImage
							:heading="blocks[7].heading"
							:text="blocks[7].text"
							:image="blocks[7].image"
							left="image"
							@maximize="(image) => useMaximize(image)"
						/>
					</div>
					<ArticleBlockText
						:heading="blocks[8].heading"
						:text="blocks[8].text"
						:image="blocks[8].image"
					/>
				</div>
				<div
					v-if="route.params.variant.toLowerCase() == 'pour-over'"
					class="contents"
				>
					<ArticleBlockTextImage
						:heading="blocks[9].heading"
						:text="blocks[9].text"
						:image="blocks[9].image"
						@maximize="(image) => useMaximize(image)"
					/>
					<ArticleBlockText
						:heading="blocks[10].heading"
						:text="blocks[10].text"
						:image="blocks[10].image"
					/>
					<ArticleBlockTextImage
						:heading="blocks[11].heading"
						:text="blocks[11].text"
						:image="blocks[11].image"
						left="image"
						@maximize="(image) => useMaximize(image)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const title = route.params.variant;
const variants = ["espresso", "latte", "pour-over"];
const info = computed(() => {
	let image;
	let alt;

	switch (route.params.variant.toLowerCase()) {
		case variants[0]:
			image = "images/recipes/coffee/espresso-ingredients.webp";
			alt = "Counter prepped to brew espresso";
			break;
		case variants[1]:
			image = "images/recipes/coffee/latte-ingredients.webp";
			alt = "Counter prepped to pour a latte";
			break;
		case variants[2]:
			image = "images/recipes/coffee/pour-over-ingredients.webp";
			alt = "Counter prepped to brew a pour-over";
			break;
		default:
			console.debug("Bad coffee variant");
	}

	return { image: image, alt: alt };
});
const ingredients = computed(() => {
	switch (route.params.variant.toLowerCase()) {
		case variants[0]:
			return [
				{ name: "Coffee Beans", measurement: "20 Grams" },
				{ name: "Water", measurement: "" },
			];
		case variants[1]:
			return [
				{ name: "Coffee Beans", measurement: "20 Grams" },
				{ name: "Water", measurement: "" },
				{ name: "Milk", measurement: "165 Grams" },
			];
		case variants[2]:
			return [
				{ name: "Coffee Beans", measurement: "18 Grams" },
				{ name: "Water", measurement: "" },
			];
		default:
			return [];
	}
});
const equipment = computed(() => {
	switch (route.params.variant.toLowerCase()) {
		case variants[0]:
			return [
				"Grinder",
				"Distribution Tool",
				"Scale",
				"Espresso Machine",
			];
		case variants[1]:
			return [
				"Grinder",
				"Distribution Tool",
				"Scale",
				"Pitcher",
				"Espresso Machine",
			];
		case variants[2]:
			return ["Grinder", "Scale", "V60", "Kettle"];
		default:
			return [];
	}
});
const instructions = computed(() => {
	let espresso = [
		"Let your machine fully heat up for at around half an hour",
		"Insert your portafilter to warm, while you grind you coffee",
		"Prepare your puck. If possible distribute your grounds, then tamp with moderate force",
		"For stock Gaggias, push water through the machine untill it drops below temp, then after the light comes back on wait an 10 seconds, finally push the steam button and wait an additional 5 seconds",
		"Pull your shot, aiming for about 2:1 in 25 seconds",
	];
	let latte = [
		"Fill a pitcher with milk, to the base of the spout",
		"Introduce air for 2 to 4 seconds",
		"At about a 45 degree angle, incorporate the air into the milk until hot to the touch",
		"Pour the milk into the espresso shot, starting high and slow, then bringing the pitcher down close to the surface to pour a design",
	];
	let pourover = [
		"Heat your kettle to between 190 and 200 degrees Fahrenheit, with the V60 cone on top",
		"Grind the coffee",
		"Add the filter to the V60. Then place your vessle on the scale with the V60 on top",
		"Pour a 50 gram bloom, wait about 40 seconds before repeating",
		"Swirl the grounds, then wait another 40 seconds",
		"Pour 100 grams of water and let drain, then repeat",
		"After the second pour, swirl the cone",
	];

	switch (route.params.variant.toLowerCase()) {
		case variants[0]:
			return espresso;
		case variants[1]:
			return espresso.concat(latte);
		case variants[2]:
			return pourover;
		default:
			return [];
	}
});

const blocks = [
	//espresso
	{
		heading: "",
		text: "Before you do anything, let your machine fully heat up. I usually turn mine on before getting ready in the morning. Heating the whole group head will result in a more consistent temperature throughout a shot. I only insert my portafilter for the last couple minutes of preheating, so it’s warmed without being hot. With a hand grinder, I find the time to weigh and grind the coffee works well.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "The amount of coffee you need to appropriately fill your basket will depend on your specific machine and basket. For my setup, I start with 20 grams and adjust up or down by half a gram until my puck is at the right height. To find the height for your set up, you want the top of the puck to be just below the shower screen. Lock in your prepared portafilter and check for an indentation before pulling the shot.",
		image: {
			src: "images/recipes/coffee/espresso-puck-indent.webp",
			alt: "Espresso puck with an indent from being over filled",
		},
	},
	{
		heading: "",
		text: "Another factor to consider while preparing your coffee is how coarse or fine the grind is. While the exact setting can change between bags, or even over the lifespan of the beans, espresso will generally fall within a narrow range. If you don’t know where to start with your grind, look up the recommended ranges for your grinder and use a setting in the middle of that range. As a note, decaf needs to be ground finer. Over the course of your first bag adjust until you are happy with the output, then use that setting as a starting point for future bags. If you consistently need to adjust in a direction, move your starting point. I find that 1.2.0 on a 1zpresso J-Ultra is a good starting point for caffeinated coffees, and 1.1.5 is a good starting place for decaf.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "The next step is to prepare your puck. I have issues with channeling, the worst of which seem to be a result of unlevel grounds. This solution is to use a distribution tool, of which I like a WDT needle tool. If you need a temporary fix, combing through the puck with a thin metal object works. You just need to be aware it will be: slower, messier, and less effective. Additionally, a dosing funnel significantly cuts down on the mess while you comb through the coffee. After I am satisfied with the distribution, I tap the basket on the counter to settle the ground and tamp. I generally do two tamps for consistency, but if there are uncompacted grounds I will do additional tamps.",
		image: {
			src: "images/recipes/coffee/espresso-puck-prep.webp",
			alt: "Portafilter with ground coffee after WDT and tamp",
		},
	},
	{
		heading: "",
		text: "This section applies to unmodified Gaggia Classic Pros. I only do one ‘hack’ when I’m pulling shots, and find that I can get consistently great tasting coffee. After prepping my puck but before locking it into the machine, I flow water through until the indicator light turns off. Then when the light comes on, I wait 10 seconds. Finally, I turn on the steam mode to increase the temperature for an additional 5 to 10 seconds before starting my shot. I find something around 5 seconds works well for a darker roast and 7 to 9 is a good range for lighter roasts. The first two steps are to get a consistent base temp, and the third step is to get to a desired temperature for a given coffee.",
		image: {
			src: "images/recipes/coffee/espresso-pulling.webp",
			alt: "Espresso machine at the end of a shot",
		},
	},
	{
		heading: "",
		text: "When pulling shots, I rely on an espresso scale for quantitative data points which I later use to improve the coffee. I generally aim for a 1:2 ratio, although I have been letting my light roast shots go longer recently. I find 25 seconds to be a good target time for caffeinated coffee, or around 20 for decaf. If you want the best coffee possible, you should be tasting your espresso, as it will provide the most feedback. The general rule is that if your espresso is too sour, then you should change the variables you can to increase extraction. Similarly, if your espresso is overly bitter and astringent, you should work to lower extraction. Once you are familiar with how a particular batch of beans pulls, you can look at the time and extraction stream as a measure of the shot’s performance.",
		image: {
			src: "images/recipes/coffee/espresso-pulling.webp",
			alt: "Espresso machine at the end of a shot",
		},
	},
	{
		heading: "",
		text: "",
		image: {
			src: "images/recipes/coffee/espresso-thumbnail.webp",
			alt: "Finished espresso, with seltzer water",
		},
	},
	//latte specific step
	{
		heading: "",
		text: "For a latte, I fill my pitcher just below where the spout begins with whole milk that just came out of the refrigerator. I set my pitcher at a slight angle using the spout as a guide, with the steam nozzle right at the surface. Once the milk has been sufficiently aerated, I move the nozzle down to incorporate the air. I know the milk is up to temp when I really don’t want to be holding on to the pitcher anymore, at which point I use a wet rag to clean the tip and purge it into a waste cup. At this point I stir my espresso and pour it into the cup I will be using. Then I start pouring my milk high and slow to mix with the coffee. Nearing the top of the cup, I will pause before bring down my pitcher and start pouring a design.",
		image: {
			src: "images/recipes/coffee/latte-product.webp",
			alt: "Finished Latte",
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
	//pour-over
	{
		heading: "",
		text: "Start by putting water on to boil. I have a ceramic v60 so I leave my dripper to heat on top of the kettle, leaving a plate on top to trap the steam. The temperature I brew at is usually between 190 and 200.",
		image: {
			src: "images/recipes/coffee/pour-over-preheat.webp",
			alt: "Kettle with a V60 preheating on top",
		},
	},
	{
		heading: "",
		text: "I grind 18 grams of coffee. Once everything is prepared, I add the filter to the dripper and wet it. Then I add the grounds and make a divot in the middle.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Finally to brew I aim for about a 1:16.5 ratio, mostly because the numbers work out well. It mostly fills my 12oz cup, and all pour weights are easy to remember. This starts with two 50 gram blooms. This wets the grounds thoroughly and collapses channels. After the blooms, I make two larger 100 gram pours. I level the grounds by swirling the dripper after pouring the second bloom and the second pour.",
		image: {
			src: "images/recipes/coffee/pour-over-bloom.webp",
			alt: "V60 with grounds, durring first bloom",
		},
	},
];

const condenseContent = useCondenseContent();

const expand = useExpand();
</script>
