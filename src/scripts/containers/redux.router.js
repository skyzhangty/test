import { connect } from 'react-redux';
import ReduxRouter from '../components/ReduxRouter';
import {routerLocationChanged} from '../actions/redux.router';
import {getStudyList} from '../actions/study.list';

const getLoadInitialDataAction = () => getStudyList;

const mapStateToProps = (state) => ({
	history: state.reduxRouter.history
});

const mapDispatchToProps = (dispatch) => ({
	handleLocationChange: (location)=>dispatch(routerLocationChanged(location)),
	loadInitialDataForPage: (location) => {
		const {search} = location;
		dispatch(getLoadInitialDataAction()(search));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxRouter);

