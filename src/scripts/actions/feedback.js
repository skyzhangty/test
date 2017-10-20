export function showFeedback(title, message, type) {
	return {type: 'SHOW_FEEDBACK', payload: {title, message, type}};
}

export function hideFeedback() {
	return {type: 'HIDE_FEEDBACK'};
}

