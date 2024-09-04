<template>
    <body class="flex flex-col bg-bg text-center overscroll-contain">
        <!--title-->
        <h1 class=" mt-10 mb-5 text-4xl font-bold">
            Emory Grubbs
        </h1>
        <!--about me-->
        <div class="flex flex-row max-md:flex-col py-2 items-center mx-20 mb-5">
            <img src="/assets/images/headshot/headshot-1.webp" alt="headshot, credit: John Grubbs rockslidephotography" class="w-7/12 md:w-5/12 md:px-6 max-md:mb-5" draggable="false" />
            <div class="w-7/12 md:px-6">
                <h1 class="text-2xl underline">
                    About Me
                </h1>
                <p class="text-base pt-4">
                    I am a computer science senior, currently attending the University of Texas at Dallas. 
                    I was a part of the Engineering Projects in Community Service program at my university, which connects students with non-profits. 
                    I am a good problem solver, and have the skills to adapt my knowledge to novel situations.
                </p>
            </div>
        </div>
        <!--interests-->
        <div class="flex flex-row max-md:flex-col py-2 items-center mx-20 mb-5">
            <!--select-image-->
            <div class="flex items-center w-7/12 md:w-5/12 md:px-6 max-md:mb-5 relative">
                <button @click="interestIndexDown" title="Previous" class="z-10 text-4xl text-white absolute start-10 hover:scale-125">
                    <ChevronLeftIcon class="size-10 fill-white absolute z-20"/>
                    <ChevronLeftIcon class="size-10 opacity-45 stroke-black stroke-2"/>
                </button>
                <img :src="interestPictures[interestIndex]" :alt="interestAlts[interestIndex]" class="w-fit z-0" draggable="false" />
                <button @click="interestIndexUp" title="Next" class="z-10 text-4xl text-white absolute end-10 hover:scale-125">
                    <ChevronRightIcon class="size-10 fill-white absolute z-20"/>
                    <ChevronRightIcon class="size-10 opacity-45 stroke-black stroke-2"/>
                </button>
            </div>
            <div class="w-7/12 md:px-6 md:order-first">
                <h1 class="text-2xl underline">
                    Interests
                </h1>
                <p class="text-base pt-4">
                    I have had a lifelong interest in technology, but I’m also deeply passionate about art, nature, and knowledge. 
                    Throughout primary school, I pursued visual arts. Mostly, I focused on drawing. Initially just graphite, although I’ve found that I prefer traditional ink now. 
                    I’ve also become increasingly interested in photography. 
                    Like with visual arts, I love music. I find it important to make time for myself to explore different genres, see live shows, and play myself.
                </p>
            </div>
        </div>
    </body>
</template>

<script setup>

import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

import guitar1 from '/assets/images/interests/guitar-1.webp'
import hiking1 from '/assets/images/interests/hiking-1.webp'
import hiking2 from '/assets/images/interests/hiking-2.webp'
import photography1 from '/assets/images/interests/photography-1.webp'
import photography2 from '/assets/images/interests/photography-2.webp'
import electronics1 from '/assets/images/interests/electronics-1.webp'
const interestPictures = [guitar1, hiking1, hiking2, photography1, photography2, electronics1];
const interestAlts = ['playing guitar, credit: John Grubbs rockslidephotography','hiking, photo of the black bear pass sign in Colorado',
'hiking, overlooking the Rio Grande in Whiterock New Mexico','photography, white butterfly on white flowers','photography, 2024 eclipse',
'electronics, hand soldered univibe guitar pedal'];

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