// @flow

import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AppStyles from 'Mylo/style/AppStyles';

type PropsType = {
  categories: CategoryType[],
  favoriteId: number,
  pickCategory: () => void,
}

export default class CategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.pickCategory = this.pickCategory.bind(this);
  }

  props: PropsType;

  pickCategory(event, child) {
    this.props.pickCategory(this.props.favoriteId, child.props.id);
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton >
            <MoreVertIcon color={AppStyles.colors.iconGrey} />
          </IconButton>
        }
        maxHeight={272}
        onItemTouchTap={this.pickCategory}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {this.props.categories.map((category: CategoryType) => (
          <MenuItem key={category.id} id={category.id}>
            <div style={{color: category.color}}>{category.name}</div>
          </MenuItem>
        ))}
      </IconMenu>
    )
  }
}
