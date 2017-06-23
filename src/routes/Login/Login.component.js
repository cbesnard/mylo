// @flow

import React, { Component } from 'react';
// $FlowFixMe
import appStyle from 'style/AppStyles'
// $FlowFixMe
import loginImage from 'assets/login.png'
import GoogleButton from 'react-google-button'

type PropsType = {
  style: {},
}

const styles = {
  app: {
    height: '100%',
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: appStyle.colors.loginGrey,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: 200,
    width: 200,
    marginTop: 80,
    display: 'flex',
  },
  textContainer: {
    marginTop: 40,
    paddingLeft: 60,
    paddingRight: 60,
    fontFamily: 'Roboto-light',
    color: appStyle.colors.darkGrey,
    fontSize: appStyle.font.size.h1,
    textAlign: 'center',
  },
  googleButton: {
    marginTop: 60,
  }
}

export default class Login extends Component {
  props: PropsType;

  render() {
    return (
      <div style={styles.app}>
        <div style={styles.imageContainer}>
          <img style={styles.image} src={loginImage} alt="login" />
        </div>
        <div style={styles.textContainer}>
          Save all your favourite places in one place!
        </div>
        <div style={styles.googleButton}>
        <GoogleButton
          type='light'
        />
        </div>
      </div>
    )
  }
}
