const expand = reactive({
	src: "",
	alt: "",
	open: false,
});
export const useExpand = () => {
	return expand;
};

export function useMinimize() {
	expand.open = false;
}
export function useMaximize(image: { src: string; alt: string }) {
	expand.src = image.src;
	expand.alt = image.alt;
	expand.open = true;
}
