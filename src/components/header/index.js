// @flow

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import myloLogo from 'Mylo/mylo-logo.png';

const styles = {
  logo: {
    marginTop: 5,
    height: 33,
		width: 33,
  },
};

export default class Header extends Component {
	render() {
		return (
			<AppBar
				title="Mylo"
				iconElementLeft={<img style={styles.logo} src={myloLogo} alt="MyloLogo"/>}
			/>
		);
	}
}
