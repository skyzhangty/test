import { connect } from 'react-redux';
import ReduxRouter from '../components/ReduxRouter';
import {routerLocationChanged} from '../actions/redux.router';

const mapStateToProps = (state) => ({
	history: state.reduxRouter.history
});

const mapDispatchToProps = (dispatch) => ({
	handleLocationChange: (location)=>{dispatch(routerLocationChanged(location));}
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxRouter);

