/* eslint-disable prefer-arrow-callback */
import React from 'react';
import {Provider} from 'react-redux';
import ReactTestUtils from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import StudyHome from '../../src/scripts/containers/study.home';
import {createTestStore} from '../../src/scripts/store';

jest.mock('../../src/scripts/shared/url.scheme');

function deepRender(store, Node) {
	let v;
	ReactTestUtils.renderIntoDocument(
		<Provider store={store}>
			<div ref={x => v = x}>
				{Node}
			</div>
		</Provider>,
	);
	return () => v.children[0];
}

describe('Study Home', () => {
	it('Renders new messages', async function () {
		const NEW_MESSAGES = 10;

		const study = {
			irbNum: 'HUM10',
			title: 'Abce',
			piFirstName: 'Kellen',
			piMiddleName: 'Joshua',
			piLastName: 'McClain',
			newVolunteers: 28,
			newMessages: NEW_MESSAGES,
			recommendations: 13,
			active: true,
			archived: false,
		};

		const store = createTestStore();

		const mockAdapter = new MockAdapter(axios);
		mockAdapter.onGet('/backend/secure/staff/studies').reply(200, [study]);

		store.dispatch({
			type: 'GOTO_ROUTE',
			name: 'studyHome',
			bindings: {
				irbNumber: 'HUM00001'
			}
		});

		const component = deepRender(store, <StudyHome/>);

		await store.asyncActions();
		console.log('Making assertions');
		console.log(JSON.stringify(store.getState(), null, 2));
		expect(component().querySelector('#spanNewMessages').textContent).toBe(`${NEW_MESSAGES}`);
	});
});