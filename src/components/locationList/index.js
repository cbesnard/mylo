// @flow

import React, { Component } from 'react';
// $FlowFixMe
import AppStyles from 'style/AppStyles';

const styles = {
  favorite: {
    height: 100,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: AppStyles.colors.lightGrey,
    borderLeftWidth: 10,
    borderLeftStyle: 'solid',
    borderLeftColor: AppStyles.colors.grey,
    paddingLeft: 15,
    alignItems: 'center',
    display: 'flex',
    backgroundColor: AppStyles.colors.white,
  },
  infos: {
    fontColor: AppStyles.colors.black,
  },
  title: {
    fontSize: 20,
  },
  address: {
  },
  distance: {
  },
};

export default class LocationList extends Component {
  render() {
    return (
      <div style={this.props.style}>
        <div style={styles.favorite}>
          <div style={styles.infos}>
            <div style={Object.assign({}, AppStyles.defaultTextStyle, styles.title)}>Titre</div>
            <div style={AppStyles.defaultTextStyle}>19 rue Marx Dormoy</div>
            <div style={AppStyles.defaultTextStyle}>6.3m</div>
          </div>
        </div>
      </div>
    );
  }
}
