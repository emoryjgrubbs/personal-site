<script setup>

import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

//project data
const atc = reactive({
    name: 'ATC Patient Data',
    desc: 'atc test description',
    tags: ['autism treatment center', 'epics', 'utd', 'web', 'website', 'webdeb', 'db', 'database'],
    startDates: ['2024-06-03'],
    endDates: ['2024-08-07'],
    github: 'https://github.com/UTDallasEPICS/ATC-Patient-Data',
    images: ['/images/atc/Firefox_Screenshot_2024-08-18T10-53-54.601Z.png', '/images/atc/Firefox_Screenshot_2024-08-18T10-54-50.427Z.png', 
    '/images/atc/Firefox_Screenshot_2024-08-18T10-56-39.575Z.png', '/images/atc/Firefox_Screenshot_2024-08-18T10-57-52.223Z.png', 
    '/images/atc/Firefox_Screenshot_2024-08-18T10-58-09.579Z.png', '/images/atc/Firefox_Screenshot_2024-08-18T10-58-09.580z.png', 
    '/images/atc/Firefox_Screenshot_2024-08-18T11-00-03.438Z.png', '/images/atc/Firefox_Screenshot_2024-08-18T11-00-14.434Z.png'],
    alts: ['ATC log in page', 'ATC student search page', 'ATC student sessions page', 'ATC session data input', 'ATC student behavior page', 
    'ATC behavior creation', 'ATC employee page', 'ATC edit user'],
    index: 0,
    showImages: false,
});
const personalSite = reactive({
    name: 'Personal Website',
    desc: 'personal test description',
    tags: ['personal', 'web', 'website', 'webdeb'],
    startDates: ['2024-08-12'],
    endDates: ['now'],
    github: 'https://github.com/emoryjgrubbs/personal-site',
    images: [],
    alts: [],
    index: 0,
    showImages: false,
});
//array of projects
const projects = [personalSite, atc];

//image switch
function indexUp(project) {
    console.log(`next ${project.name} image`, project.index);
    if (project.index < project.images.length-1) {
        project.index += 1;
    }
    else {
        project.index = 0;
    }
}
function indexDown(project) {
    console.log(`previous ${project.name} image`, project.index);
    if (project.index > 0) {
        project.index -= 1;
    }
    else {
        project.index = project.images.length-1;
    }
}

function imagesMessage(project) {
    if (project.images.length >0) {
        return 'Show Project Images';
    }
    return 'This Project Has No Images'
}

function handleShowImages(project) {
    if (project.images.length > 0) {
        if (project.showImages) {
            project.showImages = false;
        }
        else {
            for(let i = 0; i < projects.length; i++) {
                projects[i].showImages = false;
            }
            project.showImages = true;
        }
    }
}

//search
const searchTerm = ref("");

function checkInclusion(project) { //note: this could cause slow downs, but should be fine with the limited number of projects
    // return all projects, if there is no search
    if(!searchTerm.value) {
        return true;
    }
    // for over all letters in search term, if $ check tags, if @ check date
    // build name from un-included elements in search term for the title search
    let name = "";
    let special = "";
    let checkSpecial = "";
    let quoted = false;
    for (let i = 0; i < searchTerm.value.length; i++) {
        // start tag, check special if one exists
        if (searchTerm.value.at(i) === '$') {
            if (checkSpecial === "tag" && !checkTag(project, special)) {
                return false;
            }
            if (checkSpecial === "date" && !cheeckDates(project, special)) {
                return false;
            }
            special = "";
            checkSpecial = "tag";
        }
        // start date, check special if one exists
        else if (searchTerm.value.at(i) === '@') {
            if (checkSpecial === "tag" && !checkTag(project, special)) {
                return false;
            }
            if (checkSpecial === "date" && !cheeckDates(project, special)) {
                return false;
            }
            special = "";
            checkSpecial = "date";
        }
        // if a special exists, add to it or do the search
        else if (checkSpecial) {
            if (searchTerm.value.at(i) === "\'" || searchTerm.value.at(i) === "\"") {
                if (special === "") {
                    quoted = true;
                }
                else {
                    if (checkSpecial === "tag" && !checkTag(project, special)) {
                        return false;
                    }
                    if (checkSpecial === "date" && !cheeckDates(project, special)) {
                        return false;
                    }
                    special = "";
                    checkSpecial = "";
                    quoted = false;
                }
            }
            // if quoted, include spaces
            else if (quoted) {
                special += searchTerm.value.at(i);
            }
            // if space, end and search, otherwise add element
            else {
                if (searchTerm.value.at(i) === " ") {
                    if (checkSpecial === "tag" && !checkTag(project, special)) {
                        return false;
                    }
                    if (checkSpecial === "date" && !cheeckDates(project, special)) {
                        return false;
                    }
                    special = "";
                    checkSpecial = "";
                }
                else {
                    special += searchTerm.value.at(i);
                }
            }
        }
        // add to name
        else {
            // allow for space after quoted tag/date
            if (!(i > 0 && (searchTerm.value.at(i-1) === "\'" || searchTerm.value.at(i-1) === "\"") && searchTerm.value.at(i) === " ")) {
                name += searchTerm.value.at(i)
            }
        }
    }
    // if search ended in a special search it
    if (checkSpecial === "tag" && !checkTag(project, special)) {
        return false;
    }
    if (checkSpecial === "date" && !cheeckDates(project, special)) {
        return false;
    }
    if (name && (name === " " || !project.name.toLowerCase().includes(name.toLowerCase()))) {
        return false;
    }
    return true;
}
function checkTag(project, tag) {
    return project.tags.includes(tag.toLowerCase());
}
function cheeckDates(project, dateString) {
    for (let i = 0; i < project.startDates.length; i++){
        if(cheeckDate(project, dateString, i)){
            return true;
        }
    }
    return false;
}
function cheeckDate(project, dateString, i) { 
    if (dateString.length == 21) {
        let startDate = dateString.substring(0,10);
        let endDate = dateString.substring(11,21);
        // check if project start or end are in range
        if(validateDate(startDate) && validateDate(endDate)) {
            // project start is after end search date
            if (project.startDates[i].substring(0,4) > endDate.substring(0,4)) {
                return false;
            }
            else if (project.startDates[i].substring(0,4) == endDate.substring(0,4)){
                if (project.startDates[i].substring(5,7) > endDate.substring(5,7)) {
                    return false;
                }
                else if (project.startDates[i].substring(5,7) == endDate.substring(5,7)) {
                    if (project.startDates[i].substring(8,10) > endDate.substring(8,10)) {
                        return false;
                    }
                }
            }
            // project end is before the start search date
            if (project.endDates[i] !== "now") {
                if (project.endDates[i].substring(0,4) < startDate.substring(0,4)) {
                    return false;
                }
                else if (project.endDates[i].substring(0,4) == startDate.substring(0,4)){
                    if (project.endDates[i].substring(5,7) < startDate.substring(5,7)) {
                        return false;
                    }
                    else if (project.endDates[i].substring(5,7) == startDate.substring(5,7)) {
                        if (project.endDates[i].substring(8,10) < startDate.substring(8,10)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    else if (dateString.length == 10) {
        let date = dateString.substring(0,10);
        // check if project start and end cover date
        if(validateDate(date)) {
            // start is after date
            if (project.startDates[i].substring(0,4) > date.substring(0,4)) {
                return false;
            }
            else if (project.startDates[i].substring(0,4) == date.substring(0,4)){
                if (project.startDates[i].substring(5,7) > date.substring(5,7)) {
                    return false;
                }
                else if (project.startDates[i].substring(5,7) == date.substring(5,7)) {
                    if (project.startDates[i].substring(8,10) > date.substring(8,10)) {
                        return false;
                    }
                }
            }
            // end is before date
            if (project.endDates[i] !== "now") {
                if (project.endDates[i].substring(0,4) < date.substring(0,4)) {
                    return false;
                }
                else if (project.endDates[i].substring(0,4) == date.substring(0,4)){
                    if (project.endDates[i].substring(5,7) < date.substring(5,7)) {
                        return false;
                    }
                    else if (project.endDates[i].substring(5,7) == date.substring(5,7)) {
                        if (project.endDates[i].substring(8,10) < date.substring(8,10)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    else {
        let startDate = dateString.substring(0,10);
        let endDate = dateString.substring(11,21);
        // check if project end is in range
        if (validateDate(startDate) && (endDate.toLowerCase().includes("now") || endDate.toLowerCase().includes("current") || endDate.toLowerCase().includes("ongoing"))) {
            if (project.endDates[i] !== "now") {
                if (project.endDates[i].substring(0,4) < startDate.substring(0,4)) {
                    return false;
                }
                else if (project.endDates[i].substring(0,4) == startDate.substring(0,4)){
                    if (project.endDates[i].substring(5,7) < startDate.substring(5,7)) {
                        return false;
                    }
                    else if (project.endDates[i].substring(5,7) == startDate.substring(5,7)) {
                        if (project.endDates[i].substring(8,10) < startDate.substring(8,10)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        if ((startDate.toLowerCase().includes("now") || startDate.toLowerCase().includes("current") || startDate.toLowerCase().includes("ongoing")) && project.endDates[i] === "now") {
            return true;
        }
        return false;
    }
}
function validateDate(date) {
    const datePattern = /\d{4}.\d{2}.\d{2}/; //regular expression of format YYYY_MM_DD
    return datePattern.test(date);
}

const showInstructions = ref(false);

//on click
function handleGithubClick(github) {
    window.open(`${github}`, '_blank');
}
</script>

<template>
    <body class="flex-auto bg-bg text-center overscroll-contain">
        <!--title-->
        <h1 class=" mt-10 mb-5 text-4xl font-bold">
            Projects
        </h1>
        <!--search-->
        <div class="mx-20">
            <input placeholder="Project Search" title="Project Search" v-model="searchTerm" class="w-2/3 text-center" />
            <p @:mouseenter="showInstructions = true" @:mouseleave="showInstructions = false" class="">
                <div class="inline-flex">
                    How to use
                </div>
                <div v-show="showInstructions" class="inline-flex whitespace-pre-wrap">
                    : 
                </div>
                <div v-show="showInstructions" class="inline-flex">
                    The search field includes projects if the title, tags, dates match the project's data
                </div>
                <div v-show="showInstructions" class="whitespace-pre-line text-center">
                    {{ `Tags : $tag or $'some tag'
                    Dates : @YYYY-MM-DD or @YYYY-MM-DD>YYYY-MM-DD
                    Quotes : allow for spaces in special terms` }}
                </div>
            </p>
        </div>
        <!--list-of-projects-->
        <ul v-for="project in projects" v-show="checkInclusion(project)" class="mb-5">
            <div class="flex flex-col py-2 items-center justify-center mx-20 mb-5">
                <!--select-image-->
                <div v-if="project.showImages" class="flex items-center w-9/12 mb-5 relative">
                    <button @click="indexDown(project)" title="Previous" v-if="project.images.length>1" class="z-10 text-4xl text-white absolute start-10 hover:scale-125">
                        <ChevronLeftIcon class="size-10 fill-white absolute z-20"/>
                        <ChevronLeftIcon class="size-10 opacity-45 stroke-black stroke-2"/>
                    </button>
                    <NuxtImg :src="project.images[project.index]" :alt="project.alts[project.index]" class="w-fit z-0" draggable="false" />
                    <button @click="indexUp(project)" title="Next" v-if="project.images.length>1" class="z-10 text-4xl text-white absolute end-10 hover:scale-125">
                        <ChevronRightIcon class="size-10 fill-white absolute z-20"/>
                        <ChevronRightIcon class="size-10 opacity-45 stroke-black stroke-2"/>
                    </button>
                </div>
                <div :title="imagesMessage(project)" @click="handleShowImages(project)" class="contents hover:cursor-pointer">
                    <h1 class="text-2xl underline mb-5 order-first">
                        {{ project.name }}
                    </h1>
                    <p>
                        {{ project.desc }}
                    </p>
                </div>
            </div>
            <div v-if="project.github !== 'CONFIDENTIAL'" title="Open Project Github" @click="handleGithubClick(project.github)" class="hover:cursor-pointer">
                Github: {{ project.github }}
            </div>
            <div v-else>
                I am unable to share code from this project.
            </div>
        </ul>
    </body>
</template>