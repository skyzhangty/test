/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import {Provider} from 'react-redux';
import ReactTestUtils from 'react-dom/test-utils';
import Pagination from '../../src/scripts/components/Pagination';
import {storeCreator} from '../../src/scripts/store';

const Simulate = ReactTestUtils.Simulate;

const shallow = node => {
	let router;
	const store = storeCreator();
	store.dispatch({type: 'SET_ACTIVE_ROUTE', activeRoute: {name: 'abc', bindings: {}}});
	ReactTestUtils.renderIntoDocument(
		<div ref={r => router = r}>
			<Provider store={store}>
				{node}
			</Provider>
		</div>,
	);
	return router;
};

const noop = () => {
};

// Implicitly, the page size is 10.  See the default for the pageSize attribute.
describe('Pagination', () => {
	it('On first page with more than one page available', () => {
		const component = shallow(
			<Pagination currentPage={1} numItems={13} onShowPage={noop}/>,
		);
		expect(component.querySelector('#prev-page').getAttribute('disabled')).toBe('');
		expect(component.querySelector('#next-page').getAttribute('disabled')).toBe(null);
		expect(component.querySelector('#divPaginationLabel').textContent).toBe('Showing 1 - 10 of 13 studies');
	});

	it('On last page with multiple pages', () => {
		const component = shallow(
			<Pagination currentPage={2} numItems={13} onShowPage={noop}/>,
		);
		expect(component.querySelector('#prev-page').getAttribute('disabled')).toBe(null);
		expect(component.querySelector('#next-page').getAttribute('disabled')).toBe('');
		expect(component.querySelector('#divPaginationLabel').textContent).toBe('Showing 11 - 13 of 13 studies');
	});

	it('On only page', () => {
		const component = shallow(
			<Pagination currentPage={1} numItems={6} onShowPage={noop}/>,
		);
		// page selection and the next/previous links should be hidden.
		expect(component.querySelector('#prev-page')).toBeFalsy();
		expect(component.querySelector('#next-page')).toBeFalsy();
		expect(component.querySelector('#divPaginationLabel').textContent).toBe('Showing 1 - 6 of 6 studies');
	});

	const onAction = doAction => ({
		run(callbackExpectation) {
			return {
				when({currentPage, numItems}) {
					const callback = jest.fn();
					const component = shallow(
						<Pagination currentPage={currentPage} numItems={numItems} onShowPage={callback}/>,
					);
					doAction(component);
					callbackExpectation(callback);
				},
			};

		},

		expectCallbackToPage(expectedPage) {
			return this.run(callback => expect(callback).toHaveBeenCalledWith(expectedPage));
		},

		expectNoCallback() {
			return this.run(callback => expect(callback).not.toHaveBeenCalled());
		},
	});

	const onClick = selector => onAction(c => Simulate.click(c.querySelector(selector)));
	const onOptionSelected = n => onAction(c => Simulate.change(
		c.querySelectorAll('option')[n],
		{target: {value: n}}));

	it('Next page invokes callback', () => onClick('#next-page').expectCallbackToPage(2).when({currentPage: 1, numItems: 13}));
	it('Prev page invokes callback', () => onClick('#prev-page').expectCallbackToPage(1).when({currentPage: 2, numItems: 13}));
	it('Select page invokes callback', () => onOptionSelected(3).expectCallbackToPage(3).when({currentPage: 1, numItems: 43}));
	it('Previous page does\'t call callback', () => onClick('#prev-page').expectNoCallback().when({
		currentPage: 1,
		numItems: 13,
	}));
});
