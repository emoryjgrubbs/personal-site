<template>
	<div>
		<!--Expanded Image Handling-->
		<ImgExpand
			:src="expand.src"
			:alt="expand.alt"
			:open="expand.open"
			@minimize="useMinimize"
		/>

		<!--Home Content-->
		<div
			class="mx-16 my-16 flex flex-col gap-y-24 md:mx-14 md:gap-y-16 lg:mx-24 xl:mx-48"
		>
			<!--about me-->
			<div
				class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
			>
				<button
					@click="
						useMaximize({
							src: '/images/home/bio-guitar.webp',
							alt: 'playing guitar, credit: John Grubbs rockslidephotography',
						})
					"
					title="Expand Image"
					class="order-2 select-none md:order-none md:w-5/12"
				>
					<NuxtImg
						class="h-full w-full cursor-pointer object-cover select-none"
						src="/images/home/bio-guitar.webp"
						alt="playing guitar, credit: John Grubbs rockslidephotography"
						draggable="false"
					/>
				</button>
				<div class="contents w-7/12 gap-y-4 md:flex md:flex-col">
					<h1 class="text-center text-3xl font-semibold">About Me</h1>
					<p class="order-3 text-xl">
						I graduated with honors from The University of Texas at
						Dallas, with a degree in Computer Science. And, I am
						proud to have been involved with the school’s
						Engineering Projects in Community Service program, as
						both a team member and a junior mentor. Currently, my
						personal technological interests lie in open source
						projects. Although I switched to Linux full time about a
						year ago, I have been interested in FOSS for a long
						time. Past simply not wanting to pay for software as a
						child, I believe it has some compelling advantages.
						Particularly I find that it empowers users to make
						decisions on how they experience and interact with the
						software.
					</p>
				</div>
			</div>
			<!--Projects-->
			<div
				class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
			>
				<NuxtLink
					to="/Projects"
					class="group relative order-2 cursor-pointer select-none md:w-5/12"
					title="Navigate To Projects"
				>
					<NuxtImg
						src="/images/home/projects-this-page-source.webp"
						alt="Computer screen, showing section of this page's source code"
						draggable="false"
					/>
					<div
						class="group-hover:text-columbia-blue group-hover-transition absolute top-0 flex h-full w-full cursor-pointer justify-center text-white backdrop-blur-sm duration-300 ease-in-out group-hover:backdrop-blur-none lg:backdrop-blur-md"
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
				<div class="contents w-7/12 gap-y-4 md:flex md:flex-col">
					<h1 class="text-center text-3xl font-semibold">
						Project Directory
					</h1>
					<p class="order-3 text-xl">
						This is a catalog of project write ups, in which I can
						document my thoughts and decisions.
					</p>
				</div>
			</div>
			<!--Recipes-->
			<div
				class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
			>
				<NuxtLink
					to="/Recipes"
					class="group relative order-2 cursor-pointer select-none md:order-none md:w-5/12"
					title="Navigate To Recipes"
				>
					<NuxtImg
						src="/images/home/recipes-coffee.webp"
						alt="Coffee cup, espresso shot, and milk jug"
						draggable="false"
					/>
					<div
						class="group-hover:text-columbia-blue group-hover-transition absolute top-0 flex h-full w-full cursor-pointer justify-center text-white backdrop-blur-sm duration-300 ease-in-out group-hover:backdrop-blur-none lg:backdrop-blur-md"
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
				<div class="contents w-7/12 gap-y-4 md:flex md:flex-col">
					<h1 class="text-center text-3xl font-semibold">Recipes</h1>
					<p class="order-3 text-xl">
						I am not a Michelin Star chef, but there are a hand-full
						of recipes I have put in time to refine. This serves as
						a centralized reference for myself and a platform to
						share them with friends.
					</p>
				</div>
			</div>
			<!--Gallery-->
			<div
				class="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row"
			>
				<NuxtLink
					to="/Gallery"
					class="group relative order-2 cursor-pointer select-none md:w-5/12"
					title="Navigate To Gallery"
				>
					<NuxtImg
						src="/images/home/gallery-overlook-camera-setup.webp"
						alt="Camera on tripod, at Whiterock overlook"
						draggable="false"
						loading="lazy"
					/>
					<div
						class="group-hover:text-columbia-blue group-hover-transition absolute top-0 flex h-full w-full cursor-pointer justify-center text-white backdrop-blur-sm duration-300 ease-in-out group-hover:backdrop-blur-none lg:backdrop-blur-md"
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
				<div class="contents w-7/12 gap-y-4 md:flex md:flex-col">
					<h1 class="text-center text-3xl font-semibold">
						Photo Gallery
					</h1>
					<p class="order-3 text-xl">
						I’ve taken up photography and needed a better way to
						permanently host images, without sacrificing quality for
						file size. This solution allows me to make them public
						as well, increasing ease of access for some of my family
						members.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const expand = useExpand();
</script>
