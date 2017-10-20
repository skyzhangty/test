import React from 'react';
import PropTypes from 'prop-types';
import Link from '../containers/link';
import LinkType from '../dtos/link';

class DiMenu extends React.PureComponent {

	makeActiveText(text) {
		return (
			<a className="active">
				<span className="fa fa-check-circle fa-margin-right">
					<span className="show-for-sr">
						This is where you currently are
					</span>
				</span>
				{text}
			</a>
		);
	}

	makeInactiveText(text, link) {
		return (
			<Link {...link}>
				<span className="fa fa-check-circle fa-margin-right"/>
				{text}
			</Link>
		);
	}

	render() {
		const {leftLink, rightLink, leftText, rightText, activeSide} = this.props;
		let left;
		let right;
		if (activeSide === 'left') {
			left = this.makeActiveText(leftText);
			right = this.makeInactiveText(rightText, rightLink);
		} else {
			left = this.makeInactiveText(leftText, leftLink);
			right = this.makeActiveText(rightText);
		}
		return (
			<nav className="secondary-nav horizontal margin-top">
				{left}
				{right}
			</nav>
		);
	}
}

DiMenu.propTypes = {
	leftLink: LinkType.isRequired,
	rightLink: LinkType.isRequired,
	activeSide: PropTypes.string.isRequired,
	leftText: PropTypes.string.isRequired,
	rightText: PropTypes.string.isRequired,
};

export default DiMenu;