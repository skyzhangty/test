/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import MICHR_LOGO from '../../assets/images/MICHR-logo.png';
import UM_LOGO from '../../assets/images/UM-logo.png';

export default () => (
	<div>
		<section id="sectionFooter">
			<div className="grid-row">
				<div className="grid-sm-1 grid-md-1-2">
					<nav>
						<ul>
							<li>
								<a href="http://michr-resources.org/30108-recruitment-and-retention" target="_blank">
									<span className="fa fa-external-link fa-margin-right" aria-hidden="true"/>
									Recruitment Resources
								</a>
							</li>
							<li>
								<a href="http://michr.umich.edu" target="_blank">
									<span className="fa fa-external-link fa-margin-right" aria-hidden="true"/>
									MICHR Website
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<section className="grid-sm-1 grid-md-1-2">
					<div className="contact-card">
						<h1 className="gamma">For technical support, contact:</h1>
						<address>
							<span className="tel">
								<span className="fa fa-phone fa-fw" aria-hidden="true"/>
								<span className="show-for-sr">Telephone:</span>
								877.536.4243
							</span>
							<span className="email">
								<span className="fa fa-envelope fa-fw" aria-hidden="true"/>
								<span className="show-for-sr">E-mail:</span>
								<a href="mailto:umhealthresearch@umich.edu">umhealthresearch@umich.edu</a>
							</span>
						</address>
					</div>
				</section>
			</div>

			<div className="grid-row logos">
				<div className="grid-sm-1 grid-md-1-2 michr-logo">
					<a href="http://www.michr.umich.edu">
						<img src={MICHR_LOGO} alt=""/>
					</a>
				</div>
				<div className="grid-sm-1 grid-md-1-2 um-logo">
					<a href="http://www.umich.edu">
						<img src={UM_LOGO} alt=""/>
					</a>
				</div>
			</div>

			<div className="grid-row">
				<section className="grid-1 copyright">
					<div>© 2017 Regents of the University of Michigan.</div>
					<div>UMHealthResearch is approved by IRBMED at the University of Michigan (IRB number: HUM00004760).</div>
				</section>
				<section className="heap-badge">
					<a href="https://heapanalytics.com/?utm_source=badge">
						<img style={{width: 108, height: 41}}
								 src="//heapanalytics.com/img/badgeLight.png"
								 alt="Heap | Mobile and Web Analytics"/>
					</a>
				</section>
			</div>

		</section>
	</div>
);
