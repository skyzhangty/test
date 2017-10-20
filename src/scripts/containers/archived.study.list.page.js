import React from 'react';
import StudyListPage from '../components/StudyListPage';
import ArchivedNoStudies from '../components/ArchivedNoStudies';
import {bindToRedux, fromState, fromQueryParam} from '../shared/redux.utils';
import RouteModelLoader from '../components/RouteModelLoader';
import Pagination from '../containers/url.pagination';
import {onSortSelected, loadStudies, SORT_BY_PARAM} from '../actions/study';
import StudyListControls, {NEW_MESSAGES, NEW_PARTICIPANTS, TITLE} from '../components/StudyListControls';
import {IDENTITY} from '../actions/identity';

// Slots inside the global state.
const NUM_STUDIES = 'generic.pages.archivedStudyList.numStudies';
const STUDIES = 'generic.pages.archivedStudyList.studies';
const LOADING_STUDIES = 'generic.pages.archivedStudyList.loading';

const sortOptions = [NEW_PARTICIPANTS, NEW_MESSAGES, TITLE];
const defaultSortOption = NEW_PARTICIPANTS.id;

// Component Bindings and Injections

const PaginationConnected = bindToRedux(Pagination, {
	numItems: fromState(NUM_STUDIES),
});

const StudyListControlsConnected = bindToRedux(StudyListControls, {
	onSortSelected: onSortSelected(defaultSortOption),
	sortOptions,
	sortBy: fromQueryParam(SORT_BY_PARAM, defaultSortOption),
	canAddStudy: false,
});

const StudyListPageConnected = bindToRedux(StudyListPage, {
	Pagination: <PaginationConnected/>,
	StudyListControls: <StudyListControlsConnected/>,
	NoStudies: <ArchivedNoStudies/>,
	studies: fromState(STUDIES),
	identity: fromState(IDENTITY),
	studyList: 'archived',
});

// Route Model Loader
const constraints = {isArchived: true};

export default bindToRedux(RouteModelLoader, {
	mainComponent: StudyListPageConnected,
	isLoaded: fromState(STUDIES, x => !!x),
	isLoading: fromState(LOADING_STUDIES, x => !!x),
	hasErrors: false,
	onLoad: loadStudies({
		loadingSlot: LOADING_STUDIES,
		pageSlot: STUDIES,
		numStudiesSlot: NUM_STUDIES,
		sortOptions,
		defaultSortOption,
		constraints})
});
