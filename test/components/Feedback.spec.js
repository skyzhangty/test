import React from 'react';
import renderer from 'react-test-renderer';

import Feedback from '../../src/scripts/components/Feedback';

describe('components', () => {
	describe('Feedback', () => {
		it('should render self', () => {
			const component  = renderer.create(
				<Feedback feedback={{title: 'title', message: 'message'}}/> );

			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
});

