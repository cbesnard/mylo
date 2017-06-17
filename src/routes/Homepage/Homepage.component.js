// @flow

import React, { Component } from 'react';
// $FlowFixMe
import { Tabs, Header, ActionsBar, Category } from 'components';

type PropsType = {
  style: {},
  refreshGeolocation: () => any,
  geolocation: GeolocationType,
}

const styles = {
  app: {
    height: '100%',
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}

export default class Homepage extends Component {
  props: PropsType;

  render() {
    navigator.geolocation.watchPosition(this.props.refreshGeolocation, () => console.log('err'));

    return (
      <div style={styles.app}>
        <Header />
        <Category />
        <Tabs />
        <div className="buttonsContainer">
          <ActionsBar />
        </div>
      </div>
    )
  }
}
