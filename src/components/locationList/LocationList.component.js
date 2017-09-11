// @flow

import React, { Component } from 'react';
import AppStyles from 'Mylo/style/AppStyles';
import { CategoryPicker } from './component';

const styles = {
  favorite: {
    height: 100,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: AppStyles.colors.lightGrey,
    borderLeftWidth: AppStyles.margins.small,
    borderLeftStyle: 'solid',
    borderLeftColor: AppStyles.colors.grey,
    justifyContent: 'space-between',
    display: 'flex',
    backgroundColor: AppStyles.colors.white,
  },
  infos: {
    fontColor: AppStyles.colors.black,
    padding: AppStyles.margins.small,
  },
  title: {
    fontSize: 20,
  },
  categoryPickerContainer: {
    height: '100%',
  },
  emptyContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.lightGrey,
    padding: AppStyles.margins.large,
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: 'Roboto-Thin',
    fontSize: 28,
  },
};

type PropsType = {
  favorites: FavoriteType[],
  style: {},
}

export default class LocationList extends Component {
  props: PropsType;

  renderFavoritesList = () => (
    <div style={this.props.style}>
      {this.props.favorites.map(favorite => (
        <div key={favorite.id}>
          <div style={styles.favorite}>
            <div style={styles.infos}>
              <div style={Object.assign({}, AppStyles.defaultTextStyle, styles.title)}>{favorite.name}</div>
              <div style={AppStyles.defaultTextStyle}>{favorite.streetNumber} {favorite.streetName}</div>
              <div style={AppStyles.defaultTextStyle}>6.3m</div>
            </div>
            <div style={styles.categoryPickerContainer}>
              <CategoryPicker />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  renderEmptyList = () => (
    <div style={styles.emptyContainer}>
      <div style={styles.emptyText}>
        What do you want to add ?
      </div>
    </div>
  );

  render() {
    return (
       this.props.favorites.length > 0 ? this.renderFavoritesList() : this.renderEmptyList()
    );
  }
}
