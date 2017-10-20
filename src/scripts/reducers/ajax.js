const initialState = {
	isSendingAjaxRequest: false
};
export default function ajaxReducer(state = initialState, action) {
	switch(action.type) {
	case 'AJAX_START':
		return {isSendingAjaxRequest: true};
	case 'AJAX_STOP':
		return {isSendingAjaxRequest: false};
	default:
		return state;
	}
}
