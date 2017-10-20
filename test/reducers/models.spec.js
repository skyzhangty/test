import modelsReducer, {allOf} from '../../src/scripts/reducers/models';

describe('Models Reducer', () => {
	it('initial state', () => {
		expect(modelsReducer(undefined, {})).toEqual({});
	});

	const loadAction = {
		type: 'LOAD',
		modelType: 'study',
		payload: [
			{id: 1, title: 'title', message: 'message'},
			{id: 2, title: 'abc', message: 'def'},
		],
	};

	it('Load', () => {
		const newState = modelsReducer(undefined, loadAction);
		const expectedNewState = {
			study: {
				1: {id: 1, title: 'title', message: 'message'},
				2: {id: 2, title: 'abc', message: 'def'},
			},
		};

		expect(newState).toEqual(expectedNewState);
	});

	it('Update', () => {
		const newState = modelsReducer(modelsReducer(undefined, loadAction), {
			type: 'LOAD',
			modelType: 'study',
			payload: [
				{id: 2, title: 'real title', message: 'real message'},
			],
		});
		const expectedNewState = {
			study: {
				1: {id: 1, title: 'title', message: 'message'},
				2: {id: 2, title: 'real title', message: 'real message'},
			},
		};

		expect(newState).toEqual(expectedNewState);
	});

	it('Unload', () => {
		const newState = modelsReducer(modelsReducer(undefined, loadAction), {
			type: 'UNLOAD',
			modelType: 'study',
			payload: [
				{id: 2},
			],
		});
		const expectedNewState = {
			study: {
				1: {id: 1, title: 'title', message: 'message'},
			},
		};

		expect(newState).toEqual(expectedNewState);
	});


	it('Unload From initial', () => {
		const newState = modelsReducer(undefined, {
			type: 'UNLOAD',
			modelType: 'study',
			payload: [
				{id: 2},
			],
		});
		const expectedNewState = {
			study: {},
		};

		expect(newState).toEqual(expectedNewState);
	});


	it('AllOf', () => {
		const newState = modelsReducer(undefined, loadAction);
		const acutal = new Set(allOf('study', newState));
		const expected = new Set([
			{id: 1, title: 'title', message: 'message'},
			{id: 2, title: 'abc', message: 'def'},
		]);
		expect(acutal).toEqual(expected);
	});

	it('AllOf on undefineds', () => {
		expect(allOf('study', undefined)).toEqual([]);
		expect(allOf('study', [])).toEqual([]);
	});
});