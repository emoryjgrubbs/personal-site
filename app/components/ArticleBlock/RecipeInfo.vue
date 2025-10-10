<template>
	<div class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row">
		<button
			@click="maximize(image)"
			title="Expand Image"
			class="overflow-contain order-2 flex aspect-square items-center md:order-none md:w-1/2 xl:w-5/12"
			v-if="!props.condenseContent"
		>
			<NuxtImg
				class="h-full w-full object-cover select-none"
				:src="props.image.src"
				alt="Ingreidents List Reference"
				draggable="false"
			/>
		</button>
		<div
			class="contents w-full gap-y-8 md:flex md:flex-col"
			:class="props.condenseContent ? '' : 'md:w-1/2 xl:w-7/12'"
		>
			<h1 class="text-center text-3xl font-semibold capitalize">
				{{ recipe }}
			</h1>
			<div class="order-3 flex w-full flex-col gap-2 text-xl">
				<h2 class="text-2xl font-semibold">Ingreidents</h2>
				<span
					class="flex flex-col text-xl"
					v-for="ingredient in props.ingredients"
					>{{ ingredient.name }} - {{ ingredient.measurement }}</span
				>
			</div>
			<div class="order-3 flex w-full flex-col gap-2 text-xl">
				<h2 class="text-2xl font-semibold">Equipment</h2>
				<span
					class="flex flex-col text-xl"
					v-for="piece in props.equipment"
					>{{ piece }}</span
				>
			</div>
			<div
				class="order-3 flex w-full flex-col gap-2 text-xl"
				v-if="props.condenseContent"
			>
				<h2 class="text-2xl font-semibold">Steps</h2>
				<span
					class="flex flex-col text-xl"
					v-for="(step, index) in props.instructions"
					>{{ index + 1 }}. {{ step }}</span
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	recipe: String,
	image: { src: String, alt: String },
	ingredients: Array,
	equipment: Array,
	instructions: Array,
	condenseContent: Boolean,
});

const emit = defineEmits(["maximize"]);

function maximize(image) {
	emit("maximize", image);
}
</script>
