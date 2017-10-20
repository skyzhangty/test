import React from 'react';
import PropTypes from 'prop-types';

function Wait({isSendingAjaxRequest}) {
	let divWaitClassName = 'overlay';
	if(!isSendingAjaxRequest) {
		divWaitClassName += ' hide';
	}
	return (
		<div id="divWait" className={divWaitClassName} tabIndex="-1" aria-hidden="true">
			<div className="spinner">
				<div className="double-bounce1" />
				<div className="double-bounce2" />
			</div>
		</div>
	);
}

Wait.propTypes = {
	isSendingAjaxRequest: PropTypes.bool.isRequired
};
export default Wait;
