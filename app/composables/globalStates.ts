export const useBreakoutBar = () =>
	useState<boolean>("breakoutBar", () => false);

export const useCondenseContent = () =>
	useState<boolean>("condenseContent", () => false);
export function useToggleCondense() {
	const condenseContent = useCondenseContent();
	condenseContent.value = !condenseContent.value;
	console.log("condenseContent toggled to: " + condenseContent.value);
}
