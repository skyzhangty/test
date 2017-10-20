import {Route as RouteUnbound} from '../shared/router.dom';
import {ACTIVE_ROUTE, bindToRedux, fromState} from '../shared/redux.utils';

export default bindToRedux(RouteUnbound, {
	activeRoute: fromState(ACTIVE_ROUTE),
});
