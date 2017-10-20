import generic from '../../src/scripts/reducers/generic';

describe('paginaiton action tests', () => {
	it('Ignores other actions', () => {
		const beforeState = {};
		const returnState = generic(beforeState, {type: 'abc'});
		expect(returnState).toBe(beforeState);
	});

	it('Makes no modification if none needed', () => {
		const beforeState = {a: 1};
		const returnState = generic(beforeState, {type: 'GENERIC', 'generic.a': 1});
		expect(returnState).toBe(beforeState);
		expect(returnState.a).toBe(1);
	});

	it('Copies and modifies state deeply, but not more than necessary', () => {
		const c = {};
		const beforeState = {a: 1, c};
		const returnState = generic(beforeState, {type: 'GENERIC', 'generic.b.x': 1});
		expect(returnState).not.toBe(beforeState);
		expect(returnState.c).toBe(c);
		expect(returnState.a).toBe(1);
		expect(returnState.b.x).toBe(1);
	});
});

