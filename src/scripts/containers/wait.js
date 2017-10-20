import { connect } from 'react-redux';
import Wait from '../components/Wait';

function mapStateToProps(state) {
	return {
		isSendingAjaxRequest: state.ajax.isSendingAjaxRequest
	};
}

export default connect(mapStateToProps, null)(Wait);