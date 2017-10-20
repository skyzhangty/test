import { connect } from 'react-redux';

import StudyListPage from '../components/StudyListPage';
import {getStudyList, sortStudyList} from '../actions/study.list';

import {getQueryParamObject, getIsArchived, getSortBy} from '../selectors/study.list';

const mapStateToProps = (state) => ({
	studyList: state.studyList,
	queryParamObject: getQueryParamObject(state),
	isArchived: getIsArchived(state),
	sortBy: getSortBy(state)
});

const mapDispatchToProps = (dispatch) => ({
	getStudyList: (queryParamObject) => dispatch(getStudyList(queryParamObject)),
	sortStudyList: (queryParamObject) => {
		// history.push({pathname: ''search: 'sort-by'});
		dispatch(sortStudyList(queryParamObject));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyListPage);
