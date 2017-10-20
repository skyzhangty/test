import { connect } from 'react-redux';
import Feedback from '../components/Feedback';

function mapStateToProps(state) {
	return {
		feedback: state.feedback
	};
}

export default connect(mapStateToProps, null)(Feedback);