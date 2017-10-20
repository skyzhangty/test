import {GET_STUDY_LIST_SUCCESS} from '../actions/action.types';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
	case GET_STUDY_LIST_SUCCESS:
		return action.payload;
	default:
		return state;
	}
};
