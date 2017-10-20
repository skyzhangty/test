import {Link as LinkUnbound} from '../shared/router.dom';
import {ACTIVE_ROUTE, bindToRedux, fromState} from '../shared/redux.utils';
import router from '../router';

export default bindToRedux(LinkUnbound, {
	router,
	activeRoute: fromState(ACTIVE_ROUTE),
});
