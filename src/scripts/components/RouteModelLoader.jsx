/* eslint-disable no-console,react/forbid-prop-types,react/sort-comp,react/no-unused-prop-types,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

// The main purpose of this class/component is to manage the state necessary to
// convert the view-level synchronous lifecycle callbacks of the React's component into
// a suitable asynchronous URL-based model loading lifecycle.
//
// For instance, we don't want to spuriously load the model if react decides to call
// componentWillReceiveProps over and over again, especially with the same parameters.
// (React gives no guarantee that that callback is invoked only once and only
// when the props have changed.)
//
// Since we use redux, the 'model' we load should be embedded in the global store, so
// the job of the 'model' hook is to construct those actions to update the global store.
// So, our 'model' here is a redux action or list of actions.

// TODO probably want to assume the model's promise is cancellable (like ajax), and
// track the URL itself, so that if the user changes the URL while we're loading the model,
// we can cancel the model's promise, and then re-invoke the model() hook for the newly requested
// URL.
class RouteModelLoader extends React.Component {
	componentDidMount() {
		this.load();
	}

	componentWillReceiveProps() {
		this.load();
	}

	load() {
		if(!this.props.isLoading) {
			this.props.onLoad();
		}
	}

	render() {
		if (this.props.hasErrors) {
			const C = this.props.errorComponent;
			return <C error={this.state.error} {...this.props}/>;
		} else if (this.props.isLoaded) {
			const C = this.props.mainComponent;
			return <C {...this.props}/>;
		}
		return <div/>;
	}
}

RouteModelLoader.propTypes = {
	// User-provided properties:
	mainComponent: PropTypes.func.isRequired,
	errorComponent: PropTypes.func,

	onLoad: PropTypes.func.isRequired,
	hasErrors: PropTypes.bool.isRequired,
	isLoaded: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

RouteModelLoader.defaultProps = {
	errorComponent({error}) {
		console.error(`Error loading route model: ${error}`, error);
		return <div/>;
	},
	loadingComponent(){
		return <div/>;
	},
};

// use like:
// const MyPage = bindToRedux(RouteModelLoader, {
//   errorComponent: abc,
//   mainComponent: def,
//   isLoading: fromState(...),
//   hasErrors: fromState(...),
//   onLoad(dispatch, getState) { ... }
// })
// ....
// <Route ... component={MyPage}>
// ...
export default RouteModelLoader;
