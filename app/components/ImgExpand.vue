<template>
	<div
		class="fixed top-0 left-0 z-40 flex h-screen w-screen items-center justify-center select-none"
		v-if="open"
	>
		<!--Dimmed Background (close on click)-->
		<button class="h-full w-full bg-black/45" @click="minimize"></button>
		<div class="center-0 absolute flex h-5/6 max-w-5/6">
			<!--Top Right Close Button-->
			<button
				class="bg-alice-blue justify-self-right absolute -right-16 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
				@click="minimize"
				title="Close Image"
			>
				<Icon name="famicons:close" size="28" />
			</button>
			<!--Expanded Image-->
			<NuxtImg
				class="bg-alice-blue max-h-full max-w-full self-center rounded-lg object-scale-down p-8"
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
</script>
