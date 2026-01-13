<template>
	<div class="flex flex-col items-center gap-x-16 gap-y-8">
		<h1 v-if="props.heading" class="text-center text-3xl font-semibold">
			{{ props.heading }}
		</h1>
		<p class="text-xl">
			{{ props.text }}
		</p>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	heading: String,
	text: String,
});
</script>
