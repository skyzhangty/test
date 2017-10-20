import _ from 'lodash';
import {ROUTER_HISTORY_SET, ROUTER_LOCATION_CHANGED} from '../actions/action.types';

const initialState = {
	location: {},
	history: {}
};

export default (state = initialState, action) => {
	const newState = _.cloneDeep(state);
	switch (action.type) {
	case ROUTER_HISTORY_SET:
		newState.history = action.payload;
		return newState; 
	case ROUTER_LOCATION_CHANGED:
		newState.location = action.payload;
		return newState; 
	default:
		return newState;
	}
};
