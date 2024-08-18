<script setup lang="ts">

import { ClipboardDocumentCheckIcon } from '@heroicons/vue/16/solid'

const email = 'emoryjgrubbs@gmail.com';

let emailMessageTimeout;

const emailCopied = ref(false);

function handleEmail() {
    navigator.clipboard.writeText(email);
    emailCopied.value = true;
    emailMessageTimeout = setTimeout(emailAlert, 2500);
}

function emailAlert() {
    emailCopied.value = false;
}

</script>

<template>
    <div class="mt-5 mb-10">
        <h1 class="underline text-2xl">
            Contact Information
        </h1>
        <div class="flex flex-row space-x-3 justify-evenly">  
            <button
            class="flex flex-row space-x-2 justify-self-center"
            title="Copy Email Address"
            @click="handleEmail">
                <div>
                    Email: {{ email }}
                </div>
                <div v-show="emailCopied" class="scale-125 flex items-center">
                    <ClipboardDocumentCheckIcon class="size-4 fill-text-dark" />
                </div>
            </button>   
        </div>
    </div>
</template>
