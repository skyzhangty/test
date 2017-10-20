/* eslint-disable no-console */
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import ReduxRouter from './containers/redux.router';

import Wait from './containers/wait';
import setupAxios from './shared/config/axios.setup';
import Footer from './components/Footer';
import Header from './components/Header';
import StudyList from './containers/current.study.list.page';
import {routerHistorySet} from './actions/redux.router';
// import ArchivedStudyList from './containers/archived.study.list.page';
// import StudyHome from './containers/study.home';

import store from './store';
import history from './shared/history';
import '../assets/styles/styles.scss';
// import UnknownPage from './components/UnknownPage';

setupAxios();
store.dispatch(routerHistorySet(history));

render(<Header/>, document.getElementsByClassName('react-header')[0]);

render(
	<Provider store={store}>
		<div>
			<Wait />
			<ReduxRouter>
				<Switch>
					<Route path="/studies/current" component={StudyList} />
				</Switch>
			</ReduxRouter>
		</div>
	</Provider>,
	document.getElementById('mainContent')
);

render(<Footer/>, document.getElementsByClassName('react-footer')[0]);
