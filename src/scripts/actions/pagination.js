import appConfig from '../shared/config/app.config';

const pageSize = appConfig.study.page.size;
export const PAGE_PARAM = {
	param: 'page', transform: x => {
		if (x === undefined) return 1;
		return parseInt(x, 10);
	},
};

export function goToPage(n) {
	return (dispatch) => {
		dispatch({
			type: 'GOTO_ROUTE',
			relativeBindings: {
				[PAGE_PARAM.param]: n === 1 ? undefined: n,
			},
		});
		if (window && window.scroll) window.scroll(0, 0);
	};
}

export async function responseForNormalizedPage(currentPage, dispatch, fetchPage) {
	let page = currentPage;

	const gotoPage = n => {
		page = n;
		dispatch({
			type: 'GOTO_ROUTE',
			relativeBindings: {page: page === 1 ? undefined : page},
		});
	};

	const responseForCurrentPage = () => fetchPage({page, pageSize});

	let response;
	if (page <= 0 || !Number.isFinite(page)) {
		gotoPage(1);
		response = await responseForCurrentPage();
	} else {
		response = await responseForCurrentPage();
		const lastPage = Math.max(1, Math.ceil(response.totalCount / pageSize));
		if (lastPage < page) {
			gotoPage(1);
			response = await responseForCurrentPage();
		}
	}
	return response;
}
