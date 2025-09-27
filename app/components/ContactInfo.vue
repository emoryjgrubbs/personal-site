<template>
	<div class="flex flex-col justify-center bg-black pt-5 pb-10 text-white">
		<h1
			class="text-text-light selection:text-text-dark text-center text-3xl font-semibold"
		>
			Contact Information
		</h1>
		<div class="flex flex-wrap justify-evenly pt-4 select-none">
			<button
				class="group flex w-96 flex-row justify-center space-x-2 justify-self-center pb-5 transition ease-in-out hover:scale-105 hover:cursor-pointer"
				title="Copy Email Address"
				@click="handleEmail"
			>
				<div>Email: {{ email }}</div>
				<div v-show="emailCopied" class="flex scale-125 items-center">
					<Icon name="famicons:clipboard" />
				</div>
			</button>
			<button
				class="group flex w-96 flex-row justify-center space-x-2 justify-self-center pb-5 transition ease-in-out hover:scale-105 hover:cursor-pointer"
				title="View LinkedIn"
				@click="handleLinkedIn"
			>
				<div>LinkedIn:</div>
				<div class="group-hover:underline">
					{{ linkedIn }}
				</div>
			</button>
			<button
				class="group flex w-96 flex-row justify-center space-x-2 justify-self-center pb-5 transition ease-in-out hover:scale-105 hover:cursor-pointer"
				title="View GitHub"
				@click="handleGitHub"
			>
				<div>GitHub:</div>
				<div class="group-hover:underline">
					{{ gitHub }}
				</div>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const email = "emoryjgrubbs@gmail.com";
const linkedIn = "linkedin.com/in/emory-grubbs";
const gitHub = "github.com/emoryjgrubbs";

let emailMessageTimeout;

const emailCopied = ref(false);

function handleEmail() {
	console.log("Copying Email to Clipboard");
	navigator.clipboard.writeText(email);
	emailCopied.value = true;
	emailMessageTimeout = setTimeout(emailAlert, 2500);
}
function handleLinkedIn() {
	console.log("Opening LinkedIn Profile");
	window.open(`https://www.${linkedIn}`, "_blank");
}
function handleGitHub() {
	console.log("Opening GitHub Profile");
	window.open(`https://${gitHub}`, "_blank");
}

function emailAlert() {
	emailCopied.value = false;
}
</script>
