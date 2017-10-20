/* eslint-disable prefer-arrow-callback */
import {bindProps, bindToRedux, fromQueryParam, fromState} from '../shared/redux.utils';
import StudyHomeUnbound from '../components/StudyHome';
import RouteModelLoader from '../components/RouteModelLoader';
import StudyDao from '../daos/StudyDao';
import asyncAction from '../actions/async';

const STUDY_HOME = 'generic.pages.studyHome.study';
const IRB_PARAM = {param: 'irbNumber', transform: x => x};
const STUDY_HOME_LOADING = 'generic.pages.studyHome.loading';
const STUDY_HOME_LOADED = {
	study: fromState(STUDY_HOME),
	irb: fromQueryParam(IRB_PARAM),
	value() {
		const result = this.study && this.study.irbNum === this.irb;
		return !!result;
	},
};

const StudyHome = bindToRedux(StudyHomeUnbound, {
	study: fromState(STUDY_HOME),
});

export default bindToRedux(RouteModelLoader, {
	mainComponent: StudyHome,
	hasErrors: false,
	isLoaded: fromState(STUDY_HOME_LOADED),
	isLoading: fromState(STUDY_HOME_LOADING, x => !!x),

	onLoad() {
		return asyncAction(STUDY_HOME_LOADING, async function loadStudyByIrb(dispatch, getState) {
			const {isLoadedAlready, requestedIrb} = bindProps(getState, {
				isLoadedAlready: fromState(STUDY_HOME_LOADED),
				requestedIrb: fromQueryParam(IRB_PARAM),
			});
			if (isLoadedAlready) {
				console.log('Already loading');
				return;
			}
			console.log('Fetching study');
			const fetchedStudy = await StudyDao.get({
				irbNum: requestedIrb,
			});
			console.log('Dispatching action');
			dispatch({
				type: 'GENERIC',
				[STUDY_HOME]: fetchedStudy[0],
			});
		});
	},
});
