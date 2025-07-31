<template>
	<div>
		<div class="mx-16 my-16 flex flex-col gap-y-8 md:mx-14 lg:mx-20">
			<!--about me-->
			<div class="flex flex-row items-center gap-x-16 max-md:flex-col">
				<NuxtImg
					src="/images/about-me-guitar.webp"
					alt="playing guitar, credit: John Grubbs rockslidephotography"
					class="w-7/12 select-none max-sm:w-9/12 md:w-5/12"
					loading="lazy"
					draggable="false"
				/>
				<div class="flex w-7/12 flex-col gap-y-4 max-sm:w-11/12">
					<h1 class="text-center text-3xl font-semibold">About Me</h1>
					<p class="text-xl">
						I graduated with honors from The University of Texas at
						Dallas, with a degree in Computer Science. I was
						involved as both a team member and a junior mentor in
						the school’s Engineering Projects in Community Service
						program. Linux & open source software
					</p>
				</div>
			</div>
			<!--Projects-->
			<div class="flex flex-row items-center gap-x-16 max-md:flex-col">
				<div
					class="order-2 aspect-3/4 w-7/12 bg-slate-500 select-none max-sm:w-9/12 md:w-5/12"
				></div>
				<div class="flex w-7/12 flex-col gap-y-4 max-sm:w-11/12">
					<div class="flex justify-center">
						<NuxtLink
							to="/Projects"
							class="flex w-60 cursor-pointer justify-evenly rounded-lg bg-black py-2 text-center text-3xl font-semibold text-white"
						>
							Projects
							<Icon
								name="famicons:caret-forward"
								class="self-center"
							/>
						</NuxtLink>
					</div>
					<p class="text-xl">Write ups on projects</p>
				</div>
			</div>
			<!--Recpies-->
			<div class="flex flex-row items-center gap-x-16 max-md:flex-col">
				<div
					class="aspect-3/4 w-7/12 bg-slate-500 select-none max-sm:w-9/12 md:w-5/12"
				></div>
				<div class="flex w-7/12 flex-col gap-y-4 max-sm:w-11/12">
					<div class="flex justify-center">
						<NuxtLink
							to="/Recipes"
							class="flex w-60 cursor-pointer justify-evenly rounded-lg bg-black py-2 text-center text-3xl font-semibold text-white"
						>
							Recipes
							<Icon
								name="famicons:caret-forward"
								class="self-center"
							/>
						</NuxtLink>
					</div>
					<p class="text-xl">
						Document recipes for myself and friends
					</p>
				</div>
			</div>
			<!--Gallery-->
			<div class="flex flex-row items-center gap-x-16 max-md:flex-col">
				<div
					class="order-2 aspect-3/4 w-7/12 bg-slate-500 select-none max-sm:w-9/12 md:w-5/12"
				></div>
				<div class="flex w-7/12 flex-col gap-y-4 max-sm:w-11/12">
					<div class="flex justify-center">
						<NuxtLink
							to="/Gallery"
							class="flex w-60 cursor-pointer justify-evenly rounded-lg bg-black py-2 text-center text-3xl font-semibold text-white"
						>
							Gallery
							<Icon
								name="famicons:caret-forward"
								class="self-center"
							/>
						</NuxtLink>
					</div>
					<p class="text-xl">
						Host high quality exports of photos, with details
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>
