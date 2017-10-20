/* eslint-disable */
const _ = require('underscore');

function lexicographic(a, b) {
	return (x, y) => {
		const r = a(x, y);
		if (r === 0) return b(x, y);
		return r;
	};
}

function lexicographicAll(comparators) {
	return comparators.reduce(lexicographic, () => 0);
}

function naturalCompare(x, y) {
	return x < y ? -1 : x > y ? 1 : 0;
}

function mappingForProp(handlerPayload, prop) {
	const resourceName = handlerPayload.urlParameters.$resourceName;
	const resourceMapping = handlerPayload.parameterMapper.RESOURCE_URL_PARAM_MAP[resourceName];
	return resourceMapping && resourceMapping[prop] || {};
}

const compareOnAttribute = handlerPayload => spec => {
	let [_prop, _order] = spec.split(':');
	const mapping = mappingForProp(handlerPayload, _prop);
	const prop = mapping.attribute || _prop;
	const order = _order || mapping.defaultOrder || 'desc';// "bigger" things tend to be interesting, so put them first.
	return (x, y) => (order === 'asc' ? 1 : -1) * naturalCompare(x[prop], y[prop]);
};

const sort = function (handlerPayload, handlerResponse) {
	if(!handlerPayload.urlParameters['sort-by']) return;
	const attributes = handlerPayload.urlParameters['sort-by'].split(',');

	const resource = JSON.parse(handlerResponse.body);
	if(!_.isArray(resource)) return;

	resource.sort(lexicographicAll(attributes.map(compareOnAttribute(handlerPayload))));

	handlerResponse.body = JSON.stringify(resource);
};

const paginate = function(handlerPayload, handlerResponse){
	//PAGINATION STARTS
	let page = handlerPayload.urlParameters['page'];
	let pageSize = handlerPayload.urlParameters['page-size'];
	const resource = JSON.parse(handlerResponse.body);

	if (isNaN(page) || isNaN(pageSize) || !resource || !_.isArray(resource)) {
		return handlerResponse;
	}

	page = Number(page);
	pageSize = Number(pageSize);

	if (page !== 0 && pageSize !== 0) {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const paginatedResult = {};
		paginatedResult.totalCount = resource.length;
		paginatedResult.page = resource.slice(start, end);
		handlerResponse.body = JSON.stringify(paginatedResult);
	}
	//PAGINATION ENDS
};

module.exports = function(handlerPayload, handlerResponse) {

	if (global.AUTH_PRINCIPAL) {
		console.log('authenticated setting roles header');
		handlerResponse.headers['x-user-roles'] = global.AUTH_PRINCIPAL.roles.join(',');
	}

	sort(handlerPayload, handlerResponse);
	paginate (handlerPayload, handlerResponse);

	return handlerResponse;
};
