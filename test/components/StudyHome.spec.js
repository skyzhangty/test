import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import StudyHome from '../../src/scripts/components/StudyHome';

function deepRender(Node) {
	let v;
	ReactTestUtils.renderIntoDocument(
		<div ref={x => v = x}>
			{Node}
		</div>
	);
	return v.children[0];
}

describe('Study Home', () => {
	it('Renders new messages', () => {
		const NEW_MESSAGES = 10;
		const study = {
			irbNum: 'HUM10',
			title: 'Abce',
			piFirstName: 'Kellen',
			piMiddleName: 'Joshua',
			piLastName: 'McClain',
			newVolunteers: 28,
			newMessages: NEW_MESSAGES,
			recommendations: 13,
			active: true,
			archived: false,

		};
		const component = deepRender(<StudyHome study={study}/>);

		expect(component.querySelector('#spanNewMessages').textContent).toBe(`${NEW_MESSAGES}`);
		expect(component.querySelector('#spanNewParticipants').textContent).toBe(`${NEW_MESSAGES}`);
		expect(component.querySelector('#spanNewParticipants').textContent).toBe(`${NEW_MESSAGES}`);
	});
});