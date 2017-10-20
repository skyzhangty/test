/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import StudyType from '../dtos/study';
import StudyList from './StudyList';
import StudyListControls from './StudyListControls';

// import DiMenu from './DiMenu';

class StudyListPage extends React.PureComponent {
	
	componentDidMount() {
		const queryParams = this.props.location.search;
		this.props.getStudyList(queryParams);
	}

	render() {
		return (
			<div className="grid-sm-1 grid-md-9-12 grid-centered">
				<StudyListControls canAddStudy sortBy={'new-volunteers'}/>
				<StudyList studyList={this.props.studyList} />
			</div>
		);
	}
}

StudyListPage.propTypes = {
	getStudyList: PropTypes.func.isRequired,
	studyList: PropTypes.arrayOf(StudyType.isRequired).isRequired,
	location: PropTypes.shape({
		search: PropTypes.string.isRequired
	}).isRequired
};

export default StudyListPage;