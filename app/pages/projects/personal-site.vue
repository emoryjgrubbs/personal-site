<template>
	<div class="gap-y-24 md:gap-y-16">
		<ReturnLink link="/Projects" location="Projects" />

		<!--Expanded Image Handling-->
		<ImgExpand
			:src="expand.src"
			:alt="expand.alt"
			:open="expand.open"
			@minimize="useMinimize"
		/>

		<div
			class="mx-16 my-16 mt-36 flex flex-col gap-y-24 sm:mt-39 md:mx-14 md:gap-y-16 lg:mx-24 xl:mx-48"
		>
			<ArticleBlockText
				:heading="blocks[0].heading"
				:text="blocks[0].text"
			/>

			<ArticleBlockTextImage
				:heading="blocks[1].heading"
				:text="blocks[1].text"
				:image="blocks[1].image"
				left="image"
				@maximize="(image) => useMaximize(image)"
			/>

			<ArticleBlockTextImage
				:heading="blocks[2].heading"
				:text="blocks[2].text"
				:image="blocks[2].image"
				@maximize="(image) => useMaximize(image)"
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
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
const blocks = [
	{
		heading: "Personal Site",
		text: "This project began with a simple design to accomplish two goals. After working on the ATC project with EPICS, I was interested in gaining experience styling websites. At the same time, I was nearing graduation. I wanted to build my online presence, in a way I had control of. Specifically at the time to host information on projects I had worked on.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "In its initial iteration, this site only had two pages. Those were, a home page introducing myself, and a projects page with search functionality and brief descriptions. The impetus of site rework was limitations in the project page. I found it difficult to make the blocks of text both readable and informative. At the same time, I found the way project images were included to be inelegant. While I was making modifications, I also wanted to express more of my personality. This led to the addition of the recipes page and photo gallery, which replaced the short blurb and collection of images on the original home page.",
		image: {
			src: "images/projects/personal-site/old-home-page.webp",
			alt: "Original home page layout",
		},
	},
	{
		heading: "",
		text: "The search functionality is largely what I built for the original site. The major functional additions were sorting options and an invert operator. More important than those, was making the search more intuitive. At the time, I had only included a tooltip with instructions for the combined search functionality. While I wasn’t satisfied with the solution, the options were overkill for the time. However, with the rework added search results, this was something I had to address. The original functionality is still in place, special characters can be used in the primary search to access tags, dates, and sorting. In place of a tooltip, there is a button to access the other filters directly. This includes: a tag input with autocomplete, date ranges with calendar input, and a dropdown of the sorting options.",
		image: {
			src: "images/projects/personal-site/old-projects-page.webp",
			alt: "Original projects layout",
		},
	},
	{
		heading: "",
		text: "Aside from design changes, a component to handle maximizing images has been added. This has been designed to be easily added to any page, with logic to switch the image displayed in a reusable composable so only a single component is ever needed. Other notable changes stem from expanding the number of pages. The philosophy around navigation moved to in page connections as opposed to a top navigation bar. I believe this will provide more relevant options to guide users. The different flows have limited depth, so I don’t anticipate this hindering users. To a similar end, global states have been added to improve user experience as they access different pages. This includes the preserving filters when accessing sub pages and remembering selected display modes. ",
		image: {
			src: "images/projects/personal-site/image-expand.webp",
			alt: "Image expand in gallery",
		},
	},
	{
		heading: "",
		text: "Future development of this site primarily rests with the eventual need to change how it is hosted, as the size of the image data will grow too large. I have so far resisted this to keep deployment simple and avoid recurring fees. Outside of that, I am evaluating a handful of minor changes that may be needed as content is added. ",
		image: {
			src: "",
			alt: "",
		},
	},
];

const expand = useExpand();
</script>
