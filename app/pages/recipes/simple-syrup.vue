<template>
	<div class="gap-y-24 md:gap-y-16">
		<ReturnLink link="/Recipes" location="Recipes" />

		<!--Expanded Image Handling-->
		<ImgExpand
			:src="expand.src"
			:alt="expand.alt"
			:open="expand.open"
			@minimize="minimize"
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

			<!--Recipe Information Block-->
			<div
				class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
			>
				<button
					@click="
						maximize({
							src: '/images/recipes/simple-syrup/ingredients.webp',
							alt: 'playing guitar, credit: John Grubbs rockslidephotography',
						})
					"
					title="Expand Image"
					class="overflow-contain order-2 flex aspect-square items-center md:order-none md:w-5/12"
					v-if="!contentCondensed"
				>
					<NuxtImg
						class="h-full w-full object-cover select-none"
						src="/images/recipes/simple-syrup/ingredients.webp"
						alt="Ingreidents List Reference"
						draggable="false"
					/>
				</button>
				<div class="contents w-full gap-y-8 md:flex md:flex-col">
					<h1 class="text-center text-3xl font-semibold">
						Simple Syrup
					</h1>
					<div class="order-3 flex w-full flex-col gap-2 text-xl">
						<h2 class="text-2xl font-semibold">Ingreidents</h2>
						<span
							class="flex flex-col text-xl"
							v-for="ingredient in ingredients"
							>{{ ingredient.name }} -
							{{ ingredient.measurement }}</span
						>
					</div>
					<div class="order-3 flex w-full flex-col gap-2 text-xl">
						<h2 class="text-2xl font-semibold">Equipment</h2>
						<span
							class="flex flex-col text-xl"
							v-for="piece in equipment"
							>{{ piece }}</span
						>
					</div>
					<div
						class="order-3 flex w-full flex-col gap-2 text-xl"
						v-if="contentCondensed"
					>
						<h2 class="text-2xl font-semibold">Steps</h2>
						<span
							class="flex flex-col text-xl"
							v-for="(step, index) in steps"
							>{{ index + 1 }}. {{ step }}</span
						>
					</div>
				</div>
			</div>
			<div v-if="!contentCondensed" class="contents">
				<!--Article Block Text-->
				<div
					class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
				>
					<h1
						v-if="blocks[0].heading"
						class="text-center text-3xl font-semibold"
					>
						{{ blocks[0].heading }}
					</h1>
					<p class="text-xl">
						{{ blocks[0].text }}
					</p>
				</div>

				<!--Article Block Text & Image 1-->
				<div
					class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
				>
					<button
						@click="maximize(blocks[1].image)"
						title="Expand Image"
						class="order-2 flex items-center md:w-5/12"
						:class="'right' == 'left' ? 'md:order-none' : ''"
					>
						<NuxtImg
							class="h-full w-full object-cover select-none"
							:src="blocks[1].image.src"
							alt="Ingreidents List Reference"
							draggable="false"
						/>
					</button>
					<div class="contents w-7/12 gap-y-4 md:flex md:flex-col">
						<h1
							v-if="blocks[1].heading"
							class="text-center text-3xl font-semibold"
						>
							{{ blocks[1].heading }}
						</h1>
						<p class="order-3 text-xl">
							{{ blocks[1].text }}
						</p>
					</div>
				</div>

				<!--Article Block Text & Image 2-->
				<div
					class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
				>
					<button
						@click="maximize(blocks[2].image)"
						title="Expand Image"
						class="order-2 flex items-center md:w-5/12"
						:class="'left' == 'left' ? 'md:order-none' : ''"
					>
						<NuxtImg
							class="h-full w-full object-cover select-none"
							:src="blocks[2].image.src"
							alt="Ingreidents List Reference"
							draggable="false"
						/>
					</button>
					<div class="contents w-7/12 gap-y-4 md:flex md:flex-col">
						<h1
							v-if="blocks[2].heading"
							class="text-center text-3xl font-semibold"
						>
							{{ blocks[2].heading }}
						</h1>
						<p class="order-3 text-xl">
							{{ blocks[2].text }}
						</p>
					</div>
				</div>

				<!--Article Block Image-->
				<!--
				<div
					class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
				>
					<h1
						v-if="blocks[2].heading"
						class="text-center text-3xl font-semibold"
					>
						{{ blocks[2].heading }}
					</h1>
					<button
						@click="maximize(blocks[2].image)"
						title="Expand Image"
						class="flex items-center"
					>
						<NuxtImg
							class="h-full w-full object-cover select-none"
							:src="blocks[2].image.src"
							alt="Ingreidents List Reference"
							draggable="false"
						/>
					</button>
				</div>
                -->
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
const steps = [
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

const expand = reactive({
	src: "",
	alt: "",
	open: false,
});
function minimize() {
	expand.open = false;
}
function maximize(image) {
	expand.src = image.src;
	expand.alt = image.alt;
	expand.open = true;
}
</script>
