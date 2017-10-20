import React from 'react';
import PropTypes from 'prop-types';
import StudySnippet from './StudySnippet';
import StudyType from '../dtos/study';

function StudyList(props) {
	const {studyList} = props;
	return (
		<section className="study-list">
			<ol>
				{
					studyList.map(study => <StudySnippet key={study.id} study={study}/>)
				}
			</ol>
		</section>
	);
}

StudyList.propTypes = {
	studyList: PropTypes.arrayOf(StudyType).isRequired,
};

export default StudyList;