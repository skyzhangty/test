import React from 'react';

export default () => (
	<div className="grid-sm-1 grid-md-9-12 grid-centered">
		<p id="pNoStudiesMessage" className="text-center">
			You have no current studies
		</p>
		<div className="text-center">
			<a id="aAddStudy" href="" className="primary-button">
				<span className="fa fa-plus fa-margin-right"/>
				Add study
			</a>
		</div>
	</div>
);