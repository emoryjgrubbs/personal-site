<template>
	<div
        v-if="props.crop"
		class="flex aspect-square items-center overflow-hidden object-none select-none"
		@click="maximize"
	>
		<NuxtImg
			:src="props.src"
			:alt="props.alt"
			loading="lazy"
			draggable="false"
		/>
	</div>
	<div
        v-else
		class="flex items-center overflow-hidden object-none select-none"
		@click="maximize"
	>
		<NuxtImg
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
		<div class="center-0 absolute flex h-fit w-fit">
			<div
				class="bg-alice-blue justify-self-right absolute -right-16 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
				@click="minimize"
			>
				<Icon name="famicons:close" size="28" />
			</div>
			<div class="bg-alice-blue rounded-lg p-8">
				<NuxtImg
					:src="props.src"
					:alt="props.alt"
					loading="lazy"
					draggable="false"
				/>
			</div>
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
