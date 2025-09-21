<template>
	<div class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row">
		<h1 v-if="props.heading" class="text-center text-3xl font-semibold">
			{{ props.heading }}
		</h1>
		<button
			@click="maximize(props.image)"
			title="Expand Image"
			class="flex items-center"
		>
			<NuxtImg
				class="h-full w-full object-cover select-none"
				:src="props.image.src"
				alt="Ingreidents List Reference"
				draggable="false"
			/>
		</button>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	heading: String,
	image: { src: String, alt: String },
});

const emit = defineEmits(["maximize"]);

function maximize(image) {
	emit("maximize", image);
}
</script>
