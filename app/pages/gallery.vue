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
						<h1 class="text-2xl">Title: {{ image.title }}</h1>
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
];
/* gallery image object
	{
		title: "",
		tags: [
			"",
		],
		dates: [{ start: "YYYY-MM-DD", end: "YYYY-MM-DD" }],
		src: "/images/.../.webp",
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
