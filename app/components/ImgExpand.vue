<template>
	<div
		class="fixed top-0 left-0 z-40 flex h-screen w-screen items-center justify-center select-none"
		v-if="open"
        @keydown="minimize"
	>
		<!--Dimmed Background (close on click)-->
		<button
			class="absolute z-10 h-full w-full bg-alice-blue md:bg-black/45"
			@click="minimize"
		></button>
		<div
			class="md:relative flex h-full md:h-5/6 max-h-fit md:w-5/6 max-w-fit items-center justify-center"
		>
			<!--Top Right Close Button-->
			<button
				class="max-md:backdrop-invert bg-black/50 md:bg-alice-blue absolute top-8 right-8 z-30 flex size-14 cursor-pointer items-center justify-center rounded-full md:top-0 md:-right-16 text-white md:text-black"
				@click="minimize"
				title="Close Image"
			>
				<Icon name="famicons:close" size="28" />
			</button>
			<!--Expanded Image-->
			<NuxtImg
				class="bg-alice-blue z-20 max-h-full max-w-full md:rounded-lg md:p-8"
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

onMounted(() => {
    document.addEventListener('keydown', function(event) {
        if (event.key == "Escape" || event.which == 27) {
            minimize();
        }
    });
});
</script>
