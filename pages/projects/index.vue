<script setup>
//project data
const atc = {
    name: 'ATC Patient Data',
    desc: 'atc test description',
    thoughts: 'atc test thoughts',
    tags: ['Autism treatment center', 'EPICs', 'UTD'],
    startDate: '2024-06-03',
    endDate: '2024-08-07',
    github: 'https://github.com/UTDallasEPICS/ATC-Patient-Data',
};
const personalSite = {
    name: 'Personal Website',
    desc: 'personal test desc',
    thoughts: 'personal test thoughts',
    tags: ['personal'],
    startDate: '2024-08-12',
    endDate: 'now', //need a better place holder for ongoing projects
    github: 'https://github.com/emoryjgrubbs/personal-site',
};
//array of projects
const projects = [personalSite, atc];

//search
const searchTerm = ref();

function handleProjectClick(project) {
    //take them to the project page
}
function handleGithubClick(github) {
    window.location.href = `${github}`;
}
</script>

<template>
    <body class="flex-auto bg-bg text-center overscroll-contain">
        <!--title-->
        <h1 class=" mt-10 mb-5 text-3xl">
            Projects
        </h1>
        <!--search-->
        <div>

        </div>
        <!--list of projects-->
        <ul v-for="project in projects" v-if="!searchTerm" class="py-5">
            <div v-on:click="handleProjectClick(project)" class="hover:cursor-pointer">
                <h1>
                    {{ project.name }}
                </h1>
                <p>
                    {{ project.desc }}
                </p>
            </div>
            <div v-on:click="handleGithubClick(project.github)" class="hover:cursor-pointer">
                Github: {{ project.github }}
            </div>
        </ul>
    </body>
</template>