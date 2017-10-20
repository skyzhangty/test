import StudyListDao from '../daos/StudyListDao';
import {GET_STUDY_LIST_SUCCESS} from './action.types';
import appConfig from '../shared/config/app.config';

export function getStudyListSuccess(studyList) {
	return {type: GET_STUDY_LIST_SUCCESS, payload: studyList};
}

export function getStudyList(queryParamsObject) {
	if(isNaN(queryParamsObject.page) || queryParamsObject.page===0) {
		queryParamsObject.page = 1;
	}
	queryParamsObject['page-size'] = appConfig.study.page.size;
	queryParamsObject['is-archived'] = queryParamsObject['is-archived']===true;
	
	return (dispatch) => 
		StudyListDao.get(queryParamsObject)
			.then(response => dispatch(getStudyListSuccess(response.page)));
};

export function sortStudyList(queryParamsObject) {
	queryParamsObject.page = 1;
	queryParamsObject['page-size'] = appConfig.study.page.size;
	console.log(queryParamsObject);
	return (dispatch) => StudyListDao.get(queryParamsObject)
		.then(response => dispatch(getStudyListSuccess(response.page)));
}