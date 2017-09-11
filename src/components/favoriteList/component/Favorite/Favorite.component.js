// @flow

import React, { Component } from 'react';
import AppStyles from 'Mylo/style/AppStyles';
import { CategoryPicker } from '../';

const styles = {
  favorite: {
    height: 100,
    flex: 1,
    transition: 'border-left-color 0.3s',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: AppStyles.colors.lightGrey,
    borderLeftWidth: AppStyles.margins.small,
    borderLeftStyle: 'solid',
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
};

type PropsType = {
  favorite: FavoriteType,
  category: CategoryType,
}

export default class Favorite extends Component {
  props: PropsType;

  computeFavoriteStyle(category) {
    return ({
      ...styles.favorite,
      borderLeftColor: category.color,
    })
  }

  render() {
    const { favorite, category } = this.props;

    return (
      <div key={favorite.id}>
        <div style={this.computeFavoriteStyle(category)}>
          <div style={styles.infos}>
            <div style={Object.assign({}, AppStyles.defaultTextStyle, styles.title)}>{favorite.name}</div>
            <div style={AppStyles.defaultTextStyle}>{favorite.streetNumber} {favorite.streetName}</div>
            <div style={AppStyles.defaultTextStyle}>6.3m</div>
          </div>
          <div style={styles.categoryPickerContainer}>
            <CategoryPicker favoriteId={favorite.id}/>
          </div>
        </div>
      </div>
    );
  }
}
