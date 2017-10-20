import { connect } from 'react-redux';
import ComponentMenagerie from '../components/ComponentMenagerie';
import {allOf} from '../reducers/models';
import {parseQueryString} from '../shared/redux.utils';

function mapStateToProps(state, ownProps) {
	const params = parseQueryString(ownProps.location.search);
	return {
		studies: allOf('study', state.models),
		page: params.page,
		orderBy: params['order-by']
	};
}

export default connect(mapStateToProps, null)(ComponentMenagerie);