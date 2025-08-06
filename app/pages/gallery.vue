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
			<div class="grid grid-cols-5 gap-3">
				<div v-for="image in filteredImages">
					<ImgWrap :src="image.src" :alt="image.alt" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const images = [
	{
		title: "alpha",
		tags: ["tag"],
		dates: [{ start: "2024-01-05", end: "now" }],
		src: "/images/about-me-guitar.webp",
		alt: "playing guitar, credit: John Grubbs rockslidephotography",
	},
	{
		title: "gamma",
		tags: ["tag"],
		dates: [{ start: "2024-06-01", end: "2025-06-01" }],
		src: "/images/about-me-guitar.webp",
		alt: "playing guitar, credit: John Grubbs rockslidephotography",
	},
	{
		title: "beta",
		tags: ["tag"],
		dates: [{ start: "2025-01-01", end: "2025-01-05" }],
		src: "/images/about-me-guitar.webp",
		alt: "playing guitar, credit: John Grubbs rockslidephotography",
	},
];

const filteredImages = ref(images);

function updateDisplay(filterUpdate) {
	filteredImages.value = filterUpdate;
}
</script>
