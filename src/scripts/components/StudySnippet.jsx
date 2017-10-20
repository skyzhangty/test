import React from 'react';
import {Link} from 'react-router-dom';
import StudyType from '../dtos/study';


function StudySnippet(props) {
	const {irbNum, title, piFirstName, piMiddleName, piLastName, newVolunteers, newMessages, recommendations, active} = props.study;
	const statusIcon = active ? 'check' : 'times';
	const status = active ? 'active' : 'inactive';
	
	return (
		<li>
			<article className={`study-snippet-st wow ${status}`}>
				<Link to={`studyHome?irbNum=${irbNum}`}>
					<div className="banner">
						<span className={`fa fa-${statusIcon}`} aria-hidden="true" />
						<span className="show-for-sr">This study is</span>
						{status}
					</div>
					<div id={`divIRB-${irbNum}`} className="study-irb">{irbNum}</div>
					<h1 id={`h1Title-${irbNum}`} className="study-title" >{title}</h1>
					<div id={`divPI-${irbNum}`} className="study-pi">{`${piLastName}, ${piFirstName} ${piMiddleName}`}</div>
					<section id={`sectionNotifications-${irbNum}`} className="study-notifications">
						<div>
							<span className="number">{newVolunteers}</span>
							New Participants
						</div>
						<div>
							<span className="number">{newMessages}</span>
							Messages
						</div>
						<div>
							<span className="number">{recommendations}</span>
							Recommendations
						</div>
					</section>
				</Link>
			</article>
		</li>
	);
}

StudySnippet.propTypes = {
	study: StudyType.isRequired,
};
export default StudySnippet;
