<template>
	<div
		class="fixed z-40 mx-12 flex flex-col gap-y-8 transition-all ease-out hover:scale-110 md:mx-8 xl:mx-20"
		:class="y > 100 ? 'top-10' : y > 50 ? 'top-16' : 'top-33'"
	>
		<NuxtLink
			:to="props.link"
			class="flex cursor-pointer justify-evenly gap-2 rounded-lg bg-black py-2 text-center text-3xl font-semibold text-white transition-all ease-out"
			:class="shorten ? 'pr-3 pl-2' : 'pr-6 pl-4'"
			:title="'Return' + props.location"
		>
			<Icon name="famicons:caret-back" class="self-center" />
			<div v-show="!shorten">{{ props.location }}</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";

const { y, directions } = useWindowScroll({
	behavior: "smooth",
});

const props = defineProps({
	link: String,
	location: String,
});

const shorten = computed(() => {
	if (directions.top) {
		console.debug("Expanding Return Link");
		return false;
	}
	if (directions.bottom) {
		console.debug("Shortening Return Link");
		return true;
	}
	return shorten.value;
});
</script>
