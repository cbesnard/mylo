// @flow

import React, { Component } from 'react';

const CATEGORY_SIZE = 90;

const styles = {
  circle: {
    borderWidth: 8,
    borderStyle: 'solid',
    height: CATEGORY_SIZE,
    width: CATEGORY_SIZE,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  categoryName: {
    textTransform: 'uppercase',
    fontSize: 18,
  }
}

type PropsType = {
  color: string,
  isAllCategory: boolean,
  children: any,
}

class Category extends Component {
  props: PropsType;

  static defaultProps = {
    color: '#DBDBDB',
    isAllCategory: false,
  };

  getCategoryStyle = () => ({
    ...styles.circle,
    ...{
      borderColor: this.props.color,
      fontFamily: this.props.isAllCategory ? 'Roboto-Medium' : 'Roboto-Light'
    }
  });

  render(){
    return (
      <div style={this.getCategoryStyle()} >
        <p style={styles.categoryName}>{this.props.children}</p>
      </div>
    );
  }
}

export default Category;
