<template>
	<div class="fixed top-33 flex flex-col gap-y-8 md:mx-14 lg:mx-20">
		<NuxtLink
			to="/"
			class="flex w-40 cursor-pointer justify-evenly rounded-lg bg-black py-2 text-center text-3xl font-semibold text-white"
		>
			<Icon name="famicons:caret-back" class="self-center" />
			<div v-show="true">Home</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup></script>
