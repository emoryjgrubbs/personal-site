<template>
	<div
		v-if="props.crop"
		class="flex aspect-square cursor-pointer items-center overflow-hidden select-none"
		@click="maximize"
	>
		<NuxtImg
			class="h-full w-full object-cover"
			:src="props.src"
			:alt="props.alt"
			loading="lazy"
			draggable="false"
		/>
	</div>
	<div v-else>
		<NuxtImg
			class="cursor-pointer select-none"
			@click="maximize"
			:src="props.src"
			:alt="props.alt"
			loading="lazy"
			draggable="false"
		/>
	</div>

	<div
		v-if="expanded"
		class="fixed top-0 left-0 flex h-screen w-screen items-center justify-center select-none"
	>
		<div class="h-full w-full bg-black/45" @click="minimize"></div>
		<div class="center-0 absolute flex h-5/6 max-w-5/6">
			<div
				class="bg-alice-blue justify-self-right absolute -right-16 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
				@click="minimize"
			>
				<Icon name="famicons:close" size="28" />
			</div>
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
	crop: Boolean,
});

const expanded = ref(false);

function maximize() {
	expanded.value = true;
}
function minimize() {
	expanded.value = false;
}
</script>
