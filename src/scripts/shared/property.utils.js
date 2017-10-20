import _ from 'lodash';

export function getDifferingKeys(a, b) {
	const diffingKeys = [];
	const keySet = {};
	_.keys(a).forEach(x => keySet[x] = undefined);
	_.keys(b).forEach(x => keySet[x] = undefined);
	_.keys(keySet).forEach(k => {
		if (a[k] !== b[k]) {
			diffingKeys.push(k);
		}
	});
	return diffingKeys;
}

/**
 * const eq = shallowEqualsFromSchema({
 *   key1: {}, // compare key1 deeply
 *   key2: { // compare key2 deeply, but also some of its embedded keys:
 *     key3: {}, // compare key2.key3 deeply
 *     key4: 'ignore' // ignore key2.key4; if it differs, the objects will still be considered equal
 *   },
 *  key5: 'ignore'
 * });
 *
 * eq({}, {}) ==> true
 * eq({a: 1}, {a: 2}) ==> false
 * eq({b: {}}, {b: {}}) ==> false (since {} !== {})
 * let x = {}; eq({b: x}, {b: x}) ==> true
 * eq({key5: 1}, {key5: 2}) ==> true (key5 is ignored)
 * eq({key1: {}}, {key1: {}}) ==> true (because key1 is compared deeply)
 * eq({key2: {key3: {a: 1}}}, {key2: {key3: {a: 1}}}) ==> true (because key2 and key2.key3 are compared deeply)
 *
 * @returns {function(*=, *=)} A function comparing objects shallowly, with ===.
 * If two keys' values differ, and they are specified as compared deeply, the shallow equals from schema is recursively
 * applied to the objects at the deeply compared key.
 */
export function shallowEqualsFromSchema(s) {
	const embeddedSchema = _.pickBy(s, x => typeof x !== 'string');
	const shallowEqualsFromEmbeddedSchema = _.mapValues(embeddedSchema, shallowEqualsFromSchema);
	const deepComparedKeys = _.keys(s).filter(k => s[k] !== 'ignore');
	const ignoredKeys = _.keys(s).filter(k => s[k] === 'ignore');
	return (a, b) => {
		const differingKeys = getDifferingKeys(a, b).filter(k => !ignoredKeys.includes(k));
		if (!_.every(differingKeys, k => _.includes(deepComparedKeys, k))) {
			return false;
		}
		return _.every(differingKeys, k => shallowEqualsFromEmbeddedSchema[k](a[k], b[k]));
	};
}

export const shallowEquals = shallowEqualsFromSchema({});

export function embeddedSet(obj, path, value) {
	let embedded = obj;
	const props = path.split(/\./);
	for (let i = 0; i < props.length - 1; i++) {
		const p = props[i];
		embedded = embedded[p] = embedded[p] || {};
	}
	const lastProp = props[props.length - 1];
	embedded[lastProp] = value;
}

export function embeddedGet(obj, path) {
	let value = obj;
	const props = path.split(/\./);
	for (let i = 0; i < props.length; i++) {
		if (typeof value !== 'object')
			return undefined;
		value = value[props[i]];
	}
	return value;
}

/**
 * Does not ensure embeddedHasOwnProperty(obj, path); only ensures that embeddedGet(obj, path) === value.
 * So, setting a path to undefined will not create that path as a side effect; since it doesn't exist and
 * embeddedGet already returns undefined,  no changes are made.
 */
export function immutableEmbeddedSet(obj, cb) {
	const originalToModified = new Map();
	const modifiedSet = new Set();

	function getModifiedVersion(o) {
		// When we walk through modified objects, we encounter other modified objects.
		// They should be used.
		if (modifiedSet.has(o)) {
			return o;
		}
		// If obj contains multiple references to the same object, we may encounter an unmodified object that already
		// has a modified version.
		// (If we encounter a modified object through the same path as before, we will actually see the modified object
		// not the unmodified one, since we walk through the modified objects, not the unmodified ones.)
		if(originalToModified.has(o)) {
			return originalToModified.get(o);
		}
		// Otherwise, we encounter old unmodified objects.  Copy them, register them, and return them.
		// They will be embedded in previously generated modified objects (unless they're obj itself)
		// and we may encounter them again.  See first 'if'.
		const copy = Object.assign({}, o);
		originalToModified.set(o, copy);
		modifiedSet.add(copy);
		return copy;
	}

	function setter(path, value) {
		if (embeddedGet(obj, path) === value) {
			// if we aren't actually going to change anything, then do nothing
			return;
		}
		// embedded is always a modified object
		let embedded = getModifiedVersion(obj);
		const props = path.split(/\./);
		for (let i = 0; i < props.length - 1; i++) {
			const p = props[i];
			embedded = embedded[p] = getModifiedVersion(embedded[p] || {});
		}
		const lastProp = props[props.length - 1];
		embedded[lastProp] = value;
	}

	cb(setter);

	// return the modified version of the root object, obj, unless there is no modified version, then just return it.
	return originalToModified.get(obj) || obj;
}
