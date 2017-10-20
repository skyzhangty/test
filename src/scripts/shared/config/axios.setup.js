import axios from 'axios';
import store from '../../store';
import {ajaxStart, ajaxStop} from '../../actions/ajax';
import {hideFeedback} from '../../actions/feedback';
// import feedbackMessages from './feedback.messages';

// import {setUrl} from '../url.scheme';

function toQueryString(json) {
	const queryString = [];
	const stack = [['', json]];
	while (stack.length > 0) {
		const [prefix, o] = stack.pop();
		if (o === undefined)
			continue;
		Object.getOwnPropertyNames(o).forEach(p => {
			const value = o[p];
			const prop = prefix + p;
			if (Array.isArray(value)) {
				value.forEach(v => stack.push([`${prop}.`, v]));
			} else if (typeof value === 'object') {
				stack.push([`${prop}.`, value]);
			} else {
				queryString.push(`${prop}=${value}`);
			}
		});
	}
	return queryString.join('&');
}

const setupAxios =  () => {
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common['UMCS-Requestor'] = 'ajax-client';
	axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	axios.defaults.paramsSerializer = toQueryString;// arrays like a=1&a=2&a=3

	// Add a request interceptor
	axios.interceptors.request.use((config) => {
		// Do something before request is sent
		store.dispatch(ajaxStart());
		return config;
	}, (error) => 
		// Do something with request error
		 Promise.reject(error)
	);

	// Add a response interceptor
	axios.interceptors.response.use((response) => {
		// Do something with response data
		store.dispatch(ajaxStop());
		store.dispatch(hideFeedback());
		return response;
	}, (error) => {
		let redirectUrl = '';
		let feedbackName= '';
		switch(error.response.status) {
		case 401:
			redirectUrl = window.location.href;
			feedbackName = '401-protected-view';
			window.location.href=`/login/index.html#study-team?feedbackName=${feedbackName}&redirectUrl=${redirectUrl}`;
			break;
		default:
			break;
		}
		store.dispatch(ajaxStop());
		return Promise.reject(error);
	});
};
module.exports = setupAxios;
