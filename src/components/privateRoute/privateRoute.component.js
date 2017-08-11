// @flow

import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'

export default class PrivateRoute extends Component {

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    );
  }
}