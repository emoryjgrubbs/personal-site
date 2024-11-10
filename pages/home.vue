<template>
    <title> Emory Grubbs - About Me </title>
    <div class="flex flex-col bg-lg text-center overscroll-contain">
        <!--title-->
        <h1 class=" mt-10 mb-5 text-4xl font-bold">Emory Grubbs</h1>
        <!--about me-->
        <div class="flex flex-row max-md:flex-col py-2 items-center mx-10 md:mx-14 lg:mx-20 mb-5">
            <img src="/assets/images/headshot/headshot-1.webp" alt="headshot, credit: John Grubbs rockslidephotography" class="w-7/12 md:w-5/12 md:px-6 max-md:mb-5 max-sm:w-9/12 drop-shadow-sm select-none" draggable="false" />
            <div class="w-7/12 md:px-6 max-sm:w-11/12">
                <h1 class="text-3xl font-semibold">About Me</h1>
                <p class="text-xl pt-4">I am a computer science senior, currently attending the University of Texas at Dallas. I have been accepted to the graduate program. 
                    And, I am involved with the Engineering Projects in Community Service program, which connects students with non-profits. 
                    Currently, I am a senior member of a team working on building a web app for the Comet Cupboard. The aim is to improve the checkout flow and provide better data on item use.</p>
            </div>
        </div>
        <!--interests-->
        <div class="flex flex-row max-md:flex-col py-2 items-center mx-10 md:mx-14 lg:mx-20 mb-20">
            <!--select-image-->
            <div class="flex items-center w-7/12 md:w-5/12 md:px-6 max-md:mb-5 relative max-sm:w-9/12">
                <button @click="interestIndexDown" title="Previous" class="z-10 text-4xl text-white absolute start-10 max-xl:start-5 max-md:-start-20 max-sm:-start-14 hover:scale-125">
                    <ChevronLeftIcon class="size-14 fill-white absolute z-20"/>
                    <ChevronLeftIcon class="size-14 opacity-45 stroke-black stroke-2"/>
                </button>
                <img :src="interestPictures[interestIndex]" :alt="interestAlts[interestIndex]" class="w-fit z-0 drop-shadow-sm select-none" draggable="false" />
                <button @click="interestIndexUp" title="Next" class="z-10 text-4xl text-white absolute end-10 max-xl:end-5 max-md:-end-20 max-sm:-end-14 hover:scale-125">
                    <ChevronRightIcon class="size-14 fill-white absolute z-20"/>
                    <ChevronRightIcon class="size-14 opacity-45 stroke-black stroke-2"/>
                </button>
            </div>
            <div class="w-7/12 md:px-6 md:order-first max-sm:w-11/12">
                <h1 class="text-3xl font-semibold">Interests</h1>
                <p class="text-xl pt-4">I have had a lifelong interest in technology, but I’m also deeply passionate about art, nature, and knowledge. 
                    Currently, I have been having a lot of fun with Linux, having recently switched my primary machine. 
                    Art has also been a constant in my life, having pursued visual arts throughout primary school. 
                    Mostly, I focused on drawing. Initially just graphite, although I’ve found that I prefer traditional ink now. 
                    I’ve also become increasingly interested in photography. Like with visual arts, I love music. 
                    And, I find it important to make time for myself to explore different genres, see live shows, and play myself. 
                    In addition, I try to do the little things I enjoy like brewing coffee, skateboarding, or just watching the birds fly.</p>
            </div>
        </div>
    </div>
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
