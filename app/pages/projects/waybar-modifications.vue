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
		</div>
	</div>
</template>

<script lang="ts" setup>
const blocks = [
	{
		heading: "Waybar Modifications",
		text: "Currently the only issue I have had is in the display of the calendar. The month and day of the week information is misaligned when displayed with the Japanese locale. In looking for a solution, this did not seem to be a common issue. Seeing this as a minor annoyance, I just made a quick, breaking modification which is available on github for people who go looking for it.",
		image: {
			src: "",
			alt: "",
		},
	},
	{
		heading: "",
		text: "The Waybar clock module renders a calendar as a tooltip. The function ‘get_calendar’ tries to return a cached calendar. If that is impossible, it writes the calendar in a grid. This is done with nested for loops over the lines and the columns in those lines. The columns each represent a month group when the calendar is displayed for a year. In each iteration, padding is added to the beginning of every column after the first. Then it calls the ‘getCalendarLine’ function sandwiched between two conditionals that either write the week number to the left or right of the days. Inside the getCalendarLine function there are 4 cases. Case 0 is printing the heading of a group, which is the month and year. Case 1 prints the days of the week. Case 2 prints the first week of a month, so it can be padded. Finally, The default case is used to print all other weeks of a month.",
		image: {
			src: "images/projects/waybar-modifications/original.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "As far as I understand the issue, the kanji being used are half-width glyphs. This causes trailing spaces to be consumed, changing the spacing while maintaining the same number of characters. The expedient solution was to modify the number of spaces that would be printed. I did this in four locations. First in case 1 of ‘getCalendarLine’, add 3 extra spaces before each day of the week, excluding the first in the row. Second at the start of the nested loops, align the month headings. The alignment of this one was strange so it required a conditional. For the best results possible, this adds an extra space to every other column of months, excluding the first column. Third in the same location, align the days of the week to each month group. This adds 16 spaces after the first month group. Fourth inside the conditional for left week numbers, add 11 extra spaces to the first column.",
		image: {
			src: "images/projects/waybar-modifications/modified.webp",
			alt: "",
		},
	},
];

const expand = useExpand();
</script>
