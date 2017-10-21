import React from 'react';
import PropTypes from 'prop-types';

class StudyListControls extends React.Component {
	constructor() {
		super();
		this.sortStudyList = this.sortStudyList.bind(this);
	}

	sortStudyList(event) {
		const queryParamsObject = {
			'sort-by': event.target.value,
			'is-archived': this.props.isArchived
		};
		this.props.sortStudyList(queryParamsObject);
	}

	render() {
		const {sortBy, isArchived} = this.props;
		
		return (
			<section className="flex-container vertical-for-small-only">
				<label htmlFor="selectSortStudiesBy" className="margin-right-small">
					Sort by
				</label>
				<select id="selectSortStudiesBy" value={sortBy} onChange={this.sortStudyList}>
					<option value="new-participants">New Participants</option>
					<option value="new-messages">New Messages</option>
					<option value="posting-status">Posting Status</option>
					<option value="title">Title</option>
				</select>
				{
					isArchived ? '' :
						(<a className="small-primary-button pull-right show-for-medium-up">
							<span className="fa fa-plus-circle fa-margin-right"/>
							Add study
						</a>)
				}

				<div className="floating-button-container show-for-small-only" aria-hidden='true'>
					<a id="aAddStudyMobile" className="floating-button" href="">
						<span className="fa fa-plus" aria-hidden="true"/>
						<span className="show-for-sr">Add study</span>
					</a>
					<div className="helptip">Add a study</div>
				</div>

			</section>
		);
	}
}

StudyListControls.propTypes = {
	sortBy: PropTypes.string.isRequired,
	isArchived: PropTypes.bool.isRequired,
	sortStudyList: PropTypes.func.isRequired
};

export default StudyListControls;
