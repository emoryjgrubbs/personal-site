<template>
	<div>
		<div class="mx-16 my-16 flex flex-col gap-y-8 md:mx-14 lg:mx-20">
			<!--about me-->
			<div class="flex flex-row items-center gap-x-16 max-md:flex-col">
				<div class="w-7/12 select-none max-sm:w-9/12 md:w-5/12">
					<ImgWrap
						src="/images/home/about-me-guitar.webp"
						alt="playing guitar, credit: John Grubbs rockslidephotography"
					/>
				</div>
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
				<NuxtLink
					to="/Projects"
					class="group relative order-2 w-7/12 cursor-pointer select-none max-sm:w-9/12 md:w-5/12"
					title="Navigate To Projects"
				>
					<ImgWrap
						src="/images/home/about-me-guitar.webp"
						alt="playing guitar, credit: John Grubbs rockslidephotography"
					/>
					<div
						class="group-hover:text-columbia-blue group-hover-transition absolute top-0 flex h-full w-full cursor-pointer justify-center text-white backdrop-blur-md duration-300 ease-in-out group-hover:backdrop-blur-none"
					>
						<div
							class="flex w-48 justify-evenly self-center rounded-lg py-2 text-center text-3xl font-semibold duration-300 ease-in-out group-hover:scale-125 group-hover:transition"
						>
							View
							<Icon
								name="famicons:caret-forward"
								class="self-center"
							/>
						</div>
					</div>
				</NuxtLink>
				<div class="flex w-7/12 flex-col gap-y-4 max-sm:w-11/12">
					<div class="flex justify-center"></div>
					<h1 class="text-center text-3xl font-semibold">
						Project Directory
					</h1>
					<p class="text-xl">Write ups on projects</p>
				</div>
			</div>
			<!--Recpies-->
			<div class="flex flex-row items-center gap-x-16 max-md:flex-col">
				<NuxtLink
					to="/Recipes"
					class="group relative w-7/12 cursor-pointer select-none max-sm:w-9/12 md:w-5/12"
					title="Navigate To Recipes"
				>
					<ImgWrap
						src="/images/home/about-me-guitar.webp"
						alt="playing guitar, credit: John Grubbs rockslidephotography"
					/>
					<div
						class="group-hover:text-columbia-blue group-hover-transition absolute top-0 flex h-full w-full cursor-pointer justify-center text-white backdrop-blur-md duration-300 ease-in-out group-hover:backdrop-blur-none"
					>
						<div
							class="flex w-48 justify-evenly self-center rounded-lg py-2 text-center text-3xl font-semibold duration-300 ease-in-out group-hover:scale-125 group-hover:transition"
						>
							View
							<Icon
								name="famicons:caret-forward"
								class="self-center"
							/>
						</div>
					</div>
				</NuxtLink>
				<div class="flex w-7/12 flex-col gap-y-4 max-sm:w-11/12">
					<div class="flex justify-center"></div>
					<h1 class="text-center text-3xl font-semibold">Recpies</h1>
					<p class="text-xl">A place to share recpies</p>
				</div>
			</div>
			<!--Gallery-->
			<div class="flex flex-row items-center gap-x-16 max-md:flex-col">
				<!--re-add order-2-->
				<NuxtLink
					to="/Gallery"
					class="group relative order-2 w-7/12 cursor-pointer select-none max-sm:w-9/12 md:w-5/12"
					title="Navigate To Gallery"
				>
					<ImgWrap
						src="/images/home/camera-setup.webp"
						alt="playing guitar, credit: John Grubbs rockslidephotography"
					/>
					<div
						class="group-hover:text-columbia-blue group-hover-transition absolute top-0 flex h-full w-full cursor-pointer justify-center text-white backdrop-blur-md duration-300 ease-in-out group-hover:backdrop-blur-none"
					>
						<div
							class="flex w-48 justify-evenly self-center rounded-lg py-2 text-center text-3xl font-semibold duration-300 ease-in-out group-hover:scale-125 group-hover:transition"
						>
							View
							<Icon
								name="famicons:caret-forward"
								class="self-center"
							/>
						</div>
					</div>
				</NuxtLink>
				<div class="flex w-7/12 flex-col gap-y-4 max-sm:w-11/12">
					<div class="flex justify-center"></div>
					<h1 class="text-center text-3xl font-semibold">
						Photo Gallery
					</h1>
					<p class="text-xl">
						A gallery to host high quality versions of photographs.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>
