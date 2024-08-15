<script setup>
//project data
const atc = {
    name: 'ATC Patient Data',
    desc: 'atc test description',
    thoughts: 'atc test thoughts',
    tags: ['autism treatment center', 'epics', 'utd'],
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
const searchTerm = ref("");

function checkInclusion(project) { //note: this could cause slow downs, but should be fine with the limited number of projects
    if(!searchTerm.value) {
        return true;
    }
    if (project.name.toLowerCase().includes(searchTerm.value.toLowerCase())) {
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
            if (checkSpecial === "tag" && checkTag(project, special)) {
                return true;
            }
            if (checkSpecial === "date" && cheeckDate(project, special)) {
                return true;
            }
            special = "";
            checkSpecial = "tag";
        }
        // start date, check special if one exists
        else if (searchTerm.value.at(i) === '@') {
            if (checkSpecial === "tag" && checkTag(project, special)) {
                return true;
            }
            if (checkSpecial === "date" && cheeckDate(project, special)) {
                return true;
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
                    if (checkSpecial === "tag" && checkTag(project, special)) {
                        return true;
                    }
                    if (checkSpecial === "date" && cheeckDate(project, special)) {
                        return true;
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
                    if (checkSpecial === "tag" && checkTag(project, special)) {
                        return true;
                    }
                    if (checkSpecial === "date" && cheeckDate(project, special)) {
                        return true;
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
    if (checkSpecial === "tag" && checkTag(project, special)) {
        return true;
    }
    if (checkSpecial === "date" && cheeckDate(project, special)) {
        return true;
    }
    if (name && name !== " " && project.name.toLowerCase().includes(name.toLowerCase())) {
        return true;
    }
    return false;
}
function checkTag(project, tag) {
    return project.tags.includes(tag.toLowerCase());
}
function cheeckDate(project, dateString) {
    if (dateString.length == 21) {
        let startDate = dateString.substring(0,10);
        let endDate = dateString.substring(11,21);
        // check if project start or end are in range
        if(validateDate(startDate) && validateDate(endDate)) {
            // project start is after end search date
            if (project.startDate.substring(0,4) > endDate.substring(0,4)) {
                return false;
            }
            else if (project.startDate.substring(0,4) == endDate.substring(0,4)){
                if (project.startDate.substring(5,7) > endDate.substring(5,7)) {
                    return false;
                }
                else if (project.startDate.substring(5,7) == endDate.substring(5,7)) {
                    if (project.startDate.substring(8,10) > endDate.substring(8,10)) {
                        return false;
                    }
                }
            }
            // project end is before the start search date
            if (project.endDate !== "now") {
                if (project.endDate.substring(0,4) < startDate.substring(0,4)) {
                    return false;
                }
                else if (project.endDate.substring(0,4) == startDate.substring(0,4)){
                    if (project.endDate.substring(5,7) < startDate.substring(5,7)) {
                        return false;
                    }
                    else if (project.endDate.substring(5,7) == startDate.substring(5,7)) {
                        if (project.endDate.substring(8,10) < startDate.substring(8,10)) {
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
            if (project.startDate.substring(0,4) > date.substring(0,4)) {
                return false;
            }
            else if (project.startDate.substring(0,4) == date.substring(0,4)){
                if (project.startDate.substring(5,7) > date.substring(5,7)) {
                    return false;
                }
                else if (project.startDate.substring(5,7) == date.substring(5,7)) {
                    if (project.startDate.substring(8,10) > date.substring(8,10)) {
                        return false;
                    }
                }
            }
            // end is before date
            if (project.endDate !== "now") {
                if (project.endDate.substring(0,4) < date.substring(0,4)) {
                    return false;
                }
                else if (project.endDate.substring(0,4) == date.substring(0,4)){
                    if (project.endDate.substring(5,7) < date.substring(5,7)) {
                        return false;
                    }
                    else if (project.endDate.substring(5,7) == date.substring(5,7)) {
                        if (project.endDate.substring(8,10) < date.substring(8,10)) {
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
            if (project.endDate !== "now") {
                if (project.endDate.substring(0,4) < startDate.substring(0,4)) {
                    return false;
                }
                else if (project.endDate.substring(0,4) == startDate.substring(0,4)){
                    if (project.endDate.substring(5,7) < startDate.substring(5,7)) {
                        return false;
                    }
                    else if (project.endDate.substring(5,7) == startDate.substring(5,7)) {
                        if (project.endDate.substring(8,10) < startDate.substring(8,10)) {
                            return false;
                        }
                    }
                }
            }
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
function handleProjectClick(project) {
    //take them to the project page
    //fake by replacing the content, capture backbutton
}
function handleGithubClick(github) {
    window.location.href = `${github}`;
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
            <div v-on:mouseenter="showInstructions = true" v-on:mouseleave="showInstructions = false" class="">
                <p class="inline-flex">
                    How to use
                </p>
                <p v-show="showInstructions" class="inline-flex">
                    : instructions...
                </p>
            </div>
        </div>
        <!--list of projects-->
        <ul v-for="project in projects" v-show="checkInclusion(project)" class="py-5">
            <div v-on:click="handleProjectClick(project)" class="hover:cursor-pointer">
                <h1 class="text-2xl underline">
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