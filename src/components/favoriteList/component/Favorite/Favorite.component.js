// @flow

import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
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
  actionsContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
};

type PropsType = {
  favorite: FavoriteType,
  category: CategoryType,
  deleteFavorite: () => void,
}

export default class Favorite extends Component {
  props: PropsType;

  computeFavoriteStyle(category) {
    return ({
      ...styles.favorite,
      borderLeftColor: category.color,
    })
  }

  deleteFavorite = () => this.props.deleteFavorite(this.props.favorite.id);

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
          <div style={styles.actionsContainer}>
            <CategoryPicker favoriteId={favorite.id}/>
            <IconButton onClick={this.deleteFavorite}>
              <DeleteIcon color={AppStyles.colors.warningRed} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}
