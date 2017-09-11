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
};

type PropsType = {
  category: CategoryType,
  isAllCategory: boolean,
  children: any,
  selectedCategory: string,
  selectCategory: (id: string) => void,
}

class Category extends Component {
  props: PropsType;

  static defaultProps = {
    isAllCategory: false,
  };

  isCategorySelected = () => (
      this.props.category.id === this.props.selectedCategory
  );

  getCategoryStyle = () => ({
    ...styles.circle,
    ...{
      borderColor: !!this.props.category.color ? this.props.category.color : '#DBDBDB',
      fontFamily: this.isCategorySelected() ? 'Roboto-Medium' : 'Roboto-Light',
    }
  });


  render(){
    const { category, selectCategory } = this.props;
    return (
      <div style={this.getCategoryStyle()} onClick={() => selectCategory(category.id)}>
        <p style={styles.categoryName}>{category.name}</p>
      </div>
    );
  }
}

export default Category;
