import {ROUTER_LOCATION_CHANGED,ROUTER_HISTORY_SET} from './action.types';

export function routerHistorySet(history) {
	return {type: ROUTER_HISTORY_SET, payload:history};
}

export function routerLocationChanged(location) {
	return {type: ROUTER_LOCATION_CHANGED, payload:location};
}

