// @flow

import React, { Component } from 'react';
// $FlowFixMe
import AppStyles from 'style/AppStyles';
import { map } from 'lodash';

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

type PropsType = {
  favorites: FavoriteType[],
  style: {},
}

export default class LocationList extends Component {
  props: PropsType;

  renderFavoritesList = () => (
    map(this.props.favorites,(favorite => (
      <div key={favorite.id} style={this.props.style}>
        <div style={styles.favorite}>
          <div style={styles.infos}>
            <div style={Object.assign({}, AppStyles.defaultTextStyle, styles.title)}>{favorite.name}</div>
            <div style={AppStyles.defaultTextStyle}>{favorite.streetNumber} {favorite.streetName}</div>
            <div style={AppStyles.defaultTextStyle}>6.3m</div>
          </div>
        </div>
      </div>
    )))
  )

  render() {
    const { favorites } = this.props;
    return (
      <div>
        { this.renderFavoritesList() }
      </div>
    );
  }
}
