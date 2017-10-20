import {combineReducers} from 'redux';
import feedbackReducer from './feedback';
import ajaxReducer from './ajax';
import generic from './generic';
import activeRoute from './active.route';
import studyList from './study.list';
import reduxRouter from './redux.router';

export default combineReducers({
	feedback: feedbackReducer,
	ajax: ajaxReducer,
	generic,
	activeRoute,
	studyList,
	reduxRouter
});
