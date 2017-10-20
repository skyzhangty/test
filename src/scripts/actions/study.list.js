import qs from 'qs';
import StudyListDao from '../daos/StudyListDao';
import {GET_STUDY_LIST_SUCCESS} from './action.types';
import appConfig from '../shared/config/app.config';

export function getStudyListSuccess(studyList) {
	return {type: GET_STUDY_LIST_SUCCESS, payload: studyList};
}

export function getStudyList(queryParams) {
	const constrains = qs.parse(queryParams, { ignoreQueryPrefix: true });
	if(isNaN(constrains.page) || constrains.page===0) {
		constrains.page = 1;
	}
	constrains['page-size'] = appConfig.study.page.size;
	constrains['is-archived'] = constrains['is-archived']===true;
	
	return (dispatch) => 
		StudyListDao.get(constrains)
			.then(response => dispatch(getStudyListSuccess(response.page)));
};

export function sortStudyList(sortBy, constrains) {
	constrains['sort-by'] = sortBy;
	return (dispatch) => StudyListDao.get(constrains)
		.then(response => dispatch(getStudyListSuccess(response.page)));
}