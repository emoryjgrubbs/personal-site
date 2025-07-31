<template>
    <div class="select-none aspect-square object-none overflow-hidden flex items-center" @click="maximize">
        <NuxtImg
            :src="props.src"
            :alt="props.alt"
            loading="lazy"
            draggable="false"
        />
    </div>

    <div v-if="expanded" class="select-none fixed flex justify-center items-center top-0 left-0 h-screen w-screen">
        <div class="bg-black/45 h-full w-full" @click="minimize"> </div>
        <div class="absolute center-0 w-fit h-fit flex">
            <div class="absolute -right-16 rounded-full bg-alice-blue justify-self-right h-14 w-14 flex items-center justify-center cursor-pointer" @click="minimize">
                <Icon name="famicons:close" size="28" />
            </div>
            <div class="rounded-lg bg-alice-blue p-8">
                <NuxtImg
                    :src="props.src"
                    :alt="props.alt"
                    loading="lazy"
                    draggable="false"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    src: String,
    alt: String,
});

const expanded = ref(false);

function maximize() {
    expanded.value = true;
}
function minimize() {
    expanded.value = false;
}
</script>
