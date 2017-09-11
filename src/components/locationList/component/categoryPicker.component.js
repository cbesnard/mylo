// @flow

import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import appStyle from 'Mylo/style/AppStyles'

type PropsType = {
  categories: CategoryType[]
}

export default class categoryPicker extends Component {

  props: PropsType;

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton >
            <MoreVertIcon color={appStyle.colors.iconGrey} />
          </IconButton>
        }
        maxHeight={272}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {this.props.categories.map((category: CategoryType) => (
          <MenuItem>
            <div style={{color: category.color}}>{category.name}</div>
          </MenuItem>
        ))}
      </IconMenu>
    )
  }
}
