import React from 'react';
import PropTypes from 'prop-types';
import Link from '../containers/link';
import {getUrlFromLocation} from '../shared/url.scheme';
import {bindToRedux, fromQueryParam} from '../shared/redux.utils';

const config = {
	url: {
		title: (
			<em>
				<i className="fa fa-globe fa-margin-right"/>
				Page not found
			</em>
		),
		label: 'Unknown url',
		blurb: (
			<div className="help-text">
				Please correct and try again, or go to your
				{' '}<Link to='currentStudyList'>study list</Link>.
			</div>
		),
	},
	route: {
		title: (
			<em>
				<i className="fa fa-exclamation-triangle fa-margin-right"/>
				Route not found
			</em>
		),
		label: 'Unknown route name',
		blurb: (
			<div className="help-text">
				This is an internal error. Please contact the dev team.
			</div>
		),
	},
};

const configFor = props => props.isUnknownUrl ? config.url : config.route;

const UnknownPageUnbound = (props) => (
	<div className="grid-row margin-top">
		<div className="grid-sm-1 grid-md-10-12 grid-centered">
			<h1 className="special-header-with-top-border">
				{configFor(props).title}
			</h1>
			<section className="study-url">
				<div className="url-container">
					<div className="label">
						{configFor(props).label}:
					</div>
					<div className="url">
						{props.isUnknownUrl ? getUrlFromLocation(location) : props.unknownRoute}
					</div>
				</div>
				{configFor(props).blurb}
			</section>
		</div>
	</div>
);

UnknownPageUnbound.propTypes = {
	isUnknownUrl: PropTypes.bool.isRequired,
	unknownRoute: PropTypes.string,
};

UnknownPageUnbound.defaultProps = {
	unknownRoute: '',
};


export default bindToRedux(UnknownPageUnbound, {
	isUnknownUrl: fromQueryParam({param: 'routeName', transform: x => !x}),
	unknownRoute: fromQueryParam({param: 'routeName', transform: x => x}),
});
