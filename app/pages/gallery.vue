<template>
	<div>
		<HomeLink />

		<div class="mx-16 my-16 mt-40 flex flex-col md:mx-14 lg:mx-20">
			<CombiFilter
				:content="images"
				placeholder="Gallery Image"
				@searchUpdate="(filterUpdate) => updateDisplay(filterUpdate)"
				class="mb-10"
			/>
			<div class="flex w-full justify-end">
				<button
					class="flex w-fit cursor-pointer flex-row items-center gap-2 text-xl"
					@click="toggleDetails"
				>
					<Icon
						v-if="showDetails"
						name="famicons:radio-button-on"
						class=""
					/>
					<Icon v-else name="famicons:radio-button-off" class="" />
					Details
				</button>
			</div>

			<div class="grid grid-cols-5 gap-3" v-if="!showDetails">
				<div v-for="image in filteredImages">
					<ImgWrap
						:src="image.src"
						:alt="image.alt"
						:crop="!showDetails"
					/>
				</div>
			</div>
			<div class="grid grid-cols-1 gap-12" v-else>
				<div v-for="image in filteredImages">
					<div class="flex w-full flex-row gap-12">
						<div class="w-3/8">
							<ImgWrap
								:src="image.src"
								:alt="image.alt"
								:crop="!showDetails"
							/>
						</div>
						<div class="flex w-full flex-col gap-3 text-xl">
							<h1 class="text-2xl">Title: {{ image.title }}</h1>
							<div>Date: {{ image.dates[0].start }}</div>
							<div class="flex flex-row flex-wrap gap-3">
								Tags:
								<div
									v-for="tag in image.tags"
									class="bg-columbia-blue rounded-md px-3"
								>
									{{ tag }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const showDetails = ref(false);
function toggleDetails() {
	showDetails.value = !showDetails.value;
}

const images = [
	{
		title: "Seattle Fairy 1",
		tags: [
			"seattle",
			"washington",
			"night",
			"water",
			"sound",
			"fairy",
			"color",
		],
		dates: [{ start: "2025-01-15", end: "2025-01-15" }],
		src: "/images/test-img/boat-color.webp",
		alt: "",
	},
	{
		title: "Seattle Fairy 2",
		tags: [
			"seattle",
			"washington",
			"night",
			"water",
			"sound",
			"fairy",
			"desaturated",
			"color",
		],
		dates: [{ start: "2025-01-15", end: "2025-01-15" }],
		src: "/images/test-img/boat-desat.webp",
		alt: "",
	},
	{
		title: "Window Reflection Abjuration",
		tags: [
			"dallas",
			"texas",
			"utd",
			"university",
			"chromatic abjuration",
			"reflection",
			"color",
		],
		dates: [{ start: "2025-06-26", end: "2025-06-26" }],
		src: "/images/test-img/window-reflec.webp",
		alt: "",
	},
	{
		title: "Cloud in Plant Pot",
		tags: ["austin", "texas", "cloud", "animal", "cat", "pet", "color"],
		dates: [{ start: "2025-07-03", end: "2025-07-03" }],
		src: "/images/test-img/cloud.webp",
		alt: "",
	},
	{
		title: "Bird Silhouette",
		tags: [
			"austin",
			"texas",
			"animal",
			"bird",
			"birds",
			"sky",
			"black and white",
			"black & white",
			"b&k",
		],
		dates: [{ start: "2025-07-07", end: "2025-07-07" }],
		src: "/images/test-img/bird-sil.webp",
		alt: "",
	},
	{
		title: "Liminal Gas Station (Narrow)",
		tags: [
			"lorena",
			"texas",
			"gas",
			"gas station",
			"liminal",
			"night",
			"color",
		],
		dates: [{ start: "2025-07-09", end: "2025-07-09" }],
		src: "/images/test-img/gas-narrow.webp",
		alt: "",
	},
	{
		title: "Liminal Gas Station (Wide)",
		tags: [
			"lorena",
			"texas",
			"gas",
			"gas station",
			"liminal",
			"night",
			"color",
		],
		dates: [{ start: "2025-07-09", end: "2025-07-09" }],
		src: "/images/test-img/gas-wide.webp",
		alt: "",
	},
	{
		title: "UTD Sciences at Night",
		tags: ["dallas", "texas", "utd", "university", "night", "color"],
		dates: [{ start: "2025-07-10", end: "2025-07-10" }],
		src: "/images/test-img/sci-build.webp",
		alt: "",
	},
	{
		title: "Empty Chairs of a School at Night",
		tags: ["dallas", "texas", "utd", "university", "night", "color"],
		dates: [{ start: "2025-07-10", end: "2025-07-10" }],
		src: "/images/test-img/empty-chairs.webp",
		alt: "",
	},
	{
		title: "More Shops Below (Color)",
		tags: [
			"seattle",
			"washington",
			"people",
			"pike place",
			"pike place market",
			"market",
			"indoors",
			"night",
			"color",
		],
		dates: [{ start: "2025-01-09", end: "2025-01-09" }],
		src: "/images/test-img/more-down-color.webp",
		alt: "",
	},
	{
		title: "More Shops Below (Black & White)",
		tags: [
			"seattle",
			"washington",
			"people",
			"pike place",
			"pike place market",
			"market",
			"indoors",
			"night",
			"black and white",
			"black & white",
			"b&k",
		],
		dates: [{ start: "2025-01-09", end: "2025-01-09" }],
		src: "/images/test-img/more-down-b&k.webp",
		alt: "",
	},
	{
		title: "Vancuver Chinatown at Night",
		tags: [
			"vancuver",
			"bc",
			"british columbia",
			"night",
			"color",
			"neon",
			"neon sign",
			"wet",
			"chinatown",
		],
		dates: [{ start: "2025-01-12", end: "2025-01-12" }],
		src: "/images/test-img/chinatown-empty.webp",
		alt: "",
	},
	{
		title: "Lights of Downtown Vancuver",
		tags: [
			"vancuver",
			"bc",
			"british columbia",
			"night",
			"color",
			"neon",
			"neon sign",
			"wet",
			"chinatown",
		],
		dates: [{ start: "2025-01-12", end: "2025-01-12" }],
		src: "/images/test-img/chinatown-cars.webp",
		alt: "",
	},
];

const filteredImages = ref(images);

function updateDisplay(filterUpdate) {
	filteredImages.value = filterUpdate;
}
</script>
