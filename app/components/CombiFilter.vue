<template>
	<div class="flex flex-col gap-2 text-lg sm:text-xl">
		<!--Combined Search Line-->
		<label>
			Combined
			<span class="max-sm:hidden">{{ props.placeholder }}</span> Search
			<div class="flex w-full flex-row gap-2">
				<input
					placeholder="Tile, $Tags, @Dates, or ^Order"
					v-model="searchTerm"
					class="bg-columbia-blue h-8 w-full rounded-l-md px-3"
				/>
				<button
					class="bg-columbia-blue flex cursor-pointer rounded-r-md px-3 transition ease-in-out hover:scale-105"
					@click="toggleBreakoutBar"
					title="Expanded Filters"
				>
					<Icon name="famicons:options" class="self-center" />
				</button>
			</div>
		</label>

		<!--Breakout Options Lines-->
		<div v-if="showBreakoutBar" class="flex flex-col gap-2 lg:flex-row">
			<!--Input for Tags-->
			<label class="flex w-full grow-9 flex-col">
				Tag Input
				<div class="flex flex-col gap-2 md:flex-row">
					<Combobox v-model="selectedTags" multiple v-slot="{ open }">
						<div class="relative flex min-w-1/2 grow">
							<ComboboxInput
								placeholder="Tags"
								@change="tagTerm = $event.target.value.trim()"
								class="bg-columbia-blue h-8 w-full pr-10 pl-3"
								:class="{
									'rounded-t-md lg:rounded-tr-none': open,
									'rounded-md lg:rounded-r-none': !open,
								}"
							/>
							<ComboboxButton
								class="absolute right-3 flex h-full"
							>
								<Icon
									name="famicons:search"
									class="self-center"
								/>
							</ComboboxButton>
							<ComboboxOptions
								class="bg-alice-blue absolute z-20 mt-11 flex max-h-128 w-full min-w-64 flex-col gap-1 overflow-y-scroll overscroll-contain rounded-b-md"
							>
								<ComboboxOption
									v-show="filteredTagList == 0"
									disabled="true"
									class="bg-columbia-blue h-8 rounded-b-md px-3"
									title="No Tags to Select"
								>
									No Matching Tags
								</ComboboxOption>
								<ComboboxOption
									v-for="(tag, index) in filteredTagList"
									class=""
									title="Select Tag"
									v-slot="{ active, selected }"
									:value="tag"
								>
									<div
										class="h-8 cursor-pointer px-3 capitalize"
										:class="{
											'bg-alice-blue': active,
											'bg-rich-black text-white':
												active && selected,
											'bg-black text-white':
												!active && selected,
											'bg-columbia-blue':
												!active && !selected,
										}"
									>
										{{ tag.value }}
									</div>
								</ComboboxOption>
							</ComboboxOptions>
						</div>
					</Combobox>
					<div
						v-show="selectedTags.length > 0"
						class="flex flex-row gap-2 overflow-x-scroll"
					>
						<div
							v-for="(tag, index) in selectedTags"
							class="flex h-8 gap-2 pr-2 pl-3"
							:class="
								tag.sign == 'n'
									? 'bg-black text-white'
									: 'bg-columbia-blue'
							"
						>
							<button
								class="cursor-pointer whitespace-nowrap capitalize"
								@click="invertTag(index)"
								:title="
									tag.sign == 'n'
										? 'Invert Tag to Include'
										: 'Invert Tag to Exclude'
								"
							>
								{{ tag.value }}
							</button>
							<button
								@click.stop="removeTag(index)"
								class="flex"
								title="Remove Tag From Filters"
							>
								<Icon
									name="famicons:close"
									class="cursor-pointer self-center"
								/>
							</button>
						</div>
					</div>
				</div>
			</label>
			<div class="flex flex-col gap-2 md:grow-1 md:flex-row">
				<!--Input for Date Range-->
				<label>
					Date Range
					<div class="flex flex-row gap-2 text-sm sm:text-xl">
						<input
							v-model="dateTerm.start"
							type="date"
							class="bg-columbia-blue h-8 w-full rounded-l-md px-3 lg:rounded-none"
							:max="dateTerm.end || today"
						/>
						<input
							v-model="dateTerm.end"
							type="date"
							class="bg-columbia-blue h-8 w-full rounded-r-md px-3 md:rounded-none"
							:min="dateTerm.start"
							:max="today"
						/>
					</div>
				</label>

				<!--Input for Sort Order-->
				<label class="w-full">
					Order
					<Listbox v-slot="{ open }" defaultValue="Default">
						<div class="relative min-w-64 cursor-pointer text-left">
							<ListboxButton
								class="w-full"
								title="Show Sorting Options"
							>
								<div
									class="bg-columbia-blue flex h-8 w-full cursor-pointer px-3 transition ease-in-out hover:scale-102"
									:class="{
										'rounded-t-md md:rounded-tl-none': open,
										'rounded-md md:rounded-l-none': !open,
									}"
								>
									<div
										v-if="sortTerm.value == 'Default'"
										class="text-gray-500"
									>
										Default
									</div>
									<div class="flex flex-row gap-3" v-else>
										<button
											@click.stop="invertSort"
											:title="
												sortTerm.sign == 'n'
													? 'Switch to Descending'
													: 'Switch to Ascending'
											"
											class="flex cursor-pointer"
										>
											<Icon
												:name="
													sortTerm.sign == 'n'
														? 'famicons:arrow-up'
														: 'famicons:arrow-down'
												"
												class="self-center"
											/>
										</button>
										{{ sortTerm.value }}
									</div>
									<Icon
										name="famicons:chevron-expand"
										class="absolute right-3 flex h-full self-center"
									/>
								</div>
							</ListboxButton>

							<!--Sort Order Dropdown-->
							<ListboxOptions
								class="bg-alice-blue w-64-full absolute z-20 mt-3 flex w-full flex-col gap-1 overflow-hidden rounded-b-md"
							>
								<ListboxOption
									value="Default"
									v-slot="{ active, selected }"
									@click="selectOrder('Default')"
									title="Use Default Sort Order"
								>
									<div
										class="flex h-8 cursor-pointer flex-row gap-3 px-3 capitalize"
										:class="{
											'bg-alice-blue': active,
											'bg-rich-black text-white':
												active && selected,
											'bg-black text-white':
												!active && selected,
											'bg-columbia-blue':
												!active && !selected,
										}"
									>
										Default
									</div>
								</ListboxOption>
								<ListboxOption
									value="Alphabetical"
									v-slot="{ active, selected }"
									@click="selectOrder('Alphabetical')"
									title="Sort Alphabetically"
								>
									<div
										class="flex h-8 cursor-pointer flex-row gap-3 px-3 capitalize"
										:class="{
											'bg-alice-blue': active,
											'bg-rich-black text-white':
												active && selected,
											'bg-black text-white':
												!active && selected,
											'bg-columbia-blue':
												!active && !selected,
										}"
									>
										<Icon
											:name="
												sortTerm.value ==
													'Alphabetical' &&
												sortTerm.sign == 'n'
													? 'famicons:arrow-up'
													: 'famicons:arrow-down'
											"
											class="self-center"
										/>
										Alphabetical
									</div>
								</ListboxOption>
								<ListboxOption
									value="Date Uploaded"
									v-slot="{ active, selected }"
									@click="selectOrder('Date Uploaded')"
									title="Sort By Date Uploaded"
								>
									<div
										class="flex h-8 cursor-pointer flex-row gap-3 px-3 capitalize"
										:class="{
											'bg-alice-blue': active,
											'bg-rich-black text-white':
												active && selected,
											'bg-black text-white':
												!active && selected,
											'bg-columbia-blue':
												!active && !selected,
										}"
									>
										<Icon
											:name="
												sortTerm.value ==
													'Date Uploaded' &&
												sortTerm.sign == 'n'
													? 'famicons:arrow-up'
													: 'famicons:arrow-down'
											"
											class="self-center"
										/>
										Date Uploaded
									</div>
								</ListboxOption>
								<ListboxOption
									value="Date Modified"
									v-slot="{ active, selected }"
									@click="selectOrder('Date Modified')"
									title="Sort By Date Modified"
								>
									<div
										class="flex h-8 cursor-pointer flex-row gap-3 px-3 capitalize"
										:class="{
											'bg-alice-blue': active,
											'bg-rich-black text-white':
												active && selected,
											'bg-black text-white':
												!active && selected,
											'bg-columbia-blue':
												!active && !selected,
										}"
									>
										<Icon
											:name="
												sortTerm.value ==
													'Date Modified' &&
												sortTerm.sign == 'n'
													? 'famicons:arrow-up'
													: 'famicons:arrow-down'
											"
											class="self-center"
										/>
										Date Modified
									</div>
								</ListboxOption>
							</ListboxOptions>
						</div>
					</Listbox>
				</label>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	Combobox,
	ComboboxLabel,
	ComboboxInput,
	ComboboxButton,
	ComboboxOptions,
	ComboboxOption,
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue";

const props = defineProps({
	content: Array,
	tagList: Array,
	placeholder: String,
});

const emit = defineEmits(["searchUpdate"]);

//page control variables & functions
const showBreakoutBar = ref(false);
function toggleBreakoutBar() {
	showBreakoutBar.value = !showBreakoutBar.value;
}

//input filter variables
const searchTerm = ref("");
const tagTerm = ref("");
const dateTerm = ref({ start: "", end: "" });
const sortTerm = ref({ sign: "p", value: "Default" });

// tag list displayed in combobox
const filteredTagList = computed(() => {
	if (tagTerm.value == null || tagTerm.value == "") {
		return props.tagList || [];
	}
	return props.tagList.filter((item) =>
		item.value.toLowerCase().includes(tagTerm.value.toLowerCase())
	);
});

// list of tags selected by user with tagTerm/combobox
const selectedTags = ref([]);
/*
    exposed because the parent page needs to be able to directly add 
    tags to the list when the user clicks on a displayed tag
*/
defineExpose({
	selectedTags,
});

// controlling selectedTags
function invertTag(index) {
	if (selectedTags.value[index].sign == "n") {
		selectedTags.value[index].sign = "p";
	} else {
		selectedTags.value[index].sign = "n";
	}
}
function removeTag(index) {
	selectedTags.value.splice(index, 1);
}

// get current date for limiting date range input
const today = (() => {
	const today = new Date();
	// offset of local timezone (in milliseconds)
	const offset = today.getTimezoneOffset() * 60 * 1000;
	const rectifiedDay = new Date(today.getTime() - offset);
	return rectifiedDay.toISOString().split("T")[0];
})();

// controlling sortTerm
function invertSort() {
	if (sortTerm.value.sign == "n") {
		sortTerm.value.sign = "p";
	} else {
		sortTerm.value.sign = "n";
	}
}
function selectOrder(value) {
	if (sortTerm.value.value == value) {
		if (sortTerm.value.sign == "p") {
			sortTerm.value.sign = "n";
		} else {
			sortTerm.value.sign = "p";
		}
	} else {
		sortTerm.value.sign = "p";
		sortTerm.value.value = value;
	}
}

// compute the filters based on the search input
const filter = computed(() => {
	let title = "";
	let tags = [];
	let dates = [];
	let sorts = [];

	let box = "n";
	let quote = "";
	let escape = false;
	let sign = "p";
	let current = "";

	// build filter from combined search
	const lowercaseSearchTerm = searchTerm.value.toLowerCase();
	for (const char of lowercaseSearchTerm) {
		// base case, looking haven't seen any special characters yet
		if (box == "n") {
			// escaped (act as standard no matter what)
			if (escape) {
				sign = "p";
				title = title.concat(char);
				escape = false;
			}
			// negate next control sequence
			else if (char == "!") {
				sign = "n";
			}
			// switch to appropriate box
			else if (char == "$") {
				box = "t";
			} else if (char == "@") {
				box = "d";
			} else if (char == "^") {
				box = "s";
			}
			// set escape flag
			else if (char == "\\") {
				escape = true;
			}
			// standard behavior
			else {
				sign = "p";
				title = title.concat(char);
			}
		}

		// adding a tag to filter by
		else if (box == "t") {
			if (quote == "" && char == " ") {
				tags.push({ sign: sign, value: current });
				sign = "p";
				current = "";
				box = "n";
			} else if (quote == "" && char == '"') {
				quote = '"';
			} else if (quote == '"' && char == '"') {
				quote = "";
			} else if (quote == "" && char == "\'") {
				quote = "\'";
			} else if (quote == "\'" && char == "\'") {
				quote = "";
			} else {
				current = current.concat(char);
			}
		}

		// adding a date to filter by
		else if (box == "d") {
			if (quote == "" && char == " ") {
				dates.push({ sign: sign, value: current });
				sign = "p";
				current = "";
				box = "n";
			} else if (quote == "" && char == '"') {
				quote = '"';
			} else if (quote == '"' && char == '"') {
				quote = "";
			} else if (quote == "" && char == "\'") {
				quote = "\'";
			} else if (quote == "\'" && char == "\'") {
				quote = "";
			} else {
				current = current.concat(char);
			}
		}

		// adding a sort order
		else if (box == "s") {
			if (quote == "" && char == " ") {
				sorts.push({ sign: sign, value: current });
				sign = "p";
				current = "";
				box = "n";
			} else if (quote == "" && char == '"') {
				quote = '"';
			} else if (quote == '"' && char == '"') {
				quote = "";
			} else if (quote == "" && char == "\'") {
				quote = "\'";
			} else if (quote == "\'" && char == "\'") {
				quote = "";
			} else {
				current = current.concat(char);
			}
		}
	}

	// if there is a bit left of a tag or date add it
	if (box == "t" && current.length > 0) {
		tags.push({ sign: sign, value: current });
	} else if (box == "d" && current.length > 0) {
		dates.push({ sign: sign, value: current });
	} else if (box == "s" && current.length > 0) {
		sorts.push({ sign: sign, value: current });
	}

	current = "";

	// append tag field to filters
	if (selectedTags.value.length > 0) {
		tags.push(...selectedTags.value);
	}

	// build filter from breakout date inputs
	// check that at lease one of the breakout date inputs is entered
	if (dateTerm.value.start != "" || dateTerm.value.end != "") {
		let breakoutDate;
		if (dateTerm.value.start == "") {
			breakoutDate = "1970-01-01";
		} else {
			breakoutDate = dateTerm.value.start;
		}
		if (dateTerm.value.end == "") {
			breakoutDate = breakoutDate.concat(">now");
		} else {
			breakoutDate = breakoutDate.concat(">", dateTerm.value.end);
		}

		dates.push({ sign: "p", value: breakoutDate });
	}

	if (sortTerm.value.value != "Default") {
		let breakoutOrder = sortTerm.value.value;
		if (sortTerm.value.value == "Alphabetical") {
			breakoutOrder = "alpha";
		} else if (sortTerm.value.value == "Date Uploaded") {
			breakoutOrder = "start";
		} else if (sortTerm.value.value == "Date Modified") {
			breakoutOrder = "end";
		}
		sorts.push({ sign: sortTerm.value.sign, value: breakoutOrder });
	}

	// return filters object
	return { title: title.trim(), tags: tags, dates: dates, sorts: sorts };
});

// use filters object on content list
const searchResults = computed(() => {
	let filteredContent = [];

	for (let i = 0; i < props.content.length; i++) {
		checks: {
			// check for title inclusion
			if (
				!props.content[i].title
					.toLowerCase()
					.includes(filter.value.title)
			) {
				break checks;
			}

			// check for tag inclusion
			for (const tag of filter.value.tags) {
				if (
					tag.sign == "p" &&
					!props.content[i].tags.includes(tag.value)
				) {
					break checks;
				} else if (
					tag.sign == "n" &&
					props.content[i].tags.includes(tag.value)
				) {
					break checks;
				}
			}

			// check date for inclusion
			for (const date of filter.value.dates) {
				if (
					date.sign == "p" &&
					!dateIncludes(props.content[i].dates, date.value)
				) {
					break checks;
				} else if (
					date.sign == "n" &&
					dateIncludes(props.content[i].dates, date.value)
				) {
					break checks;
				}
			}
			filteredContent.push(props.content[i]);
		}
	}

	for (const sort of filter.value.sorts) {
		let lowercaseSortValue = sort.value.toLowerCase();
		if (lowercaseSortValue == "alpha") {
			if (sort.sign == "p") {
				filteredContent.sort(function (a, b) {
					let x = a.title;
					let y = b.title;
					if (x < y) {
						return -1;
					}
					if (x > y) {
						return 1;
					}
					return 0;
				});
			} else if (sort.sign == "n") {
				filteredContent.sort(function (a, b) {
					let x = a.title;
					let y = b.title;
					if (x < y) {
						return 1;
					}
					if (x > y) {
						return -1;
					}
					return 0;
				});
			}
		} else if (
			lowercaseSortValue == "start" ||
			lowercaseSortValue == "upload" ||
			lowercaseSortValue == "original"
		) {
			if (sort.sign == "p") {
				filteredContent.sort(function (a, b) {
					let x = a.dates[0].start;
					let y = b.dates[0].start;
					if (x < y) {
						return -1;
					}
					if (x > y) {
						return 1;
					}
					return 0;
				});
			} else if (sort.sign == "n") {
				filteredContent.sort(function (a, b) {
					let x = a.dates[0].start;
					let y = b.dates[0].start;
					if (x < y) {
						return 1;
					}
					if (x > y) {
						return -1;
					}
					return 0;
				});
			}
		} else if (
			lowercaseSortValue == "end" ||
			lowercaseSortValue == "modify" ||
			lowercaseSortValue == "modified" ||
			lowercaseSortValue == "latest"
		) {
			if (sort.sign == "p") {
				filteredContent.sort(function (a, b) {
					let x = a.dates[a.dates.length - 1].end;
					let y = b.dates[b.dates.length - 1].end;
					if (x < y) {
						return -1;
					}
					if (x > y) {
						return 1;
					}
					return 0;
				});
			} else if (sort.sign == "n") {
				filteredContent.sort(function (a, b) {
					let x = a.dates[a.dates.length - 1].end;
					let y = b.dates[b.dates.length - 1].end;
					if (x < y) {
						return 1;
					}
					if (x > y) {
						return -1;
					}
					return 0;
				});
			}
		}
	}

	return filteredContent;
});

function dateIncludes(contentDate, filterDate) {
	if (filterDate.length == 21) {
		let filterStart = filterDate.substring(0, 10);
		let filterEnd = filterDate.substring(11, 21);
		// check if content start or end are in range
		if (validateDate(filterStart) && validateDate(filterEnd)) {
			for (let i = 0; i < contentDate.length; i++) {
				// content start is after end search date
				if (
					contentDate[i].start.substring(0, 4) >
					filterEnd.substring(0, 4)
				) {
					return false;
				} else if (
					contentDate[i].start.substring(0, 4) ==
					filterEnd.substring(0, 4)
				) {
					if (
						contentDate[i].start.substring(5, 7) >
						filterEnd.substring(5, 7)
					) {
						return false;
					} else if (
						contentDate[i].start.substring(5, 7) ==
						filterEnd.substring(5, 7)
					) {
						if (
							contentDate[i].start.substring(8, 10) >
							filterEnd.substring(8, 10)
						) {
							return false;
						}
					}
				}
				// content end is before the start search date
				if (contentDate[i].end !== "now") {
					if (
						contentDate[i].end.substring(0, 4) <
						filterStart.substring(0, 4)
					) {
						return false;
					} else if (
						contentDate[i].end.substring(0, 4) ==
						filterStart.substring(0, 4)
					) {
						if (
							contentDate[i].end.substring(5, 7) <
							filterStart.substring(5, 7)
						) {
							return false;
						} else if (
							contentDate[i].end.substring(5, 7) ==
							filterStart.substring(5, 7)
						) {
							if (
								contentDate[i].end.substring(8, 10) <
								filterStart.substring(8, 10)
							) {
								return false;
							}
						}
					}
				}
			}
			return true;
		} else {
			return false;
		}
	} else if (filterDate.length == 10) {
		let date = filterDate.substring(0, 10);
		// check if content start and end cover date
		if (validateDate(date)) {
			for (let i = 0; i < contentDate.length; i++) {
				// start is after date
				if (
					contentDate[i].start.substring(0, 4) > date.substring(0, 4)
				) {
					return false;
				} else if (
					contentDate[i].start.substring(0, 4) == date.substring(0, 4)
				) {
					if (
						contentDate[i].start.substring(5, 7) >
						date.substring(5, 7)
					) {
						return false;
					} else if (
						contentDate[i].start.substring(5, 7) ==
						date.substring(5, 7)
					) {
						if (
							contentDate[i].start.substring(8, 10) >
							date.substring(8, 10)
						) {
							return false;
						}
					}
				}
				// end is before date
				if (contentDate[i].end !== "now") {
					if (
						contentDate[i].end.substring(0, 4) <
						date.substring(0, 4)
					) {
						return false;
					} else if (
						contentDate[i].end.substring(0, 4) ==
						date.substring(0, 4)
					) {
						if (
							contentDate[i].end.substring(5, 7) <
							date.substring(5, 7)
						) {
							return false;
						} else if (
							contentDate[i].end.substring(5, 7) ==
							date.substring(5, 7)
						) {
							if (
								contentDate[i].end.substring(8, 10) <
								date.substring(8, 10)
							) {
								return false;
							}
						}
					}
				}
			}
			return true;
		} else {
			return false;
		}
	} else {
		let filterStart = filterDate.substring(0, 10);
		let filterEnd = filterDate.substring(11, 21);
		// check if content end is in range
		if (
			validateDate(filterStart) &&
			(filterEnd.toLowerCase().includes("now") ||
				filterEnd.toLowerCase().includes("current") ||
				filterEnd.toLowerCase().includes("ongoing"))
		) {
			for (let i = 0; i < contentDate.length; i++) {
				if (contentDate[i].end !== "now") {
					if (
						contentDate[i].end.substring(0, 4) <
						filterStart.substring(0, 4)
					) {
						return false;
					} else if (
						contentDate[i].end.substring(0, 4) ==
						filterStart.substring(0, 4)
					) {
						if (
							contentDate[i].end.substring(5, 7) <
							filterStart.substring(5, 7)
						) {
							return false;
						} else if (
							contentDate[i].end.substring(5, 7) ==
							filterStart.substring(5, 7)
						) {
							if (
								contentDate[i].end.substring(8, 10) <
								filterStart.substring(8, 10)
							) {
								return false;
							}
						}
					}
				}
			}
			return true;
		}
		for (let i = 0; i < contentDate.length; i++) {
			if (
				(filterStart.toLowerCase().includes("now") ||
					filterStart.toLowerCase().includes("current") ||
					filterStart.toLowerCase().includes("ongoing")) &&
				contentDate[i].end == "now"
			) {
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

watch(searchResults, (newResults) => {
	emit("searchUpdate", newResults);
});
</script>
