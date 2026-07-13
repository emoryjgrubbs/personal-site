<template>
	<div>
		<!--Expanded Image Handling-->
		<ImgExpand
			:src="expand.src"
			:alt="expand.alt"
			:open="expand.open"
			@minimize="useMinimize"
		/>

		<div class="mx-16 my-16 flex flex-col md:mx-14 lg:mx-24 xl:mx-48">
			<!--Search Component-->
			<CombiFilter
				:content="images"
				:tagList="tagList"
				placeholder="Gallery Image"
				@searchUpdate="
					(filterUpdate) => useUpdateElements(filterUpdate)
				"
				class="sm:mb-10"
				:ref="useSelectedTags()"
			/>

			<!--Button for toggling Image Details-->
			<div class="flex w-full justify-end">
				<button
					class="flex w-fit cursor-pointer flex-row items-center gap-2 text-lg transition ease-in-out hover:scale-102 sm:text-xl"
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
			<div
				class="grid"
				:class="
					showDetails
						? 'grid-cols-1 gap-12'
						: 'grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5'
				"
				hydrate-on-visible
			>
				<div
					v-for="image in filteredElements"
					class="flex items-center select-none"
					:class="
						showDetails
							? 'flex flex-col gap-6 md:flex-row md:gap-12'
							: 'aspect-square overflow-hidden'
					"
				>
					<button
						@click="useMaximize(image)"
						title="Expand Image"
						class="h-full cursor-pointer"
						:class="showDetails ? 'w-full lg:w-5/12' : 'w-full'"
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
						class="flex flex-col gap-3 text-xl"
						:class="showDetails ? 'w-full lg:w-7/12' : 'w-full'"
						v-if="showDetails"
					>
						<h1 v-if="image.title == ''" class="text-2xl">
							Untitled
						</h1>
						<h1 v-else class="text-2xl">{{ image.title }}</h1>
						<div>Date: {{ image.dates[0].start }}</div>
						<div class="flex flex-row flex-wrap gap-3">
							Tags:
							<div
								v-for="tag in image.tags"
								class="bg-columbia-blue cursor-pointer rounded-md px-3 capitalize"
								@click="useClickedTag(tag)"
								title="Add Tag to Filter"
							>
								{{ tag }}
							</div>
						</div>
					</div>
				</div>
				<!--flickr-link-->
				<div
					class="group relative flex cursor-pointer items-center select-none"
					:class="showDetails ? '' : 'aspect-square overflow-hidden'"
				>
					<NuxtLink
						title="Navigate To Flickr"
						class="h-full w-full"
						to="https://www.flickr.com/photos/emorygrubbs/"
						external
						target="_blank"
						draggable="false"
					>
						<NuxtImg
							class="h-full w-full cursor-pointer object-cover select-none"
							src="/images/gallery/flickr-teaser.webp"
							alt="Photo of Pike Place Market"
							draggable="false"
						/>
						<div
							class="group-hover:text-columbia-blue group-hover-transition absolute top-0 flex h-full w-full cursor-pointer justify-center text-white backdrop-blur-sm duration-300 ease-in-out group-hover:backdrop-blur-none lg:backdrop-blur-md"
						>
							<div
								class="flex w-48 justify-evenly self-center rounded-lg py-2 text-center text-3xl font-semibold duration-300 ease-in-out group-hover:scale-125 group-hover:transition"
							>
								More
								<Icon
									name="famicons:caret-forward"
									class="self-center"
								/>
							</div>
						</div>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const images = [
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"outdoors",
			//subject
			"human",
			"person",
			"railing",
			"street",
			"car",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//lens
			"ef 50mm",
			//format
			"fullframe",
			"digital",
			//
			"color",
		],
		dates: [{ start: "2026-04-08", end: "2026-04-08" }],
		src: "/images/gallery/8K8A7883.webp",
		alt: "A man sitting on a curb, framed by a metal railing",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"pocket beach",
			"outdoors",
			//subject
			"mountain",
			"water",
			"beach",
			"sky",
			"human",
			"person",
			//temporal
			"sunset",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fl 55mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"kodak",
			"portra 400",
			//
			"color",
		],
		dates: [{ start: "2026-03-26", end: "2026-03-26" }],
		src: "/images/gallery/Grubbs6_Grubbs6-R1-E020.webp",
		alt: "View of the Olympic Mountains from Seattle's Pocket Beach",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"central library",
			"indoors",
			//subject
			"library",
			"window",
			"light",
			"book",
			"tree",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fl 55mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"kodak",
			"portra 400",
			//
			"color",
		],
		dates: [{ start: "2026-03-26", end: "2026-03-26" }],
		src: "/images/gallery/GrubbsBW199589-R1-E001.webp",
		alt: "View out of Seattle's Central Library",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"pike place market",
			"indoors",
			//subject
			"human",
			"person",
			"light",
			"neon",
			"drink",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fl 55mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"kodak",
			"portra 400",
			//
			"color",
		],
		dates: [{ start: "2026-03-26", end: "2026-03-26" }],
		src: "/images/gallery/Grubbs6_Grubbs6-R1-E030.webp",
		alt: "A man orders take out from Pike Place Chinese Cuisine",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"pike place market",
			"indoors",
			//subject
			"human",
			"person",
			"group",
			"light",
			"neon",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fl 55mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"kodak",
			"portra 400",
			//
			"color",
		],
		dates: [{ start: "2026-03-26", end: "2026-03-26" }],
		src: "/images/gallery/Grubbs6_Grubbs6-R1-E028.webp",
		alt: "People navigating Pike Place Market",
	},
	{
		title: "Spring",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"university of washington",
			"outdoors",
			//subject
			"human",
			"person",
			"group",
			"tree",
			//temporal
			"day",
			"spring",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fl 55mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"kodak",
			"portra 400",
			//
			"color",
		],
		dates: [{ start: "2026-03-26", end: "2026-03-26" }],
		src: "/images/gallery/spring.webp",
		alt: "Cherry blossoms on the UW campus",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"california",
			"san fransisco",
			"financial district",
			"outdoors",
			//subject
			"human",
			"person",
			"building",
			"car",
			"street",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"ilford",
			"hp5+",
			//
			"b&k",
			"black & white",
			"black and white",
		],
		dates: [{ start: "2026-02-09", end: "2026-02-09" }],
		src: "/images/gallery/GrubbsBW199589-R1-E020.webp",
		alt: "Brutalist parking structure at Three Embarcadero Center",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"california",
			"san fransisco",
			"financial district",
			"outdoors",
			//subject
			"human",
			"person",
			"group",
			"building",
			"light",
			"neon",
			"street",
			"car",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"ilford",
			"hp5+",
			//
			"b&k",
			"black & white",
			"black and white",
		],
		dates: [{ start: "2026-02-09", end: "2026-02-09" }],
		src: "/images/gallery/GrubbsBW199589-R1-E019.webp",
		alt: "Canyonous financial district street, with lights strong between the buildings",
	},
	{
		title: "Roses",
		tags: [
			//location
			"usa",
			"united states",
			"california",
			"san fransisco",
			"sunset district",
			"outdoors",
			//subject
			"sign",
			"fog",
			"flower",
			"power line",
			"street",
			"building",
			//temporal
			"dusk",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"ilford",
			"hp5+",
			//
			"b&k",
			"black & white",
			"black and white",
		],
		dates: [{ start: "2026-02-08", end: "2026-02-08" }],
		src: "/images/gallery/roses.webp",
		alt: "Flowers on a foggy day",
	},
	{
		title: "Simple Life",
		tags: [
			//location
			"usa",
			"united states",
			"california",
			"san fransisco",
			"nob hill",
			"outdoors",
			//subject
			"security door",
			"art",
			"painting",
			"tile",
			"building",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"fuji",
			"fujifilm",
			"400",
			//
			"color",
		],
		dates: [{ start: "2026-02-07", end: "2026-02-07" }],
		src: "/images/gallery/simple-life.webp",
		alt: "A record player and bottle of water are locked in a mid-century modern living room",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"california",
			"san fransisco",
			"chinatown",
			"outdoors",
			//subject
			"human",
			"person",
			"group",
			"building",
			"market",
			"food",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"fuji",
			"fujifilm",
			"400",
			//
			"color",
		],
		dates: [{ start: "2026-02-07", end: "2026-02-07" }],
		src: "/images/gallery/GrubbsColo199581-R1-021-9.webp",
		alt: "People buying produce at Chung Hing Produce Co",
	},
	{
		title: "Northwest Automotive",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"lake city",
			"outdoors",
			//subject
			"car",
			"cadillac",
			"sign",
			"building",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"ae-1 program",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"ilford",
			"hp5+",
			//
			"b&k",
			"black & white",
			"black and white",
		],
		dates: [{ start: "2026-01-12", end: "2026-01-12" }],
		src: "/images/gallery/northwest-automotive.webp",
		alt: "The back quarter of a vintage Cadillac",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"ballard locks",
			"outdoors",
			//subject
			"animal",
			"bird",
			"gull",
			"locks",
			"water",
			"building",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"ae-1 program",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"ilford",
			"hp5+",
			//
			"b&k",
			"black & white",
			"black and white",
		],
		dates: [{ start: "2025-12-30", end: "2025-12-30" }],
		src: "/images/gallery/Grubbs199012-R1-E020.webp",
		alt: "A seagull sits on a railing, at the Ballard Locks",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"bainbridge island",
			"outdoors",
			//subject
			"building",
			"church",
			"sky",
			"cloud",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"ae-1 program",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"ilford",
			"hp5+",
			//
			"b&k",
			"black & white",
			"black and white",
		],
		dates: [{ start: "2025-12-27", end: "2025-12-27" }],
		src: "/images/gallery/Grubbs199012-R1-E022.webp",
		alt: "Eagle Harbor Congregational Church",
	},
	{
		title: "Flood",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"renton",
			"cedar river",
			"outdoors",
			//subject
			"water",
			"sign",
			"bench",
			"tree",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"ae-1 program",
			//lens
			"fd 50mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"ilford",
			"hp5+",
			//
			"b&k",
			"black & white",
			"black and white",
		],
		dates: [{ start: "2025-12-21", end: "2025-12-21" }],
		src: "/images/gallery/flood.webp",
		alt: "Flooded walkway along the Cedar River, with a sign for bicyclists to dismount",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"austin",
			"outdoors",
			//subject
			"skyline",
			"building",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fl 55mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"kodak",
			"portra 400",
			//
			"color",
		],
		dates: [{ start: "2025-12-01", end: "2025-12-01" }],
		src: "/images/gallery/000065510032.webp",
		alt: "Austin skyline, seen from the pedestrian bridge at night",
	},
	{
		title: "Town Lake",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"austin",
			"town lake",
			"lady bird lake",
			"outdoors",
			//subject
			"building",
			"water",
			"tree",
			//temporal
			"day",
			"fall",
			"autumn",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fl 55mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"kodak",
			"portra 400",
			//
			"color",
			"reflection",
		],
		dates: [{ start: "2025-11-26", end: "2025-11-26" }],
		src: "/images/gallery/town-lake.webp",
		alt: "The Austin skyline is reflected in the water of Town Lake",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"austin",
			"town lake",
			"lady bird lake",
			"outdoors",
			//subject
			"human",
			"person",
			"kayak",
			"bridge",
			"water",
			//temporal
			"day",
			"fall",
			"autumn",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//lens
			"fl 55mm",
			//format
			"35mm",
			"fullframe",
			"film",
			"kodak",
			"portra 400",
			//
			"color",
		],
		dates: [{ start: "2025-11-26", end: "2025-11-26" }],
		src: "/images/gallery/000079540011.webp",
		alt: "A lone kayaker is framed by the spans of the Lamar Bridge",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"snoqualmie",
			"north bend",
			"reinig bridge",
			"outdoors",
			//subject
			"mountain",
			"tree",
			"water",
			//temporal
			"fall",
			"autumn",
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//lens
			"ef 24-70mm",
			//format
			"fullframe",
			"digital",
			//
			"color",
		],
		dates: [{ start: "2005-10-16", end: "2005-10-16" }],
		src: "/images/gallery/8K8A4926.webp",
		alt: "Little Si Peak seen through the trees around Reinig Bridge",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"mount rainer national park",
			"outdoors",
			//subject
			"human",
			"person",
			"tree",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//lens
			"ef 24-70mm",
			//format
			"fullframe",
			"digital",
			//
			"color",
			"silhouette",
		],
		dates: [{ start: "2025-10-14", end: "2025-10-14" }],
		src: "/images/gallery/8K8A4646.webp",
		alt: "A silhouetted figure illuminating the forest in front of them",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"colorado",
			"outdoors",
			//subject
			"mountain",
			"tree",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//lens
			"ef 70-300mm",
			//format
			"fullframe",
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-07-26", end: "2025-07-26" }],
		src: "/images/gallery/8K8A2060.webp",
		alt: "View of Ute Mountain in South West Colorado",
	},
	{
		title: "Day on the Beach",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"seattle",
			"golden gardens park",
			"outdoors",
			//subject
			"human",
			"person",
			"beach",
			"water",
			//temporal
			"winter",
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//lens
			"ef 50mm",
			//format
			"fullframe",
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-01-10", end: "2025-01-10" }],
		src: "/images/gallery/day-on-the-beach.webp",
		alt: "A lone person sits, bundled up, on a log at a Seattle beach",
	},
];
/* gallery image object
	{
		title: "",
		tags: [
            //location
            //subject
            //temporal
            //camera
                //make
                //model
                //
            //make
            //model
            //lens
            //
		],
		dates: [{ start: "YYYY-MM-DD", end: "YYYY-MM-DD" }],
		src: "/images/gallery/.webp",
		alt: "",
	},
*/

const expand = useExpand();

const showDetails = useState("showImageDetails", () => false);
function toggleDetails() {
	showDetails.value = !showDetails.value;
	console.log("showDetails toggled to: " + showDetails.value);
}

const tagList = useTagList(images);
const filteredElements = useFilteredElements(images);
</script>
