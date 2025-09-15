<template>
	<div
		class="fixed top-33 z-50 mx-16 flex flex-col gap-y-8 transition ease-in-out hover:scale-110 md:mx-14 lg:mx-20"
	>
		<NuxtLink
			to="/Projects"
			class="flex w-40 cursor-pointer justify-evenly rounded-lg bg-black py-2 text-center text-3xl font-semibold text-white"
			title="Return Home"
		>
			<Icon name="famicons:caret-back" class="self-center" />
			<div v-show="true">Projects</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup></script>
