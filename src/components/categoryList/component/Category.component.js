// @flow

import React, { Component } from 'react';
import { lowerCase } from 'lodash';

const CATEGORY_SIZE = 90;

const styles = {
  circle: {
    cursor: 'pointer',
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
};

type PropsType = {
  color: string,
  name: string,
  isAllCategory: boolean,
  children: any,
  selectedCategory: string,
  selectCategory: (id: string) => void,
}

class Category extends Component {
  props: PropsType;

  static defaultProps = {
    color: '#DBDBDB',
    isAllCategory: false,
  };

  isCategorySelected = () => (
      !!this.props.selectedCategory &&
      !!this.props.name &&
      lowerCase(this.props.name) === lowerCase(this.props.selectedCategory)
  );

  getCategoryStyle = () => ({
    ...styles.circle,
    ...{
      borderColor: this.props.color,
      fontFamily: this.isCategorySelected() ? 'Roboto-Medium' : 'Roboto-Light',
    }
  });


  render(){
    const { name, selectCategory } = this.props;
    return (
      <div style={this.getCategoryStyle()} onClick={() => selectCategory(name)}>
        <p style={styles.categoryName}>{name}</p>
      </div>
    );
  }
}

export default Category;
