import { connect } from 'react-redux';
import StudyList from '../components/StudyList';

function mapStateToProps(state) {
	return {
		studyList: state.studyReducer.studyList
	};
}

export default connect(mapStateToProps, null)(StudyList);