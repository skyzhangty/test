import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Header from '../../src/scripts/components/Header';

jest.mock('../../src/assets/images/BlockM.png', () => 'rando.png');

function deepRender(node) {

	let div;
	ReactTestUtils.renderIntoDocument(
		<div ref={r => div = r}>
			{node}
		</div>,
	);
	return div.children[0];
}

describe('Header component', () => {
	it('Links to logout', () => {
		const header = deepRender(<Header/>);
		expect(header.querySelector('#aLogout').getAttribute('href')).toBe('/backend/logout');
	});
});