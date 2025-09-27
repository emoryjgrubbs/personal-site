let tagList: { sign: string; value: string }[];
export function useTagList(content: { tags: string }[]) {
	console.log("Building tag list..");
	let list = [];
	for (const element of content) {
		list.push(...element.tags);
	}
	list = [...new Set(list)];
	list.sort();
	list = list.map((element) => ({ sign: "p", value: element }));
	tagList = list;
	console.debug(
		"Tag list completed:\n" + list.map((element) => element.value)
	);
	return list;
}

const selectedTags: Ref<{ selectedTags: { sign: string; value: string }[] }> =
	ref({ selectedTags: [] });
export const useSelectedTags = () => {
	return selectedTags;
};

export function useClickedTag(value: string) {
	console.log("addingClickedTag: " + value);
	if (
		!selectedTags.value.selectedTags
			.map((element: { sign: string; value: string }) => element.value)
			.includes(value)
	) {
		const index = tagList.map((element) => element.value).indexOf(value);
		selectedTags.value.selectedTags.push(
			tagList[index] || { sign: "p", value: value }
		);
	}
}

const filteredElements: Ref<{}[]> = ref([]);
export const useFilteredElements = (
	allElements: { title: string; tags: string; dates: string }[]
) => {
	filteredElements.value = allElements;
	return filteredElements;
};

export function useUpdateElements(filterUpdate: { title: string }[]) {
	console.debug(
		"Element list updated:\n" + filterUpdate.map((element) => element.title)
	);
	filteredElements.value = filterUpdate;
}
