import axios from 'axios';

export default class {
	static ajax(args) {
		const {method: method = 'GET', url, payload} = args;
		let params;
		let data = payload;
		if (method === 'GET') {
			params = payload;
			data = undefined;
		}
		const {token, cancel} = axios.CancelToken.source();
		const promise = axios.request({method, url, data, params, cancelToken: token}).then(x => x.data);
		promise.cancel = cancel;
		return promise;
	}
}