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
					src: '/images/recipes/simple-syrup/ingredients.webp',
					alt: 'Simple Syrup Ingredients',
				}"
				:ingredients="ingredients"
				:equipment="equipment"
				:instructions="instructions"
				:condenseContent="condenseContent"
				@maximize="(image) => useMaximize(image)"
			/>
			<div v-if="!condenseContent" class="contents"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const title = "Banana Brownies";
const ingredients = [];
const equipment = [];
const instructions = [];

const blocks = [];

const condenseContent = useCondenseContent();

const expand = useExpand();
</script>
