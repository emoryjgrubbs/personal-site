<template>
	<div class="flex flex-row gap-5 overflow-scroll">
		<NuxtLink
			:to="{
				name: address,
				params: { variant: variant },
			}"
			replace="true"
			v-for="variant in variants"
			class="bg-columbia-blue rounded-xl px-3 py-1 text-2xl capitalize"
		>
			{{ variant }}
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	address: String,
	variants: Array,
});
</script>
