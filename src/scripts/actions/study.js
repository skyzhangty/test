/* eslint-disable prefer-arrow-callback,prefer-const */
import StudyDao from '../daos/StudyDao';
import {bindProps, fromQueryParam} from '../shared/redux.utils';
import {PAGE_PARAM, responseForNormalizedPage} from './pagination';
import asyncAction from './async';
import {loadIdentity} from './identity';

export const SORT_BY_PARAM = {param: 'sort-by', transform: x => x};

export function onSortSelected(defaultSort) {
	return sort => ({
		type: 'GOTO_ROUTE',
		relativeBindings: {
			[SORT_BY_PARAM.param]: defaultSort === sort ? undefined : sort,
		},
	});
}

export const loadStudies = ({pageSlot, numStudiesSlot, loadingSlot, sortOptions, defaultSortOption, constraints}) => () =>
	asyncAction(loadingSlot, async function loadStudiesBody(dispatch, getState) {
		await loadIdentity(dispatch, getState);
		let {sortBy, page: currentPage} = bindProps(getState, {
			sortBy: fromQueryParam(SORT_BY_PARAM),
			page: fromQueryParam(PAGE_PARAM),
		});
		if (!sortBy) sortBy = defaultSortOption;
		if (!sortOptions.map(x => x.id).includes(sortBy)) {
			dispatch({
				type: 'GOTO_ROUTE',
				relativeBindings: {
					[SORT_BY_PARAM.param]: defaultSortOption,
				},
			});
			return;
		}
		constraints['sort-by'] = sortBy;
		const response = await responseForNormalizedPage(currentPage, dispatch, ({page, pageSize}) => {
			constraints.page = page;
			constraints['page-size'] = pageSize;
			return StudyDao.get(constraints);
		});
		dispatch({
			type: 'GENERIC',
			[pageSlot]: response.page,
			[numStudiesSlot]: response.totalCount,
		});
	});
