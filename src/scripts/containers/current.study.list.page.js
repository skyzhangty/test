import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import StudyListPage from '../components/StudyListPage';
import {getStudyList} from '../actions/study.list';

const mapStateToProps = (state) => ({
	studyList: state.studyList
});

const mapDispatchToProps = {
	getStudyList
};

const connectedStudyListPage = connect(mapStateToProps, mapDispatchToProps)(StudyListPage);
export default withRouter(connectedStudyListPage);
