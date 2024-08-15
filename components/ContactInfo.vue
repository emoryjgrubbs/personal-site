<script setup lang="ts">

const email = 'emoryjgrubbs@gmail.com';

function handleEmail() {
    navigator.clipboard.writeText(email);
    //make some tool tip
}

</script>

<template>
    <div class="mt-5 mb-10">
        <h1 class="underline">
            Contact Information
        </h1>
        <div class="flex flex-row space-x-3 justify-evenly">  
            <button
            class=" justify-self-center"
            title="Email Address"
            @click="handleEmail">
                Email: {{ email }}
            </button>   
        </div>
    </div>
</template>
