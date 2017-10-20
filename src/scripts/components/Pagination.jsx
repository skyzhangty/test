import React from 'react';
import PropTypes from 'prop-types';
import appConfig from '../shared/config/app.config';
import util from '../shared/util';
import Link from '../containers/link';

/**
 * The purpose of this component is to render the page and item counts, and displayed range.
 * It takes a single callback that will be invoked with the page the user desires to see.
 */
class Pagination extends React.PureComponent {
	constructor(props) {
		super(props);
		util.bindToMe(this,
			'togglePageSelectionHidden',
			'showNextPage',
			'showPrevPage',
			'showPageOfSelectEvent',
		);
		this.state = {isPageSelectionHidden: props.isPageSelectionHiddenInitially};
	}

	togglePageSelectionHidden() {
		const state = this.state;
		this.setState({
			...state,
			isPageSelectionHidden: !state.isPageSelectionHidden,
		});
	}

	showNextPage(e) {
		if (!this.isLastPage())
			this.showPage(this.props.currentPage + 1);
		e.preventDefault();
	}

	showPrevPage(e) {
		if (!this.isFirstPage())
			this.showPage(this.props.currentPage - 1);
		e.preventDefault();
	}

	showPageOfSelectEvent(e) {
		this.showPage(parseInt(e.target.value, 10));
	}

	showPage(n) {
		this.props.onShowPage(n);
	}

	isFirstPage() {
		return this.props.currentPage <= 1;
	}

	isLastPage() {
		return this.numPages() <= this.props.currentPage;
	}

	numPages() {
		return Math.ceil(this.props.numItems / this.props.pageSize);
	}

	render() {
		// everything is one-based here.
		const {numItems, pageSize, currentPage} = this.props;
		const {isPageSelectionHidden} = this.state;

		const from = Math.min(numItems, pageSize * (currentPage - 1) + 1);
		const to = Math.min(numItems, pageSize * currentPage);
		// no computed properties in react, so we'll just have helper functions
		const numPages = this.numPages();
		const isFirstPage = this.isFirstPage();
		const isLastPage = this.isLastPage();
		const isSinglePage = isLastPage && isFirstPage;

		const pageSelection = (
			<div>
				<Link
					id="prev-page"
					relativeBindings={{page: currentPage - 1}}
					className="small-outline-button"
					disabled={isFirstPage}
					onClick={this.showPrevPage}>
					<span className="fa fa-chevron-left" aria-hidden="true"/>
					Previous
				</Link>
				<Link
					id="next-page"
					relativeBindings={{page: currentPage + 1}}
					className="small-outline-button"
					disabled={isLastPage}
					onClick={this.showNextPage}>
					Next
					<span className="fa fa-chevron-right" aria-hidden="true"/>
				</Link>
				<section className="paginate-to-specific-page">
					<a
						role="button" tabIndex="0"
						data-toggle="collapse"
						aria-expanded="false"
						aria-controls="divSelectPageNum"
						className="collapsed"
						onClick={this.togglePageSelectionHidden}>
						Jump to a specific page
					</a>

					<div id="divSelectPageNum" className={isPageSelectionHidden ? 'hide' : ''}>
						<form>
							<label htmlFor="selectPage">Page</label>
							<select
								id="selectPage"
								value={currentPage}
								onChange={this.showPageOfSelectEvent}>
								{
									util.collectFromTo(1, numPages, (pageNum) =>
										(<option key={pageNum} value={pageNum}>
											{pageNum}
										</option>))
								}
							</select>
						</form>
						<a
							role="button" tabIndex="0"
							data-toggle="collapse"
							aria-expanded="false"
							aria-controls="divSelectPageNum"
							className="collapsed"
							onClick={this.togglePageSelectionHidden}>
							<span className="fa fa-chevron-up" aria-hidden="true"/>
							Close
						</a>
					</div>
				</section>
			</div>
		);

		return (
			<section className={`pagination ${isSinglePage ? 'single-page' : ''}`}>
				<div id="divPaginationLabel" className="pagination-label">
					Showing {from} - {to} of {numItems} studies
				</div>
				{isSinglePage ? <div/> : pageSelection}
			</section>
		);
	}
}

Pagination.propTypes = {
	// Everything is one-based here.
	numItems: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onShowPage: PropTypes.func.isRequired,
	pageSize: PropTypes.number,
	isPageSelectionHiddenInitially: PropTypes.bool,
};

Pagination.defaultProps = {
	pageSize: appConfig.study.page.size,
	isPageSelectionHiddenInitially: true,
};

export default Pagination;
