import {PAGE_PARAM, responseForNormalizedPage} from '../../src/scripts/actions/pagination';

describe('pagination actions', () => {
	it('PAGE_PARAM defaults to one', () => {
		expect(PAGE_PARAM.transform(undefined)).toBe(1);
	});

	it('PAGE_PARAM parses valid values', () => {
		expect(PAGE_PARAM.transform('2')).toBe(2);
		expect(PAGE_PARAM.transform('-1')).toBe(-1);
		expect(PAGE_PARAM.transform('0')).toBe(0);
	});

	it('PAGE_PARAM parses invalid values as infinite', () => {// literally not finite
		expect(Number.isFinite(PAGE_PARAM.transform('a'))).toBeFalsy();
		expect(Number.isFinite(PAGE_PARAM.transform(''))).toBeFalsy();
	});

	function setupPage({numItems, currentPage, expectFetchPage}) {
		const page = [];
		page.numCalls = 0;

		const history = [];

		// A spy library might be better, but this isn't too hard.
		function fetchPage({page: requestedPageNum}) {
			expect(requestedPageNum).toBe(expectFetchPage[page.numCalls++]);
			return Promise.resolve({
				totalCount: numItems,
			});
		}

		const dispatch = jest.fn();

		page.push(currentPage, dispatch, fetchPage);
		page.history = history;
		page.assertCalledEnough = () => {
			expect(page.numCalls).toBe(expectFetchPage.length);
		};
		page.getDispatchedActions = () =>
			dispatch.mock.calls.map(args => args[0]);
		return page;
	}

	function actionSettingPageTo(n) {
		return {
			type: 'GOTO_ROUTE',
			relativeBindings: {page: n}
		};
	}

	it('Normalize keeps page as one', () => {
		const page = setupPage({numItems: 5, currentPage: 1, expectFetchPage: [1]});
		return responseForNormalizedPage(...page).then(() => {
			page.assertCalledEnough();
			expect(page.getDispatchedActions()).toEqual([]);
		});
	});

	it('Normalize normalizes a page param past last page to one', () => {
		const page = setupPage({numItems: 5, currentPage: 99, expectFetchPage: [99, 1]});
		return responseForNormalizedPage(...page).then(() => {
			page.assertCalledEnough();
			expect(page.getDispatchedActions()).toEqual([actionSettingPageTo(undefined)]);
		});
	});

	it('Normalize normalizes a nonsense page param to one', () => {
		const page = setupPage({numItems: 5, currentPage: NaN, expectFetchPage: [1]});
		return responseForNormalizedPage(...page).then(() => {
			page.assertCalledEnough();
			expect(page.getDispatchedActions()).toEqual([actionSettingPageTo(undefined)]);
		});
	});

	it('Normalize keeps the page number if it is valid', () => {
		const page = setupPage({numItems: 17, currentPage: 2, expectFetchPage: [2]});
		return responseForNormalizedPage(...page).then(() => {
			page.assertCalledEnough();
			expect(page.getDispatchedActions()).toEqual([]);
		});
	});
});
