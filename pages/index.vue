<script setup>

import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

const interestPictures = ['/images/guitar/DSC00586.jpg','/images/guitar/DSC00569.jpg','/images/guitar/DSC00583.1.jpg'];
const interestAlts = ['playing guitar, credit: John Grubbs rockslidephotography'];

const interestIndex = ref(0);

function interestIndexUp() {
    console.log('next intreset image', interestIndex.value);
    if (interestIndex.value < interestPictures.length-1) {
        interestIndex.value += 1;
        
    }
    else {
        interestIndex.value = 0;
    }
}
function interestIndexDown() {
    console.log('previous intreset image', interestIndex.value);
    if (interestIndex.value > 0) {
        interestIndex.value -= 1;
        
    }
    else {
        interestIndex.value = interestPictures.length-1;
    }
}

</script>

<template>
    <body class="flex-auto bg-bg text-center overscroll-contain">
        <!--title-->
        <h1 class=" mt-10 mb-5 text-4xl font-bold">
            Emory Grubbs
        </h1>
        <!--about me-->
        <div class="flex flex-row max-md:flex-col py-2 items-center mx-20 mb-5">
            <img src="/images/headshot/DSC00288.jpg" alt="headshot, credit: John Grubbs rockslidephotography" class="w-7/12 md:w-5/12 md:px-6 max-md:mb-5" draggable="false" />
            <div class="w-7/12 md:px-6">
                <h1 class="text-2xl underline">
                    About Me
                </h1>
                <p class="text-base pt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
        <!--interests-->
        <div class="flex flex-row max-md:flex-col py-2 items-center mx-20 mb-5">
            <div class="flex items-center w-7/12 md:w-5/12 md:px-6 max-md:mb-5 relative">
                <button @click="interestIndexDown" title="Previous" class="z-10 text-4xl text-white absolute start-10 hover:scale-125">
                    <ChevronLeftIcon class="size-10 text-white"/>
                </button>
                <img :src="interestPictures[interestIndex]" :alt="interestAlts[0]" class="w-fit z-0" draggable="false" />
                <button @click="interestIndexUp" title="Next" class="z-10 text-4xl text-white absolute end-10 hover:scale-125">
                    <ChevronRightIcon class="size-10 text-white"/>
                </button>
            </div>
            <div class="w-7/12 md:px-6 md:order-first">
                <h1 class="text-2xl underline">
                    Interests
                </h1>
                <p class="text-base pt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    </body>
</template>