/* eslint-disable no-case-declarations */
import {resolveRouteAndBindings} from '../shared/router';
import router from '../router';
import {setUrl} from '../shared/url.scheme';

export default (activeRoute = {}, action) => {
	switch (action.type) {
	case 'SET_ACTIVE_ROUTE':
		return action.activeRoute;
	case 'GOTO_ROUTE':
		const resolutionInfo = Object.assign({activeRoute}, action);
		const {name, bindings} = resolveRouteAndBindings(resolutionInfo);
		const url = router.urlFor(name, bindings);
		setUrl(url, action.state);
		return router.recognize(url);
	default:
		return activeRoute;
	}
};
