<template>
	<div>
		<ReturnLink link="/" location="Home" />

		<div
			class="mx-16 my-16 mt-40 flex flex-col md:mx-14 gap-8 lg:mx-24 xl:mx-48"
		>
			<!--Search Component-->
			<CombiFilter
				:content="images"
				:tagList="tagList"
				placeholder="Gallery Image"
				@searchUpdate="(filterUpdate) => updateDisplay(filterUpdate)"
				class="sm:mb-10"
				ref="filter"
			/>

			<!--Button for toggling Image Details-->
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
					Details
				</button>
			</div>

			<!--Expanded Image Handling-->
			<ImgExpand
				:src="expand.src"
				:alt="expand.alt"
				:open="expand.open"
				@minimize="minimize"
			/>

			<!--Top Gallery-->

			<!--Image Grid-->
			<div
				class="grid"
				:class="
					showDetails
						? 'grid-cols-1 gap-12'
						: 'grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5'
				"
			>
				<div
					v-for="image in filteredImages"
					class="flex items-center select-none"
					:class="
						showDetails
							? 'gap-6 max-xl:flex max-xl:flex-col md:gap-12'
							: 'aspect-square overflow-hidden'
					"
				>
					<button
						@click="maximize(image)"
						title="Expand Image"
						class="h-full cursor-pointer"
						:class="showDetails ? 'xl:w-3/8' : 'w-full'"
					>
						<NuxtImg
							class="h-full w-full cursor-pointer object-cover select-none"
							:src="image.src"
							:alt="image.alt"
							loading="lazy"
							draggable="false"
						/>
					</button>
					<div
						class="flex w-full flex-col gap-3 text-xl"
						v-if="showDetails"
					>
						<h1 class="text-2xl">Title: {{ image.title }}</h1>
						<div>Date: {{ image.dates[0].start }}</div>
						<div class="flex flex-row flex-wrap gap-3">
							Tags:
							<div
								v-for="tag in image.tags"
								class="bg-columbia-blue cursor-pointer rounded-md px-3 capitalize"
								@click="addClickedTag(tag)"
								title="Add Tag to Filter"
							>
								{{ tag }}
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

const images = [
	{
		title: "Seattle Ferry 1",
		tags: [
			"seattle",
			"washington",
			"night",
			"water",
			"sound",
			"ferry",
			"color",
		],
		dates: [{ start: "2025-01-15", end: "2025-01-15" }],
		src: "/images/test-img/boat-color.webp",
		alt: "",
	},
	{
		title: "Seattle Ferry 2",
		tags: [
			"seattle",
			"washington",
			"night",
			"water",
			"sound",
			"ferry",
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

function computeTagList() {
	let list = [];
	for (const image of images) {
		list.push(...image.tags);
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

const filteredImages = ref(images);

function updateDisplay(filterUpdate) {
	filteredImages.value = filterUpdate;
}
</script>
