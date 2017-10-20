import React from 'react';
import PropTypes from 'prop-types';
import StudySnippet from './StudySnippet';
import StudyType from '../dtos/study';


const ComponentMenagerie = (props) => (
	<div className="study-list">
		<ul>
			{
				props.studies.map(study =>
					<StudySnippet key={study.id} study={study}/>)
			}
		</ul>
	</div>
);

ComponentMenagerie.propTypes = {
	studies: PropTypes.arrayOf(StudyType).isRequired,
};

ComponentMenagerie.defaultProps = {
	page: 1,
	orderBy: 'title'
};

export default ComponentMenagerie;
