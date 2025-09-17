<template>
	<div
		class="fixed top-33 z-40 mx-16 flex flex-col gap-y-8 transition ease-in-out hover:scale-110 md:mx-14 lg:mx-20"
	>
		<NuxtLink
			:to="props.link"
			class="flex cursor-pointer justify-evenly gap-2 rounded-lg bg-black py-2 pr-6 pl-4 text-center text-3xl font-semibold text-white"
			:title="'Return' + props.location"
		>
			<Icon name="famicons:caret-back" class="self-center" />
			<div>{{ props.location }}</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	link: String,
	location: String,
});
</script>
