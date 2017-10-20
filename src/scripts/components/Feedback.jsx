import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function Feedback({feedback}) {
	if (_.isObject(feedback) && !_.isEmpty(feedback)) {
		const feedbackTypeClass = feedback.type === 'error' ? 'alert-danger': 'alert-info';
		return (
			<div id="divFeedbackBlock" className={feedbackTypeClass}>
				<h4 id="h4Title">{feedback.title}</h4>
				<p id="pMessage">{feedback.message}</p>
			</div>
		);
	} 
	return (<div id="divFeedbackBlock" />);
};

Feedback.propTypes = {
	feedback: PropTypes.shape({
		type: PropTypes.string,
		title: PropTypes.string,
		message: PropTypes.string
	}).isRequired
};