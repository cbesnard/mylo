// @flow

import React, { Component } from 'react';
import SearchIcon from 'react-icons/lib/fa/plus';
import Fab from 'material-ui/FloatingActionButton';
import GridList from 'material-ui/GridList';
import { Category } from './component'

const styles = {
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#FFF',
  },
  categoryList: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    overflowX: 'auto',
    margin: 0,
  },
  addCategoryContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

type PropsType = {
  addCategory : () => void,
  categories : CategoryType[],
}

export default class CategoryList extends Component {
  props: PropsType;

  render(){
    return (
      <div style={styles.container}>
        <GridList cellHeight={90} style={styles.categoryList}>
          {this.props.categories.map((category: CategoryType) => (
            <Category
              key={category.id}
              category={category}
            />
          ))}
          <div style={styles.addCategoryContainer} onClick={this.props.addCategory}>
            <Fab>
              <SearchIcon />
            </Fab>
          </div>
        </GridList>
      </div>
    );
  }
}
