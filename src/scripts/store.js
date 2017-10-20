/* eslint-disable no-console */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/main.reducer';

const log = (/* {getState} */) => next => action => {
	// const print = a => JSON.stringify(a, null, 2);
	// console.log(`==action==\n${print(action)}`);
	next(action);
//	console.log(`==state==\n${print(getState())}`);
};

const testThunk = promises => ({getState, dispatch}) => next => action => {
	if (typeof action === 'function') {
		const maybePromise = action(dispatch, getState);
		if (maybePromise && maybePromise.then) {
			promises.push(maybePromise);
		}
	} else {
		next(action);
	}
};

export const storeCreator = () => createStore(reducer, composeWithDevTools(applyMiddleware(thunk, log)));

export const createTestStore = () => {
	const promises = [];
	const store = createStore(reducer, applyMiddleware(testThunk(promises), log));
	store.then = (...args) => Promise.all(promises).then(...args);
	store.asyncActions = () => Promise.all(promises);
	return store;
};

export default storeCreator();
