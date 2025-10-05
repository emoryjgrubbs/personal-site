<template>
	<div>
		<ReturnLink link="/" location="Home" />

		<div
			class="mx-16 my-16 mt-40 flex flex-col gap-8 md:mx-14 lg:mx-24 xl:mx-48"
		>
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

			<!--Expanded Image Handling-->
			<ImgExpand
				:src="expand.src"
				:alt="expand.alt"
				:open="expand.open"
				@minimize="useMinimize"
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
				hydrate-on-visible
			>
				<div
					v-for="image in filteredElements"
					class="flex items-center select-none"
					:class="
						showDetails
							? 'gap-6 max-xl:flex max-xl:flex-col md:gap-12'
							: 'aspect-square overflow-hidden'
					"
				>
					<button
						@click="useMaximize(image)"
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
						<h1 v-if="image.title == ''" class="text-2xl">No Title</h1>
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
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const images = [
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-27", end: "2025-07-27" }],
		src: "/images/gallery/00013-moving-day/7-moab-to-salt-lake-city/8K8A2836.webp",
		alt: "Picture of a group at the Scenic Mound from Ensign Peak Trail",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-27", end: "2025-07-27" }],
		src: "/images/gallery/00013-moving-day/7-moab-to-salt-lake-city/8K8A2834.webp",
		alt: "View of Salt Lake City from Ensign Peak Trail",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-27", end: "2025-07-27" }],
		src: "/images/gallery/00013-moving-day/7-moab-to-salt-lake-city/8K8A2785.webp",
		alt: "View of a Radio station north of Ensign Peak",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-27", end: "2025-07-27" }],
		src: "/images/gallery/00013-moving-day/7-moab-to-salt-lake-city/8K8A2706.webp",
		alt: "View of the canyons at Dead Horse Point",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-26", end: "2025-07-26" }],
		src: "/images/gallery/00013-moving-day/6-los-alamos-to-moab/8K8A2060.webp",
		alt: "View of Ute Mountain in South West Colorado",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-26", end: "2025-07-26" }],
		src: "/images/gallery/00013-moving-day/6-los-alamos-to-moab/8K8A1998.webp",
		alt: "View of the Abiquiu Reservoir",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-23", end: "2025-07-23" }],
		src: "/images/gallery/00013-moving-day/3-tooling-around-los-alamos/8K8A1795.webp",
		alt: "View of the San Jaun Mountains north of Los Alamos",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-22", end: "2025-07-22" }],
		src: "/images/gallery/00013-moving-day/2-tucumcari-to-los-alamos/8K8A1786.webp",
		alt: "Looking back towards the Blue Dot Trailhead at the White Rock Overlook",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-22", end: "2025-07-22" }],
		src: "/images/gallery/00013-moving-day/2-tucumcari-to-los-alamos/8K8A1778.webp",
		alt: "View of the Rio Grande valley from the White Rock Overlook",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-21", end: "2025-07-21" }],
		src: "/images/gallery/00013-moving-day/1-dallas-to-tucumcari/8K8A1656.webp",
		alt: "Fireworks launching at Cadillac Ranch",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-21", end: "2025-07-21" }],
		src: "/images/gallery/00013-moving-day/1-dallas-to-tucumcari/8K8A1600.webp",
		alt: "Kids lighting off fireworks at Cadillac Ranch",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-21", end: "2025-07-21" }],
		src: "/images/gallery/00013-moving-day/1-dallas-to-tucumcari/8K8A1591.webp",
		alt: "Fireworks in the black sky above Cadillac Ranch",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-10", end: "2025-07-10" }],
		src: "/images/gallery/00012-last-visits/8K8A1381.webp",
		alt: "Dirty kayaks in a White Rock Lake boat house",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-10", end: "2025-07-10" }],
		src: "/images/gallery/00012-last-visits/8K8A1292.webp",
		alt: "Lights on in the halls of an empty UTD building",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-10", end: "2025-07-10" }],
		src: "/images/gallery/00012-last-visits/8K8A1246.webp",
		alt: "The UTD Science Learning Center as seen by night",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-09", end: "2025-07-09" }],
		src: "/images/gallery/00012-last-visits/8K8A1143.webp",
		alt: "An empty gas station sits lit up in front of a black void",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-07-07", end: "2025-07-07" }],
		src: "/images/gallery/00012-last-visits/8K8A1099.webp",
		alt: "A flock of birds sit silhouetted in a barren tree",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-06-26", end: "2025-06-26" }],
		src: "/images/gallery/00011-utd-campus/8K8A0950.webp",
		alt: "The sky is imperfectly reflected off a window",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-06-26", end: "2025-06-26" }],
		src: "/images/gallery/00011-utd-campus/8K8A0852.webp",
		alt: "A plane flys above the clouds",
	},
	{
		title: "Deck of the Bainbridge",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-15", end: "2025-01-15" }],
		src: "/images/gallery/00004-seattle-w24/8-west-of-seattle/deck-of-the-bainbridge.webp",
		alt: "The empty deck of a ferry in winter",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-15", end: "2025-01-15" }],
		src: "/images/gallery/00004-seattle-w24/8-west-of-seattle/8K8A0034.webp",
		alt: "Several Birds fly over a view of The Sound, with a ferry in the background",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-12", end: "2025-01-12" }],
		src: "/images/gallery/00004-seattle-w24/5-vancuver/8K8A9494.webp",
		alt: "A vancuver street full of cars with neon dragon signs and christmas lights",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-12", end: "2025-01-12" }],
		src: "/images/gallery/00004-seattle-w24/5-vancuver/8K8A9467.webp",
		alt: "An empty area of Vancuver's China Town after the rain",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-10", end: "2025-01-10" }],
		src: "/images/gallery/00004-seattle-w24/3-downtown-seattle-day-3/8K8A8745.webp",
		alt: "A construction blocks the bike path in front of the Seattle Ferry Terminal",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-10", end: "2025-01-10" }],
		src: "/images/gallery/00004-seattle-w24/3-downtown-seattle-day-3/8K8A8210.webp",
		alt: "A lone bird flys into dark clouds of sunset",
	},
	{
		title: "Day on the Beach",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-10", end: "2025-01-10" }],
		src: "/images/gallery/00004-seattle-w24/3-downtown-seattle-day-3/day-on-the-beach.webp",
		alt: "A lone person sits, bundled up, on a log at a Seattle beach",
	},
    {
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-09", end: "2025-01-09" }],
		src: "/images/gallery/00004-seattle-w24/2-down-town-seattle-day-2/8K8A8007.webp",
		alt: "People walk near Pike Place Market",
	},
    {
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-09", end: "2025-01-09" }],
		src: "/images/gallery/00004-seattle-w24/2-down-town-seattle-day-2/8K8A7999.webp",
		alt: "An elderly couple embrace in the neon lights of Pike Place Market",
	},
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-09", end: "2025-01-09" }],
		src: "/images/gallery/00004-seattle-w24/2-down-town-seattle-day-2/8K8A7975.webp",
		alt: "A ventalation system a piece of a pier appear in front of the mountains across The Sound",
	},
	{
		title: "More Shops",
		tags: [
			"",
		],
		dates: [{ start: "2025-01-09", end: "2025-01-09" }],
		src: "/images/gallery/00004-seattle-w24/2-down-town-seattle-day-2/more-shops.webp",
		alt: "A man walks down the stairs away from a sign advertising More Shops at Pike Place Market",
	},
];
/* gallery image object
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "YYYY-MM-DD", end: "YYYY-MM-DD" }],
		src: "/images/gallery/.../.webp",
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
