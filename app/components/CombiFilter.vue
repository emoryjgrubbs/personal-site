<template>
    <input :placeholder="props.placeholder" :title="props.placeholder" v-model="searchTerm" class="bg-columbia-blue outline-black w-full text-2xl rounded-md px-3"/>

    <p> content = {{ props.content }} </p>
    <p> title = {{ filter.title }} </p>
    <p> tags = {{ filter.tags }} </p>
    <p> dates = {{ filter.dates }} </p>
    <p> filtered content = {{ searchResults }} </p>
</template>

<script lang="ts" setup>
const props = defineProps({
    content: Array,
    placeholder: String,
});

const searchTerm = ref("");

// compute the filters based on the search input
const filter = computed(() => {
    let title = "";
    let tags = [];
    let dates = [];

    let box = "n";
    let quote = "";
    let escape = false;
    let sign = "p";
    let current = "";

    const lowercaseTerm = searchTerm.value.toLowerCase();
    for (const char of lowercaseTerm) {
        // base case, looking haven't seen any special characters yet
        if (box == "n") {
            // escaped (act as standard no matter what)
            if (escape) { sign = "p"; title = title.concat(char); escape = false; }

            // negate next control sequence
            else if (char == "!") { sign = "n"; }

            // switch to appropriate box
            else if (char == "$") { box = "t"; }
            else if (char == "@") { box = "d"; }
            // set escape flag 
            else if (char == "\\") { escape = true; }

            // standard behavior
            else { sign = "p"; title = title.concat(char); }
        }
        // adding a tag to filter by
        else if (box == "t") {
            if (quote == "" && char == " ") {
                tags.push({sign: sign, value: current});
                sign = "p";
                current = "";
                box = "n";
            }
            else if (quote == "" && char == "\"") { quote = "\"" }
            else if (quote == "\"" && char == "\"") { quote = "" }
            else if (quote == "" && char == "\'") { quote = "\'" }
            else if (quote == "\'" && char == "\'") { quote = "" }

            else { current = current.concat(char); }
        }
        // adding a date to filter by
        else if (box == "d") {
            if (quote == "" && char == " ") {
                dates.push({sign: sign, value: current});
                sign = "p";
                current = "";
                box = "n";
            }
            else if (quote == "" && char == "\"") { quote = "\"" }
            else if (quote == "\"" && char == "\"") { quote = "" }
            else if (quote == "" && char == "\'") { quote = "\'" }
            else if (quote == "\'" && char == "\'") { quote = "" }

            else { current = current.concat(char); }
        }
    }
    // if there is a bit left of a tag or date add it
    if (box == "t" && current.length > 0) {
        tags.push({sign: sign, value: current});
        sign = "p";
    }
    else if (box == "d" && current.length > 0) {
        dates.push({sign: sign, value: current});
        sign = "p";
    }

    // return filters object
    return { title: title.trim(), tags: tags, dates: dates };
});

// use filters object on content list
const searchResults = computed(() => {
    let filteredContent = [];

    console.log("");
    for (let i = 0; i < props.content.length; i++) {
        console.log(props.content[i].title);
        checks: {
            // check for title inclusion
            if (!props.content[i].title.toLowerCase().includes(filter.value.title)) {
                break checks;
            }

            // check for tag inclusion
            for (const tag of filter.value.tags) {
                if (tag.sign == "p" && !props.content[i].tags.includes(tag.value)) {
                    break checks;
                }
                else if (tag.sign =="n" && props.content[i].tags.includes(tag.value)) {
                    break checks;
                }
            }

            // check date for inclusion
            for (const date of filter.value.dates) {
                if (date.sign == "p" && !dateIncludes(props.content[i].dates, date.value)) {
                    break checks;
                }
                else if (date.sign == "n" && dateIncludes(props.content[i].dates, date.value)) {
                    break checks;
                }
            }
            filteredContent.push(props.content[i]);
        }
    }

    return filteredContent;
});

function dateIncludes(contentDate, filterDate) {
    if (filterDate.length == 21) {
        let filterStart = filterDate.substring(0,10);
        let filterEnd = filterDate.substring(11,21);
        // check if content start or end are in range
        if(validateDate(filterStart) && validateDate(filterEnd)) {
            for (let i = 0; i < contentDate.length; i++) {
                // content start is after end search date
                if (contentDate[i].start.substring(0,4) > filterEnd.substring(0,4)) {
                    return false;
                }
                else if (contentDate[i].start.substring(0,4) == filterEnd.substring(0,4)){
                    if (contentDate[i].start.substring(5,7) > filterEnd.substring(5,7)) {
                        return false;
                    }
                    else if (contentDate[i].start.substring(5,7) == filterEnd.substring(5,7)) {
                        if (contentDate[i].start.substring(8,10) > filterEnd.substring(8,10)) {
                            return false;
                        }
                    }
                }
                // content end is before the start search date
                if (contentDate[i].end !== "now") {
                    if (contentDate[i].end.substring(0,4) < filterStart.substring(0,4)) {
                        return false;
                    }
                    else if (contentDate[i].end.substring(0,4) == filterStart.substring(0,4)){
                        if (contentDate[i].end.substring(5,7) < filterStart.substring(5,7)) {
                            return false;
                        }
                        else if (contentDate[i].end.substring(5,7) == filterStart.substring(5,7)) {
                            if (contentDate[i].end.substring(8,10) < filterStart.substring(8,10)) {
                                return false;
                            }
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
    else if (filterDate.length == 10) {
        let date = filterDate.substring(0,10);
        // check if content start and end cover date
        if(validateDate(date)) {
            for (let i = 0; i < contentDate.length; i++) {
                // start is after date
                if (contentDate[i].start.substring(0,4) > date.substring(0,4)) {
                    return false;
                }
                else if (contentDate[i].start.substring(0,4) == date.substring(0,4)){
                    if (contentDate[i].start.substring(5,7) > date.substring(5,7)) {
                        return false;
                    }
                    else if (contentDate[i].start.substring(5,7) == date.substring(5,7)) {
                        if (contentDate[i].start.substring(8,10) > date.substring(8,10)) {
                            return false;
                        }
                    }
                }
                // end is before date
                if (contentDate[i].end !== "now") {
                    if (contentDate[i].end.substring(0,4) < date.substring(0,4)) {
                        return false;
                    }
                    else if (contentDate[i].end.substring(0,4) == date.substring(0,4)){
                        if (contentDate[i].end.substring(5,7) < date.substring(5,7)) {
                            return false;
                        }
                        else if (contentDate[i].end.substring(5,7) == date.substring(5,7)) {
                            if (contentDate[i].end.substring(8,10) < date.substring(8,10)) {
                                return false;
                            }
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
        let filterStart = filterDate.substring(0,10);
        let filterEnd = filterDate.substring(11,21);
        // check if content end is in range
        if (validateDate(filterStart) && (filterEnd.toLowerCase().includes("now") || filterEnd.toLowerCase().includes("current") || filterEnd.toLowerCase().includes("ongoing"))) {
            for (let i = 0; i < contentDate.length; i++) {
                if (contentDate[i].end !== "now") {
                    if (contentDate[i].end.substring(0,4) < filterStart.substring(0,4)) {
                        return false;
                    }
                    else if (contentDate[i].end.substring(0,4) == filterStart.substring(0,4)){
                        if (contentDate[i].end.substring(5,7) < filterStart.substring(5,7)) {
                            return false;
                        }
                        else if (contentDate[i].end.substring(5,7) == filterStart.substring(5,7)) {
                            if (contentDate[i].end.substring(8,10) < filterStart.substring(8,10)) {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        }
        for (let i = 0; i < contentDate.length; i++) {
            if ((filterStart.toLowerCase().includes("now") || filterStart.toLowerCase().includes("current") || filterStart.toLowerCase().includes("ongoing")) && contentDate[i].end === "now") {
                return true;
            }
        }
        return false;
    }
}
function validateDate(date) {
    const datePattern = /\d{4}.\d{2}.\d{2}/; //regular expression of format YYYY_MM_DD
    return datePattern.test(date);
}
</script>
