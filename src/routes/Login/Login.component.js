// @flow

import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

// $FlowFixMe
import appStyle from 'style/AppStyles'
// $FlowFixMe
import loginImage from 'assets/login.png'

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
  googleButtonContainer: {
    marginTop: 60,
  },
  googleButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgba(0, 0, 0, 0.54)',
    height: 50,
    width: 240,
    border: 'none',
    textAlign: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0px',
    fontSize: 16,
    display: 'block',
    borderRadius: 1,
    transition: 'background-color 0.218s, border-color 0.218s, box-shadow 0.218s',
    fontFamily: 'Roboto, arial, sans-serif',
    cursor: 'pointer',
    padding: 0,
  }
}

type PropsType = {
  showSnackbar: (message: string) => void,
  navigateToHome: () => void,
}

export default class Login extends Component {
  props: PropsType;

  successfulAuthGoogle = (res: any) => {
    this.props.navigateToHome()
    this.props.showSnackbar("Login SuccessFul")
  }

  errorAuthGoogle = (error) => {
    console.log(error)
    this.props.showSnackbar("Login Error")
  }

  render() {
    return (
      <div style={styles.app}>
        <div style={styles.imageContainer}>
          <img style={styles.image} src={loginImage} alt="login" />
        </div>
        <div style={styles.textContainer}>
          Save all your favourite places in one place!
        </div>
        <div style={styles.googleButtonContainer}>
          <GoogleLogin
            style={styles.googleButton}
            clientId="151939296369-slesjdpgcirmtpljjf941mhjv7p0l7eo.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={this.successfulAuthGoogle}
            onFailure={this.errorAuthGoogle}
          />
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  showSnackbar: PropTypes.func,
}
