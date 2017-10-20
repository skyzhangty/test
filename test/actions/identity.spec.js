/* eslint-disable arrow-body-style */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {IDENTITY, loadIdentity} from '../../src/scripts/actions/identity';
import {createTestStore} from '../../src/scripts/store';
import {bindProps, fromState} from '../../src/scripts/shared/redux.utils';



describe('Identity actions', () => {
	it('fetches identity from identity dao if state is unset', () => {
		const store = createTestStore();
		const mockAdapter = new MockAdapter(axios);
		const response = {loggedInUser: {firstName: 'abc'}};
		mockAdapter.onGet('/backend/public/auth-details').reply(200, response);

		store.dispatch(loadIdentity);

		return store.then(() => {
			const {identity} = bindProps(store.getState, {
				identity: fromState(IDENTITY),
			});
			expect(identity).toEqual({firstName: 'abc'});
		});
	});

	it('does not fetch identity if the store already has one', () => {
		const store = createTestStore();
		store.dispatch({
			type: 'GENERIC',
			[IDENTITY]: true
		});
		const mockAdapter = new MockAdapter(axios);
		mockAdapter.onGet('/backend/public/auth-details').networkError();// need to assert failure?

		store.dispatch(loadIdentity);

		return store.then(() => {
			const {identity} = bindProps(store.getState, {
				identity: fromState(IDENTITY),
			});
			expect(identity).toBe(true);
		});
	});
});
