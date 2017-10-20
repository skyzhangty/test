import Router from './shared/router';

export default new Router({
	root: {
		path: '/',
	},
	currentStudyList: {
		path: '/studies/current',
	},
	archivedStudyList: {
		path: '/studies/archived',
	},
	studyHome: {
		path: '/studies/:irbNumber/home',
	},
	unknownRoute: {
		path: '/unknown-route'
	}
});
