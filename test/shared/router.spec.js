import Router, {resolveRouteAndBindings} from '../../src/scripts/shared/router';

describe('Router', () => {
	const router = new Router({
		postList: {
			path: '/posts',
		},
		postDetails: {
			path: '/posts/:id',
		},
		unknownRoute: {
			path: '/unknown-route'
		}
	});


	it('Recognizes simple route', () => {
		const binding = router.recognize('/posts');
		expect(binding).toEqual({
			name: 'postList',
			bindings: {},
		});
	});
	it('Recognizes path parameters', () => {
		const binding = router.recognize('/posts/1');
		expect(binding).toEqual({
			name: 'postDetails',
			bindings: {
				id: '1',
			},
		});
	});
	it('Parses query parameters', () => {
		const binding = router.recognize('/posts?page=1');
		expect(binding).toEqual({
			name: 'postList',
			bindings: {
				page: '1',
			},
		});
	});
	it('Prefers path variables over query parameters', () => {
		const binding = router.recognize('/posts/1?id=2&more=true');
		expect(binding).toEqual({
			name: 'postDetails',
			bindings: {
				id: '1',
				more: 'true',
			},
		});
	});
	it('Recognizes unknown urls as the unknownUrl route', () => {
		const binding = router.recognize('/some-route');
		expect(binding).toEqual({
			name: 'unknownUrl',
			bindings: {},
		});
	});
	it('Renders urls based on bindings', () => {
		const url = router.urlFor('postDetails', {
			id: 1,
		});
		expect(url).toBe('/posts/1');
	});
	it('Renders excess bindings into the query parameters', () => {
		const url = router.urlFor('postDetails', {
			id: 1,
			more: true,
		});
		expect(url).toBe('/posts/1?more=true');
	});
	it('Renders unknown routes as the unknownRoute route', () => {
		const url = router.urlFor('some-route', {a: 1});
		expect(url).toBe('/unknown-route?a=1&routeName=some-route');
	});
});

describe('ResolveRouteNameAndBindings', () => {
	const router = new Router({
		postList: {
			path: '/posts',
		},
		postDetails: {
			path: '/posts/:id',
		},
	});

	it('relativeBindings can clear bindings', () => {
		const {name, bindings} = resolveRouteAndBindings({
			activeRoute: {
				name: 'postList',
				bindings: {a: 1},
			},
			relativeBindings: {
				a: undefined,
			},
		});
		expect(router.urlFor(name, bindings)).toBe('/posts');
	});
});
