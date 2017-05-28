import './style';

import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './components/header';
import Home from './routes/home';

export default () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
		</Router>
	</div>
);
