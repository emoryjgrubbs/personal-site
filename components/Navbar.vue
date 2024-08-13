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
  <nav class="bg-nav text-text-light flex space-x-10 py-2">
    <div class="flex grow">
        <button
          class="px-2"
          title="Home"
          @click="homeClick"
        >
          Home
        </button>
        <button
          class="px-2"
          title="Projects"
          @click="projectsClick"
        >
          Projects
        </button>
    </div>
  </nav>
</template>
