/* eslint-disable react/no-find-dom-node,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Router from '../../src/scripts/shared/router';
import {Link as RawLink, Route} from '../../src/scripts/shared/router.dom';
import {getLinkFromUrl} from '../../src/scripts/shared/url.scheme';


describe('Route Dom', () => {
	const router = new Router({
		postList: {
			path: '/posts',
		},
		postDetails: {
			path: '/posts/:id',
		},
	});

	it('Renders an active route', () => {
		const activeRoute = router.recognize('/posts');

		const Test = () => <div className="route-div"/>;

		let comp;

		ReactTestUtils.renderIntoDocument(
			<Route name='postList' component={Test} activeRoute={activeRoute} ref={r => comp = r}/>,
		);

		comp = ReactDOM.findDOMNode(comp);
		expect(comp.getAttribute('class')).toEqual('route-div');
	});

	it('Doesn\'t render an inactive route', () => {
		const activeRoute = router.recognize('/posts');

		const Test = () => <div className="route-div"/>;

		let comp;

		ReactTestUtils.renderIntoDocument(
			<Route name='postDetails' component={Test} activeRoute={activeRoute} ref={r => comp = r}/>,
		);

		comp = ReactDOM.findDOMNode(comp);
		expect(comp.getAttribute('class')).toEqual(null);
	});

	it('Passes bindngs', () => {
		const activeRoute = router.recognize('/posts/28?page=1');

		const Test = ({bindings}) => <div className={`page-${bindings.page} id-${bindings.id}`}/>;
		Test.propTypes = {bindings: PropTypes.object.isRequired};

		let comp;

		ReactTestUtils.renderIntoDocument(
			<Route name='postDetails' component={Test} activeRoute={activeRoute} ref={r => comp = r}/>,
		);

		comp = ReactDOM.findDOMNode(comp);
		expect(comp.getAttribute('class')).toEqual('page-1 id-28');
	});
});

describe('Link Dom', () => {
	const router = new Router({
		postList: {
			path: '/posts',
		},
		postDetails: {
			path: '/posts/:id',
		},
	});
	let anchor;
	let activeRoute;
	const Link = ({children, ...otherProps}) =>
		<RawLink {...otherProps} router={router} ref={r => anchor = ReactDOM.findDOMNode(r)} activeRoute={activeRoute}>
			{children}
		</RawLink>;
	Link.propTypes = {children: PropTypes.any.isRequired};

	const setCurrentPage = url => activeRoute = router.recognize(url);

	it('Can render absolute links', () => {
		setCurrentPage('/posts');
		ReactTestUtils.renderIntoDocument(
			<Link to='postDetails' bindings={{id: 1}}>
				here
			</Link>,
		);
		expect(anchor.getAttribute('href')).toBe(getLinkFromUrl('/posts/1'));
		expect(anchor.textContent).toBe('here');
	});

	it('Can render relative links', () => {
		setCurrentPage('/posts/1');
		ReactTestUtils.renderIntoDocument(
			<Link relativeBindings={{id: 2}}>
				next page
			</Link>,
		);
		expect(anchor.getAttribute('href')).toBe(getLinkFromUrl('/posts/2'));
		expect(anchor.textContent).toBe('next page');
	});

	it('Doesn\'t use current bindings if going to a specific route', () => {
		setCurrentPage('/posts/1');
		ReactTestUtils.renderIntoDocument(
			<Link to='postList'>
				Back to list
			</Link>,
		);
		expect(anchor.getAttribute('href')).toBe(getLinkFromUrl('/posts'));
		expect(anchor.textContent).toBe('Back to list');
	});

	it('Does use current bindings if going to a specific route but relative bindings is specified', () => {
		setCurrentPage('/posts/1');
		ReactTestUtils.renderIntoDocument(
			<Link to='postList' relativeBindings={{}}>
				Back to list
			</Link>,
		);
		expect(anchor.getAttribute('href')).toBe(getLinkFromUrl('/posts?id=1'));
		expect(anchor.textContent).toBe('Back to list');
	});

	it('Can specify css class', () => {
		setCurrentPage('/posts/1');
		ReactTestUtils.renderIntoDocument(
			<Link className='abc'>
				Back to list
			</Link>,
		);
		expect(anchor.getAttribute('class')).toBe('abc');
	});

	it('Can be disabled', () => {
		setCurrentPage('/posts/1');
		ReactTestUtils.renderIntoDocument(
			<Link disabled>
				Back to list
			</Link>,
		);
		expect(anchor.getAttribute('disabled')).toBe('');// undefined or null means false
	});

	it('Can be clicked', () => {
		setCurrentPage('/posts/1');
		const onClick = jest.fn();
		ReactTestUtils.renderIntoDocument(
			<Link onClick={onClick}>
				Back to list
			</Link>,
		);
		ReactTestUtils.Simulate.click(anchor);
		expect(onClick).toBeCalled();
	});
});
