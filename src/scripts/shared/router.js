/* eslint-disable no-cond-assign */
import RouteRecognizer from 'route-recognizer';

const PATH_VAR_REGEX = /[:*][^/]*/g;

function getPathVariables(path) {
	PATH_VAR_REGEX.lastIndex = 0;
	let match;
	const variableBindings = [];
	while ((match = PATH_VAR_REGEX.exec(path)) !== null) {
		const name = match[0].substring(1);
		variableBindings.push({name, startIndex: match.index, endIndex: PATH_VAR_REGEX.lastIndex});
	}
	variableBindings.reverse();
	// We reverse since we will replace the last variable first, etc.
	// This preserves the indexes we use to splice the bound value into the variable's place.
	// EG: (indexes of slashes in base 36)
	// /:abc/:def/:ghi ==> /:abc/:def/SOME_VALUE ==> /:abc/OTHER_VALUE/SOME_VALUE ==> /XXX/OTHER_VALUE/SOME_VALUE
	// 0    5    A     ==> 0    5    A           ==> 0    5           G           ==> 0   4           F
	variableBindings.names = variableBindings.map(v => v.name);
	return variableBindings;
}

function substitutePathVariableBindings(path, pathVariables, bindings) {
	// we assume pathVariables are last to first order.  See getPathVariables.
	pathVariables.forEach(pathVariable => {
		path = path.substring(0, pathVariable.startIndex) +
			bindings[pathVariable.name] +
			path.substring(pathVariable.endIndex);
	});
	return path;
}

export function resolveRouteAndBindings({activeRoute, name, bindings, relativeBindings}) {
	const {name: activeName, bindings: activeBindings} = activeRoute;

	if (!bindings) {
		if (relativeBindings || !name) bindings = activeBindings;
		else bindings = {};
	}
	if (!name) name = activeName;
	if (relativeBindings === null) relativeBindings = {};

	bindings = Object.assign({}, bindings, relativeBindings);

	Object.getOwnPropertyNames(bindings).forEach(k => {
		if (bindings[k] === undefined)
			delete bindings[k];
	});

	return {name, bindings};
}

export default class Router {
	constructor(routeMap) {
		this.routeMap = routeMap;
		Object.getOwnPropertyNames(routeMap).forEach(key => {
			routeMap[key].pathVariables = getPathVariables(routeMap[key].path);
		});

		this.internalRouter = new RouteRecognizer();
		Object.getOwnPropertyNames(routeMap).forEach(key => {
			this.internalRouter.add([{
				handler: key,
				path: routeMap[key].path,
			}]);
		});
	}

	recognize(url) {
		const matchedRoutes = this.internalRouter.recognize(url);
		if (matchedRoutes && matchedRoutes.length > 0) {
			const match = matchedRoutes[0];
			return {
				name: match.handler,
				bindings: Object.assign({}, matchedRoutes.queryParams, match.params),
			};
		}
		return {name: 'unknownUrl', bindings: {}};
	}

	urlFor(route, bindings) {
		let routeSpec = this.routeMap[route];
		if(routeSpec === undefined) {
			routeSpec = this.routeMap.unknownRoute;
			bindings = Object.assign({}, bindings, {routeName: route});
		}
		let url = substitutePathVariableBindings(routeSpec.path, routeSpec.pathVariables, bindings);
		const params = [];
		Object.getOwnPropertyNames(bindings).forEach(varName => {
			if (!routeSpec.pathVariables.names.includes(varName)) {
				params.push(`${varName}=${bindings[varName]}`);
			}
		});
		if (params.length) {
			url = `${url}?${params.join('&')}`;
		}
		return url;
	}
}
