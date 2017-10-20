import React from 'react';

export default () => (
	<div className="grid-sm-1 grid-md-9-12 grid-centered">
		<p id="pNoStudiesMessage" className="text-center">
			You have no archived studies. If you are no longer actively recruiting for a study, you can archive it by clicking
			{' '}the “Archive study” button on a study&apos;s Dashboard.
			{' '}<strong>
				Archiving a study will not cause you to loose access to your Interested Participants.
			</strong>
		</p>
	</div>
);
