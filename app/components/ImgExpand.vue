<template>
	<div
		class="fixed top-0 left-0 z-40 flex h-screen w-screen items-center justify-center select-none"
		v-if="open"
		@wheel.prevent
		@touchmove.prevent
		@scroll.prevent
	>
		<!--Dimmed Background (close on click)-->
		<button
			class="z-10 h-full w-full bg-black/45"
			@click="minimize"
		></button>
		<div
			class="absolute flex h-5/6 max-h-fit w-5/6 max-w-fit items-center justify-center"
		>
			<!--Top Right Close Button-->
			<button
				class="bg-alice-blue absolute -top-16 right-0 z-30 flex size-14 cursor-pointer items-center justify-center rounded-full md:top-0 md:-right-16"
				@click="minimize"
				title="Close Image"
			>
				<Icon name="famicons:close" size="28" />
			</button>
			<!--Expanded Image-->
			<NuxtImg
				class="bg-alice-blue z-20 max-h-full max-w-full rounded-lg p-8"
				:src="props.src"
				:alt="props.alt"
				loading="lazy"
				draggable="false"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	src: String,
	alt: String,
	open: Boolean,
});

const emit = defineEmits(["minimize"]);

function minimize() {
	emit("minimize");
}

// allows for an image to be minimized using navigation controls
onBeforeRouteLeave((to, from) => {
	if (props.open) {
		emit("minimize");
		return false;
	}
});
</script>
