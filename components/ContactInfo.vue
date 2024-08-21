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

<template>
    <div class="flex flex-col mt-5 mb-10 justify-center">
        <h1 class="underline text-2xl">
            Contact Information
        </h1>
        <div class="flex flex-wrap space-x-5 justify-evenly pt-4">  
            <button
            class="flex flex-row space-x-2 justify-self-center"
            title="Copy Email Address"
            @click="handleEmail">
                <div>
                    Email: {{ email }}
                </div>
                <div v-show="emailCopied" class="scale-125 flex items-center">
                    <ClipboardDocumentCheckIcon class="size-4 text-text-dark" />
                </div>
            </button>   
            <button
            class="flex flex-row space-x-2 justify-self-center"
            title="View LinkedIn"
            @click="handleLinkedIn">
                <div>
                    LikedIn: {{ linkedIn }}
                </div>
            </button>   
            <button
            class="flex flex-row space-x-2 justify-self-center"
            title="View GitHub"
            @click="handleGitHub">
                <div>
                    GitHub: {{ gitHub }}
                </div>
            </button>   
        </div>
    </div>
</template>
