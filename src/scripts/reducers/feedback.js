import _ from 'lodash';

export default function feedbackReducer(state = {}, action) {
	let newState = _.cloneDeep(state);
	switch(action.type) {
	case 'SHOW_FEEDBACK':
		newState.title = action.payload.title;
		newState.message = action.payload.message;
		newState.type = action.payload.type;
		return newState;
	case 'HIDE_FEEDBACK':
		newState = {};
		return newState;
	default:
		return state;
	}
}
