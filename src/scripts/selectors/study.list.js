import { createSelector } from 'reselect';
import qs from 'qs';

import util from '../shared/util';

const getQueryString = (state) => state.reduxRouter.location.search;

export const getQueryParamObject = createSelector(
	[ getQueryString ],
	(queryString) => qs.parse(queryString, { ignoreQueryPrefix: true })
);

export const getSortBy = createSelector(
	[ getQueryString ],
	(queryString) => {
		const sortBy = util.getUrlParam('sort-by', queryString);
		return sortBy || 'new-volunteers';
	}
);

export const getIsArchived = createSelector(
	[ getQueryString ],
	(queryString) => {
		const isArchived = util.getUrlParam('is-archived', queryString);
		return isArchived===true;
	}
);
