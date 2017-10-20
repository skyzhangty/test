import _ from 'lodash';
import {connect} from 'react-redux';
import {embeddedGet, embeddedSet} from './property.utils';
import {forEachOwnProperty} from './lang.utils';

export function bindToProps(propNameToValueResolver) {
	return (state, ownProps) => {
		const props = {};
		Object.assign(props, ownProps);
		forEachOwnProperty(propNameToValueResolver, (propName, resolver) => {
			let value;
			if (resolver.REDUX_PROP_BINDER) {
				value = resolver(state, ownProps);
			} else {
				value = resolver;
			}
			embeddedSet(props, propName, value);
		});
		return props;
	};
}

export function bindProps(getState, propSpecs) {
	return bindToProps(propSpecs)(getState(), {});
}

export function bindToRedux(component, propDefinitions) {
	const props = {};
	const actions = {};
	forEachOwnProperty(propDefinitions, (propName, value) => {
		if (propName.startsWith('on')) {
			actions[propName] = value;
		} else {
			props[propName] = value;
		}
	});
	return connect(bindToProps(props), actions)(component);
}

/**
 * bindToRedux allows you to bind actions and props simultaneously, like:
 *
 * bindToRedux(Component, {
 *   prop1: fromState(STATE_CONST),
 *   prop2: fromState(STATE_CONST2, x => transform(x)),
 *   prop3: fromQueryParam(QUERY_PARAM),
 *   prop4: "someConstant",
 *   prop5: HelperComponent,
 *   prop6: <HelperComponent>,
 *   // to bind a complex object, obj = { a: fromState(ST1), b: { c: fromState(ST2) } }, do like:
 *   'obj.a': fromState(ST1),
 *   'obj.b.c': fromState(ST2),
 *   // but for simple object-constants, you can do:
 *   obj2: { a: 1, b: { c: 2 } }
 *   // callbacks must start with "on".
 *   onCallback() { ... },
 *   onOtherCallback: actionCallback({ configuration }),
 * });
 *
 * Action callbacks must start with "on", and they must return an action, which is dispatched to the store.  If you
 * want to dispatch many actions, return an "async" action; see the thunk middleware.
 *
 * Your component accesses these exactly as they are named, like:
 *
 * this.props.prop1
 * this.props.obj.b.c
 * this.props.onCallback(arg1, arg2)
 *
 * Since action callbacks must start with "on", it is not possible to bind an action callback to a prop not starting
 * with "on".  But, this makes sense, callbacks in the DOM always start with "on", like "onclick", "onchange", etc.
 *
 * You can bind _functions_ to props _not_ starting with "on", but they're return value is not dispatched to the store.
 * Similarly, you cannot bind _functions_ to props _starting_ with "on"; instead, bind an action callback which returns
 * an async action which never calls dispatch.  But, you should probably never be passing down to components plain old
 * functions that don't dispatch actions.
 *
 *
 * The fromState function takes a path to a place in the state.  These should be constants so you can easily change
 * them, like:
 *
 * const STATE_SLOT1 = 'generic.pages.aPage.scrollPosition'
 *
 *
 * You can use bindProps in async actions like below, which looks very similar to binding a component to redux, but
 * operates on the state itself.  You cannot bind action callbacks right now though.  But, you already have
 * dispatch, so.  Right now, it's a bit redundant syntax, since the variable name and object key can't be combined.
 * Maybe we'll have a fix for that in the future.
 *
 * const myAsyncAction = ({dispatch, getState}) => {
 *   const {prop1, prop2} = bindProps(getState, {
 *     prop1: fromState(STATE_CONST),
 *     prop2: fromQueryParam(PAGE_PARAM)
 *   });
 *   ...
 * };
 */


function makeReduxPropBinder(f) {
	f.REDUX_PROP_BINDER = true;
	return f;
}

export const ACTIVE_ROUTE_NAME = 'activeRoute.name';
export const ACTIVE_ROUTE_BINDINGS = 'activeRoute.bindings';
export const ACTIVE_ROUTE = 'activeRoute';

function extractPropFromState(prop, state) {
	if (typeof prop === 'object') {
		const binders = _.pickBy(prop, v => v.REDUX_PROP_BINDER);
		const binding = Object.create(prop, _.mapValues(binders, binder => ({value: binder(state)})));
		return binding.value.call(binding);
	} else if (typeof prop === 'function') {
		return prop(state);
	} else if (typeof prop === 'string') {
		return embeddedGet(state, prop);
	}
	throw new Error('Unknown state getter');
}

export function fromState(prop, callback = x => x) {
	return makeReduxPropBinder(state => callback(extractPropFromState(prop, state)));
}

export function fromQueryParam({param, transform}, defaultValue) {
	return fromState(ACTIVE_ROUTE_BINDINGS, bindings => transform(bindings[param]) || defaultValue);
}
