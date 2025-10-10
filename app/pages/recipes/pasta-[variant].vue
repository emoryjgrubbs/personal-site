<template>
	<div class="gap-y-24 md:gap-y-16">
		<ReturnLink link="/Recipes" location="Recipes" />

		<!--Expanded Image Handling-->
		<ImgExpand
			:src="expand.src"
			:alt="expand.alt"
			:open="expand.open"
			@minimize="useMinimize"
		/>

		<div
			class="mx-16 my-16 mt-36 flex flex-col gap-y-24 sm:mt-16 md:mx-14 md:gap-y-16 lg:mx-24 xl:mx-48"
		>
			<!--Button for toggling Condensed Recipe-->
			<div class="flex w-full justify-end">
				<button
					class="flex w-fit cursor-pointer flex-row items-center gap-2 text-xl transition ease-in-out hover:scale-102"
					@click="useToggleCondense()"
					:title="
						condenseContent
							? 'Expand Recipe View'
							: 'Condense Recipe View'
					"
				>
					<Icon
						:name="
							condenseContent
								? 'famicons:radio-button-on'
								: 'famicons:radio-button-off'
						"
					/>
					Condensed
				</button>
			</div>

			<ArticleBlockRecipeInfo
				:recipe="title"
				:image="{
					src: '/images/recipes/pasta/red/ingredients.webp',
					alt: 'Simple Syrup Ingredients',
				}"
				:ingredients="ingredients"
				:equipment="equipment"
				:instructions="instructions"
				:condenseContent="condenseContent"
				@maximize="(image) => useMaximize(image)"
			/>
			<div v-if="!condenseContent" class="contents">
				<ArticleBlockTextImage
					:heading="blocks[0].heading"
					:text="blocks[0].text"
					:image="blocks[0].image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[1].heading"
					:text="blocks[1].text"
					:image="blocks[1].image"
					left="image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[2].heading"
					:text="blocks[2].text"
					:image="blocks[2].image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[3].heading"
					:text="blocks[3].text"
					:image="blocks[3].image"
					left="image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[4].heading"
					:text="blocks[4].text"
					:image="blocks[4].image"
				/>
				<ArticleBlockTextImage
					:heading="blocks[5].heading"
					:text="blocks[5].text"
					:image="blocks[5].image"
					left="image"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const title = "Pasta";
const ingredients = [
	{ name: "whole peeled tomatos", measurement: "28 ounce can" },
	{ name: "water", measurement: "1 cup" },
	{ name: "olive oil", measurement: "1/4 cup" },
	{ name: "garlic", measurement: "7 cloves" },
	{ name: "red pepper flakes", measurement: "" },
	{ name: "salt", measurement: "1 TSP" },
	{ name: "pepper", measurement: "" },
	{ name: "oregano", measurement: "" },
	{ name: "basil", measurement: "1 to 3 spirgs" },
	{ name: "80/20 ground beef", measurement: "3/4 of a pound" },
	{ name: "noodles", measurement: "1 package" },
];
const equipment = [
	"mixing bowl",
	"potato masher",
	"knife",
	"measuring cup",
	"sauce pan",
	"teaspoon",
	"skillet",
	"spatula",
	"pot",
];
const instructions = [
	"Crush a can of whole peeled tomatos in a mixing bowl and add a cup of water to the left over juice",
	"Coarse mince 7 garlic cloves",
	"Heat 1/4 cup of olive oil in a sauce pan on medium low heat",
	"Add red pepper flakes and garlic to the oil",
	"As soon as the garlic is sizzling, add the crushed tomatos and watered down juice",
	"Add a teaspoon of salt with black pepper and oregano to taste, then mix to incorporate",
	"Once the sauce starts to bubble, add fresh basil and let it wilt",
	"Brown 3/4 pounds of ground beef, seasoned with salt and black pepper",
	"Once the meat is browned, add it to the sauce and lower the temperature",
	"If not previously done, submerge the basil",
	"Boil water and cook selected noodles for the time specified by the packaging",
];

const blocks = [
	{
		heading: "",
		text: "The first thing I do is start the sauce, since it needs time to simmer. I start by pouring whole peeled tomatoes into a mixing bowl to be crushed. I also take a cup of water and pour it into the can. Then setting those aside, I coarse mince about 7 good sized cloves of garlic.",
		image: {
			src: "/images/recipes/pasta/red/prep.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Once I have these prepared, I heat a fourth cup of olive oil, sprinkling in a generous amount of red pepper flakes. Once up to temp, I throw in the garlic. As soon as I hear the garlic starting to sizzle, I pour in the tomatoes. I also pour the water from the can into the bowl at this point, attempting to get as much of the liquid from the can into the sauce as possible.",
		image: {
			src: "/images/recipes/pasta/red/sizzle.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "After a quick stir to incorporate the ingredients, I add a healthy amount of salt, black pepper and oregano. I use a teaspoon of salt, but just look at the density of spices covering the surface of the sauce as a measure for the pepper and oregano. I do two passes for the black pepper and one for the oregano… . Once the sauce is starting to bubble, I add some fresh basil and let it wilt.",
		image: {
			src: "/images/recipes/pasta/red/spice.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Now that the sauce has started to simmer, I add about 3/4ths of a pound of ground beef to a skillet. While it’s still a block, I season one side with salt and pepper. While keeping an eye on the sauce and stirring occasionally, I let the meat start to brown. After the bottom is starting to take on color, I flip the meat and start to break it apart with a spatula. I like varying pebbles of beef in my sauce, so I continue to use the spatula to break things apart when I agitate the beef. Once satisfactorily browned, add the meat to the sauce that has been simmering.",
		image: {
			src: "/images/recipes/pasta/red/meat.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Once the meat has been added to the sauce, I lower the temperature and start preparing the noodles. At this point I just stir the sauce occasionally, while waiting for the noodle water to boil. Once boiling I add some salt to the water and the noodles. I usually only do a third of the noodles as fresh noodles make a big difference to me, and I don’t have a microwave to easily reheat the leftovers. Once in, I follow the package's instructions, which is usually to boil the noodles for about 10 or 11 minutes.",
		image: {
			src: "/images/recipes/pasta/red/combining.webp",
			alt: "",
		},
	},
	{
		heading: "",
		text: "Once that timer is up on the noodles, I turn off the heat on all burners and strain the noodles. Then I top my noodles with sauces in a large bowl, mixing to evenly coat them in sauce, and put the excess sauce in a container to be preserved and eaten later.",
		image: {
			src: "/images/recipes/pasta/red/product.webp",
			alt: "",
		},
	},
];

const condenseContent = useCondenseContent();

const expand = useExpand();
</script>
