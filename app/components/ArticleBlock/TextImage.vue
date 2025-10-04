<template>
	<div class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row">
		<button
			@click="maximize(props.image)"
			title="Expand Image"
			class="order-2 flex items-center"
			:class="{
				'md:order-none': props.left == 'image',
				'md:w-7/12': props.wide == 'image',
				'md:w-6/12': props.wide == 'none',
				'md:w-5/12': props.wide != 'image' && props.wide != 'none',
			}"
		>
			<NuxtImg
				class="h-full w-full object-cover select-none"
				:src="props.image.src"
				alt="Ingreidents List Reference"
				draggable="false"
			/>
		</button>
		<div
			class="contents w-7/12 gap-y-4 md:flex md:flex-col"
			:class="{
				'md:w-5/12': props.wide == 'image',
				'md:w-6/12': props.wide == 'none',
				'md:w-7/12': props.wide != 'image' && props.wide != 'none',
			}"
		>
			<h1 v-if="props.heading" class="text-center text-3xl font-semibold">
				{{ props.heading }}
			</h1>
			<p class="order-3 text-xl">
				{{ props.text }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	heading: String,
	text: String,
	image: { src: String, alt: String },
	left: String,
	wide: String,
});

const emit = defineEmits(["maximize"]);

function maximize(image) {
	emit("maximize", image);
}
</script>
