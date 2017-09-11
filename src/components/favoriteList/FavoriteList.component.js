// @flow

import React, { Component } from 'react';
import AppStyles from 'Mylo/style/AppStyles';
import { Favorite } from './component';

const styles = {
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

export default class FavoriteList extends Component {
  props: PropsType;

  renderFavoritesList = () => (
    <div style={this.props.style}>
      {this.props.favorites.map(favorite => (
        <Favorite key={favorite.id} favorite={favorite} />
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
