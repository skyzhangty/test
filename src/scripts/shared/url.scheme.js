/**
 * This module encapsulates the format of the url and how we change the url bar in the browser.
 *
 * Here, "url" means conceptual, "internal" url, and "link" means external, "real" absolute url without the domain
 * name.
 *
 * Internal url:
 *
 * /abc/def?x=y&z=10
 *
 * External link:
 *
 * /#abc/def?x=y&z=10
 */

export function getUrlFromLocation(location) {
	// location could be window.location.
	return `/${location.hash.substring(1)}`;
}

export function getLinkFromUrl(url) {
	return `/study-team/#${url.substring(1)}`;
}

export function setUrl(url, state) {
	history.pushState(state, undefined, getLinkFromUrl(url));
}

export function subscribeToUrl(receiveNewUrl) {
	function onPopState(event) {
		return receiveNewUrl(getUrlFromLocation(window.location), event.state);
	}

	window.onpopstate = onPopState;

	onPopState({});
}
