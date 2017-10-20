import React from 'react';
import StudyType from '../dtos/study';

class StudyHome extends React.PureComponent {
	render() {
		const {study} = this.props;
		let todayPlusTwo = new Date();
		todayPlusTwo.setTime(todayPlusTwo.getTime() + 2 * 24 * 60 * 60 * 1000);
		todayPlusTwo = todayPlusTwo.toLocaleDateString();
		return (
			<div>
				<header className='header-st level-2'>
					<section className="title-container">

						<div className="feedback-block info" role="alert">
							<div className="feedback-block-media" aria-hidden="true">
								<span className="fa pe-7s-info"/>
							</div>
							<div className="feedback-block-body">
								<h4>Upcoming study deactivation</h4>
								<p>This study will be deactivated in 2 days</p>
							</div>
						</div>
						<div className="study-status active">
							<span className="fa fa-check fa-margin-right" aria-hidden="true"/>
							<span className="show-for-sr">This study is</span>
							Active
						</div>
						<h1>{this.props.study.title}</h1>
						<div className="aux-info">
							<span className="date">Deactivation Date: {todayPlusTwo}</span>
							<a href="">
								<span className="fa fa-calendar fa-margin-right"/>
								Edit
								{' '}<span>deactivation date</span>
							</a>
						</div>
					</section>
				</header>


				<section className="study-dashboard-actions-container"/>
				<section className="study-dashboard-actions">
					<a href="" className="primary-button">
						<span className="fa fa-times fa-margin-right" aria-hidden="true"/>
						Deactivate study
					</a>
				</section>

				<section className="study-url">
					<div className="url-container">
						<div className="label">Study Link:</div>
						<div className="url">
							<a href="" target="_blank">https://umhealthresearch.org/studies/HUM0001234</a>
							<a href="" className="small-outline-button">Copy</a>
						</div>
					</div>
					<div className="help-text">
						Use this link on your marketing materials (flyers,posters,brochures etc) to promote your study to potential
						{' '}participants.
					</div>
				</section>


				<div className="study-nav">
					<section>
						<h1 className="special-header-with-top-border">
							<em>
								<i className="fa fa-user fa-margin-right" aria-hidden="true"/>
								Manage Participants
							</em>
						</h1>
						<ul className="study-nav-list">
							<li>
								<a href="interested-volunteers.html" className="nav-card">
									<section className="primary-info">
										<h1>Interested Participants</h1>
										<span className="badge">9</span>
									</section>
									<section className="secondary-info">
										These are participants that have actively shown interest in this study by clicking the &apos;I am
										{' '}interested&apos; button.
									</section>
								</a>
							</li>
							<li>
								<a href="recommended-volunteers.html" className="nav-card">
									<section className="primary-info">
										<h1>Our Recommendations</h1>
										<span className="badge">199</span>
									</section>
									<section className="secondary-info">
										These are participants from the registry that might be a good match for this study but not have
										{' '}shown interest in it yet.
									</section>
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h1 className="special-header-with-top-border">
							<em>
								<i className="fa fa-envelope fa-margin-right" aria-hidden="true"/>
								Messages
							</em>
						</h1>
						<ul className="study-nav-list">
							<li>
								<a href="messages.html" className="nav-card">
									<section className="primary-info">
										<h1>Messages</h1>
										<span id='spanNewMessages' className="badge">{study.newMessages}</span>
									</section>
									<section className="secondary-info">
										Interact with participants that have already shown interest in this study.
									</section>
								</a>
							</li>
							<li>
								<a href="message-templates.html" className="nav-card">
									<section className="primary-info">
										<h1>Message Templates</h1>
									</section>
									<section className="secondary-info">
										Create/edit message templates to save time while communicating with your participants.
									</section>
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h1 className="special-header-with-top-border">
							<em>
								<i className="fa fa-pencil fa-margin-right" aria-hidden="true"/>
								Edit Study
							</em>
						</h1>
						<ul className="study-nav-list">
							<li>
								<a href="messages.html" className="nav-card">
									<section className="primary-info">
										<h1>Study Information</h1>
									</section>
									<section className="secondary-info">
										Edit study title, purpose and other descriptive information.
									</section>
								</a>
							</li>
							<li>
								<a href="eligibility.html" className="nav-card">
									<section className="primary-info">
										<h1>Inclusion/Exclusion Criteria</h1>
									</section>
									<section className="secondary-info">
										Edit this study&apos;s eligibility criteria.
									</section>
								</a>
							</li>
							<li>
								<a href="recommended-volunteers.html" className="nav-card">
									<section className="primary-info">
										<h1>Screening Questionnaire</h1>
									</section>
									<section className="secondary-info">
										Edit the questions that get asked to a participant who is trying to show interest in this study.
									</section>
								</a>
							</li>
							<li>
								<a href="" className="nav-card">
									<section className="primary-info">
										<h1>Study Contact</h1>
									</section>
									<section className="secondary-info">
										Edit who participants contact when they have questions about this study.
									</section>
								</a>
							</li>
							<li>
								<a href="" className="nav-card">
									<section className="primary-info">
										<h1>Study Team Access & Email Notifications</h1>
									</section>
									<section className="secondary-info">
										Edit the study team members that have access to this study.
									</section>
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h1 className="special-header-with-top-border">
							<em>
								<i className="fa fa-line-chart fa-margin-right" aria-hidden="true"/>
								Reports
							</em>
						</h1>
						<ul className="study-nav-list">
							<li>
								<a href="messages.html" className="nav-card">
									<section className="primary-info">
										<h1>Status Report</h1>
									</section>
									<section className="secondary-info">
										See how many of your study&apos;s volunteers are New, Eligigble, Not Eligible or Pending.
									</section>
								</a>
							</li>
							<li>
								<a href="message-templates.html" className="nav-card">
									<section className="primary-info">
										<h1>Volunteers by labels</h1>
									</section>
									<section className="secondary-info">
										Get a report of your study&apos;s volunteers based on the labels you have assigned them.
									</section>
								</a>
							</li>
						</ul>
					</section>
				</div>
			</div>
		);
	}
}

StudyHome.propTypes = {
	study: StudyType.isRequired,
};

export default StudyHome;
