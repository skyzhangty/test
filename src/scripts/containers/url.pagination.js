import Pagination from '../components/Pagination';
import {bindToRedux, fromQueryParam} from '../shared/redux.utils';
import {goToPage, PAGE_PARAM} from '../actions/pagination';

export default bindToRedux(Pagination, {
	currentPage: fromQueryParam(PAGE_PARAM),
	onShowPage: goToPage
});
