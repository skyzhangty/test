/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import StudyType from '../dtos/study';
import StudyList from './StudyList';
import StudyListControls from './StudyListControls';

// import DiMenu from './DiMenu';

class StudyListPage extends React.PureComponent {
	
	componentDidMount() {
		this.props.getStudyList(this.props.queryParamObject);
	}

	render() {
		const {isArchived, sortBy, sortStudyList, studyList} = this.props;
		return (
			<div className="grid-sm-1 grid-md-9-12 grid-centered">
				<StudyListControls isArchived={isArchived} sortBy={sortBy} sortStudyList={sortStudyList}/>
				<StudyList studyList={studyList} />
			</div>
		);
	}
}

StudyListPage.propTypes = {
	getStudyList: PropTypes.func.isRequired,
	sortStudyList: PropTypes.func.isRequired,
	studyList: PropTypes.arrayOf(StudyType.isRequired).isRequired,
	queryParamObject: PropTypes.shape(PropTypes.object.isRequired).isRequired,
	sortBy: PropTypes.string.isRequired,
	isArchived: PropTypes.bool.isRequired
};

export default StudyListPage;