<template>
    <div class="flex flex-col pt-5 pb-10 justify-center">
        <h1 class="underline selection:decoration-text-dark text-3xl font-semibold text-center">Contact Information</h1>
        <div class="flex flex-wrap space-x-9 justify-evenly pt-4">  
            <button
            class="group flex flex-row pb-5 space-x-2 justify-self-center hover:font-bold"
            title="Copy Email Address"
            @click="handleEmail">
                <div>
                    Email: {{ email }}
                </div>
                <div v-show="emailCopied" class="scale-125 flex items-center">
                    <ClipboardDocumentCheckIcon class="size-4 text-text-lg" />
                </div>
            </button>   
            <button
            class="group flex flex-row pb-5 space-x-2 justify-self-center hover:font-bold"
            title="View LinkedIn"
            @click="handleLinkedIn">
                <div>
                    LinkedIn: 
                </div>
                <div class="group-hover:underline">
                    {{ linkedIn }}
                </div>
            </button>   
            <button
            class="group flex flex-row pb-5 space-x-2 justify-self-center hover:font-bold"
            title="View GitHub"
            @click="handleGitHub">
                <div>
                    GitHub:
                </div>
                <div class="group-hover:underline">
                    {{ gitHub }}
                </div>

            </button>   
        </div>
    </div>
</template>

<script setup lang="ts">

import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline'

const email = 'emoryjgrubbs@gmail.com';
const linkedIn = 'linkedin.com/in/emory-grubbs';
const gitHub = 'github.com/emoryjgrubbs';

let emailMessageTimeout;

const emailCopied = ref(false);

function handleEmail() {
    navigator.clipboard.writeText(email);
    emailCopied.value = true;
    emailMessageTimeout = setTimeout(emailAlert, 2500);
}
function handleLinkedIn() {
    window.open(`https://www.${linkedIn}`, '_blank');
}
function handleGitHub() {
    window.open(`https://${gitHub}`, '_blank');
}

function emailAlert() {
    emailCopied.value = false;
}

</script>
