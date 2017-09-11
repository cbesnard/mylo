// @flow

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import myloLogo from 'Mylo/mylo-logo.png';

const styles = {
  logo: {
    marginTop: 10,
    height: 25,
    width: 25,
  },
  avatar: {
    marginTop: 5,
  },
};

type PropsType = {
  user: any,
}

export default class Header extends Component {
  props: PropsType;

  render() {
    return (
      <AppBar
        title="Mylo"
        iconElementLeft={<img style={styles.logo} src={myloLogo} alt="MyloLogo" />}
        iconElementRight={<Avatar style={styles.avatar} src={this.props.user.imageUrl} />}
      />
    );
  }
}
