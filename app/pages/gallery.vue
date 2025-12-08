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
							No Title
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
			//format
			"film",
			"35mm",
			//
			"color",
		],
		dates: [{ start: "2025-12-01", end: "2025-12-01" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/2-roll-2-enchanted-rock-coffee-downtown/000065510032.webp",
		alt: "Austin skyline, seen from the pedestrian bridge at night",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"austin",
			"pease park",
			"outdoors",
			//subject
			"treehouse",
			"metal",
			"wire",
			//temporal
			"day",
			"fall",
			"autumn",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//format
			"film",
			"35mm",
			//
			"color",
		],
		dates: [{ start: "2025-12-01", end: "2025-12-01" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/2-roll-2-enchanted-rock-coffee-downtown/000065510023.webp",
		alt: "An upward view of the Pease Park treehouse bars, on an overcast day",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"enchanted rock",
			"outdoors",
			//subject
			"boulder",
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
			//format
			"film",
			"35mm",
			//
			"color",
		],
		dates: [{ start: "2025-11-30", end: "2025-11-30" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/2-roll-2-enchanted-rock-coffee-downtown/000065510014.webp",
		alt: "Westward view of trees and boulders at The Enchanted Rock State Park",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"enchanted rock",
			"outdoors",
			//subject
			"human",
			"person",
			"group",
			//temporal
			"day",
			"fall",
			"autumn",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//format
			"film",
			"35mm",
			//
			"color",
		],
		dates: [{ start: "2025-11-30", end: "2025-11-30" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/2-roll-2-enchanted-rock-coffee-downtown/000065510005.webp",
		alt: "Three people standing atop Enchanted Rock, on an overcast day",
	},
	{
		title: "Thanksgiving",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"austin",
			"outdoors",
			//subject
			"sky",
			"cloud",
			"tree",
			//temporal
			"day",
			"sunset",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//format
			"film",
			"35mm",
			//
			"color",
			"silhouette",
		],
		dates: [{ start: "2025-11-27", end: "2025-11-27" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/1-roll-1-coffee-lake-thanksgiving/thanksgiving.webp",
		alt: "Dark clouds in the sky on Thanksgiving",
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
			"group",
			"kayak",
			"skyline",
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
			//format
			"film",
			"35mm",
			//
			"color",
			"reflection",
		],
		dates: [{ start: "2025-11-26", end: "2025-11-26" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/1-roll-1-coffee-lake-thanksgiving/000079540021.webp",
		alt: "Kayakers in Town Lake, with the Austin skyline behind them",
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
			//format
			"film",
			"35mm",
			//
			"color",
			"reflection",
		],
		dates: [{ start: "2025-11-26", end: "2025-11-26" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/1-roll-1-coffee-lake-thanksgiving/town-lake.webp",
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
			"outdoors",
			//subject
			"bridge",
			"lamp post",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//format
			"film",
			"35mm",
			//
			"color",
		],
		dates: [{ start: "2025-11-26", end: "2025-11-26" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/1-roll-1-coffee-lake-thanksgiving/000079540012.webp",
		alt: "The ivy covered ramp to the Pfluger Pedestrian Bridge",
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
			//format
			"film",
			"35mm",
			//
			"color",
		],
		dates: [{ start: "2025-11-26", end: "2025-11-26" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/1-roll-1-coffee-lake-thanksgiving/000079540011.webp",
		alt: "A lone kayaker is framed by the spans of the Lamar Bridge",
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
			"truck",
			"kei truck",
			"suzuki",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"f-1",
			//format
			"film",
			"35mm",
			//
			"color",
		],
		dates: [{ start: "2025-11-26", end: "2025-11-26" }],
		src: "/images/gallery/00021-thanksgiving-in-austin/1-roll-1-coffee-lake-thanksgiving/000079540003.webp",
		alt: "The front right side of a Suzuki kei truck",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"lake crescent",
			"outdoors",
			//subject
			"mountain",
			"fog",
			"dock",
			"water",
			"tree",
			//temporal
			"fall",
			"autumn",
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-30", end: "2025-10-30" }],
		src: "/images/gallery/00020-a-day-at-the-beach/8K8A5391.webp",
		alt: "Small dock on the western side of Lake Crescent",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"sequim",
			"outdoors",
			//subject
			"mountain",
			"tree",
			//temporal
			"fall",
			"autumn",
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-30", end: "2025-10-30" }],
		src: "/images/gallery/00020-a-day-at-the-beach/8K8A5327.webp",
		alt: "Olimpic Mountains seen from the north",
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
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2005-10-16", end: "2005-10-16" }],
		src: "/images/gallery/00017-rayin-around/5-twin-peaks/8K8A4926.webp",
		alt: "Little Si Peak seen through the trees around Reinig Bridge",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"the sound",
			"outdoors",
			//subject
			"boat",
			"animal",
			"bird",
			"gull",
			"water",
			//temporal
			"day",
			"sunset",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-15", end: "2025-10-15" }],
		src: "/images/gallery/00017-rayin-around/4-wine-and-fish/8K8A4772.webp",
		alt: "A bird and a sail boat in the Sound",
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
			"the sound",
			"outdoors",
			//subject
			"skyline",
			"building",
			"ferris wheel",
			"pier",
			"water",
			//temporal
			"day",
			"sunset",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-15", end: "2025-10-15" }],
		src: "/images/gallery/00017-rayin-around/4-wine-and-fish/8K8A4688.webp",
		alt: "Downtown Seattle, as seen from the Sound",
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
			//format
			"digital",
			//
			"color",
			"silhouette",
		],
		dates: [{ start: "2025-10-14", end: "2025-10-14" }],
		src: "/images/gallery/00017-rayin-around/3-rainer-falls-hike/8K8A4646.webp",
		alt: "A silhouetted figure illuminating the forest in front of them",
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
			"mountain",
			//temporal
			"night",
			"dusk",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"b&k",
			"black & white",
			"black and white",
			"silhouette",
		],
		dates: [{ start: "2025-10-14", end: "2025-10-14" }],
		src: "/images/gallery/00017-rayin-around/3-rainer-falls-hike/8K8A4606.webp",
		alt: "Mount Rainer at dusk",
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
			"mountain",
			"tree",
			"river bed",
			//temporal
			"fall",
			"autumn",
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-14", end: "2025-10-14" }],
		src: "/images/gallery/00017-rayin-around/3-rainer-falls-hike/8K8A4359.webp",
		alt: "View out of the trees at Rainer National Park",
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
			"olympic sculpture park",
			"outdoors",
			//subject
			"mountain",
			"building",
			"street",
			//temporal
			"fall",
			"autumn",
			"day",
			"sunset",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-13", end: "2025-10-13" }],
		src: "/images/gallery/00017-rayin-around/2-downtown-before-concert/8K8A4118.webp",
		alt: "View of Mount Rainer past downtown seattle, as seen from Olympic Sculpture Park",
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
			"outdoors",
			//subject
			"mountain",
			"street",
			"ferris wheel",
			"human",
			"person",
			"group",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-13", end: "2025-10-13" }],
		src: "/images/gallery/00017-rayin-around/2-downtown-before-concert/8K8A4068.webp",
		alt: "View of Mount Rainer past downtown seattle, as seen from Pike Place Market",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"tiger mountain state forest",
			"poo poo point",
			"outdoors",
			//subject
			"mountain",
			"tree",
			//temporal
			"fall",
			"autumn",
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-12", end: "2025-10-12" }],
		src: "/images/gallery/00017-rayin-around/1-poo-poo-peak-hike/8K8A4013.webp",
		alt: "View out of the trees in Tiger Mountain State Forest",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"tiger mountain state forest",
			"poo poo point",
			"outdoors",
			//subject
			"tree",
			"mist",
			//temporal
			"fall",
			"autumn",
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-12", end: "2025-10-12" }],
		src: "/images/gallery/00017-rayin-around/1-poo-poo-peak-hike/8K8A3852.webp",
		alt: "View of the grey fog from Tiger Mountain State Forest",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"tiger mountain state forest",
			"poo poo point",
			"outdoors",
			//subject
			"mushroom",
			//temporal
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-10-12", end: "2025-10-12" }],
		src: "/images/gallery/00017-rayin-around/1-poo-poo-peak-hike/8K8A3761.webp",
		alt: "A mushroom growing in a hollowed out tree stump",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"utah",
			"salt lake city",
			"ensign peak",
			"outdoors",
			//subject
			"human",
			"person",
			"group",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
			"silhouette",
		],
		dates: [{ start: "2025-07-27", end: "2025-07-27" }],
		src: "/images/gallery/00013-moving-day/7-moab-to-salt-lake-city/8K8A2836.webp",
		alt: "Picture of a group at the Scenic Mound from Ensign Peak Trail",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"utah",
			"salt lake city",
			"ensign peak",
			"outdoors",
			//subject
			"landscape",
			//temporal
			"sunset",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
			"silhouette",
		],
		dates: [{ start: "2025-07-27", end: "2025-07-27" }],
		src: "/images/gallery/00013-moving-day/7-moab-to-salt-lake-city/8K8A2785.webp",
		alt: "View of a Radio station north of Ensign Peak",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"utah",
			"moab",
			"dead horse point state park",
			"outdoors",
			//subject
			"landscape",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-07-27", end: "2025-07-27" }],
		src: "/images/gallery/00013-moving-day/7-moab-to-salt-lake-city/8K8A2706.webp",
		alt: "View of the canyons at Dead Horse Point",
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
			"landscape",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-07-26", end: "2025-07-26" }],
		src: "/images/gallery/00013-moving-day/6-los-alamos-to-moab/8K8A2060.webp",
		alt: "View of Ute Mountain in South West Colorado",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"new mexico",
			"los alamos",
			"outdoors",
			//subject
			"landscape",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-07-23", end: "2025-07-23" }],
		src: "/images/gallery/00013-moving-day/3-tooling-around-los-alamos/8K8A1795.webp",
		alt: "View of the San Jaun Mountains north of Los Alamos",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"amarillo",
			"cadillac ranch",
			"fireworks",
			"outdoors",
			//subject
			"human",
			"person",
			"group",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
			"silhouette",
		],
		dates: [{ start: "2025-07-21", end: "2025-07-21" }],
		src: "/images/gallery/00013-moving-day/1-dallas-to-tucumcari/8K8A1600.webp",
		alt: "Kids lighting off fireworks at Cadillac Ranch",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"amarillo",
			"cadillac ranch",
			"outdoors",
			//subject
			"fireworks",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-07-21", end: "2025-07-21" }],
		src: "/images/gallery/00013-moving-day/1-dallas-to-tucumcari/8K8A1591.webp",
		alt: "Fireworks in the black sky above Cadillac Ranch",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"dfw metro",
			"dallas metro",
			"richardson",
			"utd",
			"university of texas at dallas",
			"science learning center",
			"outdoors",
			//subject
			"building",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-07-10", end: "2025-07-10" }],
		src: "/images/gallery/00012-last-visits/8K8A1246.webp",
		alt: "The UTD Science Learning Center as seen by night",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"texas",
			"lorena",
			"outdoors",
			//subject
			"building",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-07-09", end: "2025-07-09" }],
		src: "/images/gallery/00012-last-visits/8K8A1143.webp",
		alt: "An empty gas station sits lit up in front of a black void",
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
			"animal",
			"bird",
			"mississippi kite",
			"blue jay",
			"group",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"b&k",
			"black & white",
			"black and white",
			"silhouette",
		],
		dates: [{ start: "2025-07-07", end: "2025-07-07" }],
		src: "/images/gallery/00012-last-visits/8K8A1099.webp",
		alt: "A flock of birds sit silhouetted in a barren tree",
	},
	{
		title: "Deck of the Bainbridge",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"the sound",
			"outdoors",
			//subject
			"bainbridge ferry",
			"boat",
			"ferry",
			//temporal
			"winter",
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-01-15", end: "2025-01-15" }],
		src: "/images/gallery/00004-seattle-w24/8-west-of-seattle/deck-of-the-bainbridge.webp",
		alt: "The empty deck of a ferry in winter",
	},
	{
		title: "",
		tags: [
			//location
			"usa",
			"united states",
			"washington",
			"seattle metro",
			"the sound",
			"bainbridge ferry",
			"outdoors",
			//subject
			"animal",
			"bird",
			"seagull",
			"group",
			"boat",
			"ferry",
			//temporal
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-01-15", end: "2025-01-15" }],
		src: "/images/gallery/00004-seattle-w24/8-west-of-seattle/8K8A0034.webp",
		alt: "Several Birds fly over a view of The Sound, with a ferry in the background",
	},
	{
		title: "",
		tags: [
			//location
			"canada",
			"bc",
			"british columbia",
			"vancuver",
			"outdoors",
			//subject
			"car",
			"neon",
			"sign",
			"street",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-01-12", end: "2025-01-12" }],
		src: "/images/gallery/00004-seattle-w24/5-vancuver/8K8A9494.webp",
		alt: "A vancuver street full of cars with neon dragon signs and christmas lights",
	},
	{
		title: "",
		tags: [
			//location
			"canada",
			"bc",
			"british columbia",
			"vancuver",
			"outdoors",
			//subject
			"neon",
			"sign",
			"street",
			"building",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-01-12", end: "2025-01-12" }],
		src: "/images/gallery/00004-seattle-w24/5-vancuver/8K8A9467.webp",
		alt: "An empty area of Vancuver's China Town after the rain",
	},
	{
		title: "",
		tags: [
			//location
			"canada",
			"bc",
			"british columbia",
			"vancuver",
			"stanley park",
			"outdoors",
			//subject
			"skyline",
			"building",
			"water",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
			"reflection",
		],
		dates: [{ start: "2025-01-12", end: "2025-01-12" }],
		src: "/images/gallery/00004-seattle-w24/5-vancuver/8K8A9356.webp",
		alt: "The lit up skyline of Vancuver reflects in the water between it and Stanley Park",
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
			"outdoors",
			//subject
			"sign",
			"graffiti",
			"street",
			"traffic cone",
			//temporal
			"night",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-01-10", end: "2025-01-10" }],
		src: "/images/gallery/00004-seattle-w24/3-downtown-seattle-day-3/8K8A8745.webp",
		alt: "A construction blocks the bike path in front of the Seattle Ferry Terminal",
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
			//temporal
			"winter",
			"day",
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-01-10", end: "2025-01-10" }],
		src: "/images/gallery/00004-seattle-w24/3-downtown-seattle-day-3/day-on-the-beach.webp",
		alt: "A lone person sits, bundled up, on a log at a Seattle beach",
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
			"neon",
			"sign",
			//temporal
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
		],
		dates: [{ start: "2025-01-09", end: "2025-01-09" }],
		src: "/images/gallery/00004-seattle-w24/2-down-town-seattle-day-2/8K8A7999.webp",
		alt: "An elderly couple embrace in the neon lights of Pike Place Market",
	},
	{
		title: "More Shops",
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
			"neon",
			"sign",
			//temporal
			//camera
			//make
			"canon",
			//model
			"5d",
			//format
			"digital",
			//
			"color",
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
            //location
            //subject
            //temporal
            //camera
                //make
                //model
                //
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
