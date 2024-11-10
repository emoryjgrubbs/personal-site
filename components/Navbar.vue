<template>
  <nav class="bg-dg text-text-light text-3xl font-bold flex py-2 overflow-x-auto">
    <div class="flex grow mx-2 space-x-2">
        <button
          class="px-2 hover:font-black hover:text-white"
          title="Home"
          @click="homeClick"
        >
          Home
        </button>
        <button
          class="px-2 hover:font-black hover:text-white"
          title="Projects"
          @click="projectsClick"
        >
          Projects
        </button>
    </div>
  </nav>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();

function homeClick() {
  window.location.href = `${config.public.BASEURL}/home`;
}
function projectsClick() {
  window.location.href = `${config.public.BASEURL}/projects`;
}
</script>
