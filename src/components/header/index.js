import React, { Component } from 'react';
import './style.css';
import myloLogo from '../../mylo-logo.png';

export default class Header extends Component {
	render() {
		return (
			<header>
				<div className='header'>
					<img src={myloLogo} alt="logo"/>
					<p>Mylo</p>
				</div>
			</header>
		);
	}
}
