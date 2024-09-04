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
        <ul v-for="project in projects" v-show="checkInclusion(project)" class="mb-20">
            <div class="flex flex-col py-2 items-center justify-center mx-20 max-sm:mx-10 mb-5">
                <!--select-image-->
                <div v-if="project.showImages" class="flex items-center w-9/12 max-md:w-11/12 mb-5 relative">
                    <button @click="indexDown(project)" title="Previous" v-if="project.images.length>1" class="z-10 text-4xl text-white absolute -start-10 sm:-start-20 hover:scale-125">
                        <ChevronLeftIcon class="size-10 fill-white absolute z-20"/>
                        <ChevronLeftIcon class="size-10 opacity-45 stroke-black stroke-2"/>
                    </button>
                    <img :src="project.images[project.index]" :alt="project.alts[project.index]" class="w-fit z-0" draggable="false" />
                    <button @click="indexUp(project)" title="Next" v-if="project.images.length>1" class="z-10 text-4xl text-white absolute -end-10 sm:-end-20 hover:scale-125">
                        <ChevronRightIcon class="size-10 fill-white absolute z-20"/>
                        <ChevronRightIcon class="size-10 opacity-45 stroke-black stroke-2"/>
                    </button>
                </div>
                <!--unexpanded-project-->
                <h1 class="text-2xl underline mt-5 mb-5 order-first">
                    {{ project.name }}
                </h1>
                <button v-if="project.images.length>0" title="Show Porject Images" @click="project.showImages = !project.showImages" class="mb-5 bg-nav text-text-light px-3 py-1">
                    <div v-show="!project.showImages">
                        show images
                    </div>
                    <div v-show="project.showImages">
                        hide images
                    </div>
                </button>
                <p>
                    {{ project.desc }}
                </p>
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

<script setup>

import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

//project data
import personalHome from '/assets/images/personal-site/home.webp'
import personalProjects from '/assets/images/personal-site/projects.webp'
import personalTags from '/assets/images/personal-site/tags.webp'
import personalDates from '/assets/images/personal-site/dates.webp'
const personalSite = reactive({
    name: 'Personal Website',
    desc: `Using the knowledge I gained from working on the ATC project, 
        I created this website from scratch using vue and tailwind. With my purpose being to both have a place to display things 
        I’ve worked on, and to improve my understanding of front end/UI development. With front end being the area of web development 
        I felt unsure of coming off the ATC project, and this has changed that.`,
    tags: ['personal', 'web', 'website', 'webdeb'],
    startDates: ['2024-08-12'],
    endDates: ['2024-09-03'],
    github: 'https://github.com/emoryjgrubbs/personal-site',
    images: [personalHome, personalProjects, personalTags, personalDates],
    alts: ['Personal website home page', 'Personal website projects pages', 'Personal website tags search', 'Personal website dates search'],
    index: 0,
    showImages: false,
});
import atcLogin from '/assets/images/atc/login.webp'
import atcStudent from '/assets/images/atc/student.webp'
import atcCreateUser from '/assets/images/atc/createBehavior.webp'
import atcUpdateUser from '/assets/images/atc/updateUser.webp'
import atcSessions from '/assets/images/atc/sessions.webp'
import atcData from '/assets/images/atc/data.webp'
import atcNote from '/assets/images/atc/note.webp'
import atcBehavior from '/assets/images/atc/behavior.webp'
import atcCreateBehavior from '/assets/images/atc/createBehavior.webp'
const atc = reactive({
    name: 'ATC Patient Data',
    desc: `This is the project that I worked on during my first semester in EPICS, which had a number of issues. 
        The code we inherited was non-functional, and neither the team or mentors were able to contact the sponsor. 
        Despite that, I am very proud of what we were able to accomplish in the short time we had. Nobody on the team had any web development experience, 
        and we only had 11 weeks to turn the project around. I personally had a hand in nearly every aspect of the project. 
        This includes the database schema, user search, user creation/updating, APIs, session search, and session data input/autosave. 
        I was also the team leader, and worked to keep the project on schedule and assist my teammates where needed.`,
    tags: ['autism treatment center', 'epics', 'utd', 'web', 'website', 'webdeb', 'db', 'database'],
    startDates: ['2024-06-03'],
    endDates: ['2024-08-07'],
    github: 'https://github.com/UTDallasEPICS/ATC-Patient-Data',
    images: [atcLogin, atcStudent, atcCreateUser, atcUpdateUser, atcSessions, 
        atcData, atcNote, atcBehavior, atcCreateBehavior],
    alts: ['ATC log in page', 'ATC student search page', 'ATC student create', 'ATC employee update', 'ATC student sessions page', 'ATC session data input', 
        'ATC session note input', 'ATC student behavior page', 'ATC behavior creation'],
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