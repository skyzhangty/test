import React from 'react';
import PropTypes from 'prop-types';
import {Router} from 'react-router-dom';

export default class ReduxRouter extends React.Component {
	constructor() {
		super();
		this.handleLocationChange = this.handleLocationChange.bind(this);
	}
	componentWillMount() {
		const {history} = this.props;
		this.handleLocationChange(history.location);
	}
    
	componentDidMount() {
		const { history } = this.props;
		this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
	}
    
	componentWillUnmount() {
		if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
	}
    
	handleLocationChange(location) {
		this.props.handleLocationChange(location);
	}
    
	render() {
		return <Router {...this.props} />;
	}
}

ReduxRouter.propTypes = {
	history: PropTypes.shape({
		location: PropTypes.shape().isRequired
	}).isRequired,
	handleLocationChange: PropTypes.func.isRequired
};
