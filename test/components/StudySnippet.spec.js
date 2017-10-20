import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import StudySnippet from '../../src/scripts/components/StudySnippet';


describe('Study Snippet', () => {
	it('should render active', () => {
		const renderer = new ReactShallowRenderer();

		const study = {
			irbNum: 'irb',
			title: 'titlo',
			piFirstName: 'Robert',
			piMiddleName: '"the rock"',
			piLastName: 'McCormick',
			newVolunteers: 0,
			newMessages: 1,
			recommendations: 8,
			active: true,
		};

		const component  = renderer.render(
			<StudySnippet study={study}/>
		);

		expect(component).toMatchSnapshot();
	});

	it('should render inactive', () => {
		const renderer = new ReactShallowRenderer();

		const study = {
			irbNum: 'irb',
			title: 'titlo',
			piFirstName: 'Robert',
			piMiddleName: '"the rock"',
			piLastName: 'McCormick',
			newVolunteers: 0,
			newMessages: 1,
			recommendations: 8,
			active: false,
		};

		const component  = renderer.render(
			<StudySnippet study={study}/>
		);

		expect(component).toMatchSnapshot();
	});
});

