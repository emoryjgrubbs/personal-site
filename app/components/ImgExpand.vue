<template>
	<div
		class="fixed top-0 left-0 z-40 flex h-screen w-screen items-center justify-center select-none"
		v-if="open"
		@keydown="minimize"
	>
		<!--Dimmed Background (close on click)-->
		<button
			class="absolute z-10 h-full w-full"
			:class="{
				'bg-alice-blue md:bg-black/45': !mobile,
				'bg-alice-blue': mobile,
			}"
			@click="minimize"
		></button>
		<div
			class="max-h-fit max-w-fit items-center justify-center"
			:class="{
				'flex h-full md:relative md:h-5/6 md:w-5/6': !mobile,
				'flex h-full': mobile,
			}"
		>
			<!--Top Right Close Button-->
			<button
				class="absolute z-30 flex size-14 cursor-pointer items-center justify-center rounded-full"
				:class="{
					'md:bg-alice-blue top-8 right-8 bg-black/50 text-white max-md:backdrop-invert md:top-0 md:-right-16 md:text-black':
						!mobile,
					'top-8 right-8 bg-black/50 text-white backdrop-invert':
						mobile,
				}"
				@click="minimize"
				title="Close Image"
			>
				<Icon name="famicons:close" size="28" />
			</button>
			<!--Expanded Image-->
			<NuxtImg
				class="bg-alice-blue z-20 max-h-full max-w-full"
				:class="{
					'md:rounded-lg md:p-8': !mobile,
				}"
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

const mobile = useMobile();
console.log(mobile.value);

onMounted(() => {
	document.addEventListener("keydown", function (event) {
		if (event.key == "Escape" || event.which == 27) {
			minimize();
		}
	});
});
</script>
