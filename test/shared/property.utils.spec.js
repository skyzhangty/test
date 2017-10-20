import {
	embeddedGet,
	embeddedSet,
	shallowEqualsFromSchema,
	immutableEmbeddedSet,
} from '../../src/scripts/shared/property.utils';

describe('Framework Util Tests', () => {

	it('embeddedSet works', () => {
		const o = {};
		embeddedSet(o, 'a.b', 'v');
		expect(o.a.b).toBe('v');
	});

	it('embeddedSet works without path', () => {
		const o = {};
		embeddedSet(o, 'a', 'v');
		expect(o.a).toBe('v');
	});

	it('embeddedSet multiple work', () => {
		const o = {};
		embeddedSet(o, 'a.b', 'x');
		embeddedSet(o, 'a.c', 'y');
		expect(o.a.b).toBe('x');
		expect(o.a.c).toBe('y');
	});

	it('embeddedGet works', () => {
		const o = {a: {b: 1}};
		expect(embeddedGet(o, 'a.b')).toBe(1);
	});

	it('embeddedGet works without path', () => {
		const o = {a: {b: 1}};
		expect(embeddedGet(o, 'a')).toBe(o.a);
	});

	it('shallowEqualsFromSchema', () => {
		const eq = shallowEqualsFromSchema({
			deep: {},
			ignored: 'ignore',
			deeper: {
				deep: {},
				ignored: 'ignore',
			},
		});

		expect(eq({a: 1}, {a: 1})).toBe(true);
		expect(eq({a: 1}, {a: 2})).toBe(false);
		expect(eq({ignored: 1}, {ignored: 2})).toBe(true);
		expect(eq({a: {}}, {a: {}})).toBe(false);
		expect(eq({deep: {}}, {deep: {}})).toBe(true);
		expect(eq({deep: {deep: {}}}, {deep: {deep: {}}})).toBe(false);
		expect(eq({deeper: {deep: {}}}, {deeper: {deep: {}}})).toBe(true);
		expect(eq({deeper: {ignored: 1}}, {deeper: {ignored: 2}})).toBe(true);
		expect(eq({a: 1}, {b: 1})).toBe(false);
	});

	it('immutableEmbeddedSet', () => {
		let o = {};
		let actual = immutableEmbeddedSet(o, set => {
			set('a', 1);
		});
		expect(actual).not.toBe(o);
		expect(actual.a).toBe(1);

		o = {x: {a: 1}, b: 2};
		actual = immutableEmbeddedSet(o, set => {
			set('b', 2);
			set('x.a', 1);
		});
		expect(actual).toBe(o);
		expect(actual.b).toBe(2);
		expect(actual.x).toBe(o.x);
		expect(actual.x.a).toBe(1);

		actual = immutableEmbeddedSet(o, set => {
			set('x.a', 2);
		});

		expect(actual).not.toBe(o);
		expect(actual.b).toBe(2);
		expect(actual.x).not.toBe(o.x);
		expect(actual.x.a).toBe(2);

		const c = {a: {b: 1, c: 2}, d: {}};
		o = {first: c, second: c};
		actual = immutableEmbeddedSet(o, set => {
			set('first.a.b', 9);
			set('second.a.c', 10);
		});

		expect(actual.first).toBe(actual.second);
		expect(actual.first.a.b).toBe(9);
		expect(actual.second.a.c).toBe(10);
		expect(actual.first.d).toBe(o.first.d);
	});
});
