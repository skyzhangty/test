import { connect } from 'react-redux';
import StudyListControls from '../components/StudyListControls';
import {sortStudies} from '../actions/study.list';

// const mapStateToProps = (state) => ({
  
// });

const mapDispatchToProps = {
	sortStudies
};

export default connect(null, mapDispatchToProps)(StudyListControls);
