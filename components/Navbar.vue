<script setup lang="ts">

const config = useRuntimeConfig();

function homeClick() {
  window.location.href = `${config.public.BASEURL}/`;
}
function projectsClick() {
  window.location.href = `${config.public.BASEURL}/projects`;
}
</script>

<template>
  <nav class="bg-nav text-text-light text-2xl font-bold flex space-x-10 py-2 overflow-x-scroll">
    <div class="flex grow mx-2">
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
