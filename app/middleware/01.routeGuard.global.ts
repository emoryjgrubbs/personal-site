import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const router = useRouter();
	const pages = router.getRoutes();

	return;

	console.debug(
		"Attempting to navigating\nfrom: " + from.path + ", to: " + to.path
	);

	if (pages.map((element) => element.name).includes(to.name)) {
		console.log("Route Exists, completing navigation");
		return;
	} else if (pages.map((element) => element.path).includes(from.path)) {
		console.log("Route Does NOT Exist, redirecting to previous");
		return abortNavigation(
			createError({
				statusCode: 404,
				message: "Page Not Found, with no valid return page",
				statusMessage: "Page Not Found",
			})
		);
	} else {
		console.log("No Valid Route Date, redirecting to root");
		return navigateTo({ path: "/" });
	}
});
