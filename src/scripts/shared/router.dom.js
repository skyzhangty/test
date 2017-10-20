/* eslint-disable react/forbid-prop-types,react/no-multi-comp,react/require-default-props,prefer-const */
import React from 'react';
import PropTypes from 'prop-types';
import {getLinkFromUrl} from './url.scheme';
import {resolveRouteAndBindings} from './router';

export class Route extends React.PureComponent {
	render() {
		const {activeRoute, name, component: C} = this.props;
		if (activeRoute.name === name) {
			return <C bindings={activeRoute.bindings}/>;
		}
		return <div/>;
	}
}

Route.propTypes = {
	activeRoute: PropTypes.shape({
		name: PropTypes.string.isRequired,
		bindings: PropTypes.object.isRequired,
	}).isRequired,
	name: PropTypes.string.isRequired,
	component: PropTypes.func.isRequired,
};

// imperial props are not "native" props ;)
let IMPERIAL_PROPS;

export class Link extends React.PureComponent {
	getUrl() {
		const {activeRoute, to: name, bindings, relativeBindings} = this.props;
		return resolveRouteAndBindings({activeRoute, name, bindings, relativeBindings});
	}

	render() {
		const {name, bindings} = this.getUrl();

		const nativeProps = Object.assign({}, this.props);
		IMPERIAL_PROPS.forEach(imperialProp => delete nativeProps[imperialProp]);

		const href = getLinkFromUrl(this.props.router.urlFor(name, bindings));
		return (
			<a href={href} {...nativeProps}>
				{this.props.children}
			</a>
		);
	}
}

Link.propTypes = {
	to: PropTypes.string,
	bindings: PropTypes.object,
	relativeBindings: PropTypes.object,

	router: PropTypes.object.isRequired,
	activeRoute: PropTypes.shape({
		name: PropTypes.string.isRequired,
		bindings: PropTypes.object.isRequired,
	}),
	children: PropTypes.any.isRequired,
};

IMPERIAL_PROPS = Object.getOwnPropertyNames(Link.propTypes);

Link.defaultProps = {
	to: null,
	bindings: null,
	relativeBindings: null,
};
