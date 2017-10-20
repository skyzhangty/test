import React from 'react';
import blockM from '../../assets/images/BlockM.png';

export default () => (
	<header className='header-st'>
		<section className="global-nav-st">
			<a href="index.html" className="logo-M">
				<img src={blockM} alt=""/>
			</a>
			<nav>
				<a id="aLogout" href="/backend/logout" className="logout">
					<span className="fa fa-sign-out fa-margin-right" aria-hidden="true"/>
					Log out
				</a>
			</nav>
		</section>
	</header>
);
