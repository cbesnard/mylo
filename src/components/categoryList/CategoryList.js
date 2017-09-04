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
};

export default class CategoryList extends Component {

  render(){
    return (
      <div style={styles.container}>
        <GridList cellHeight={90} style={styles.categoryList}>
          <Category
            name="all"
          />
          <Category
            color='#80d8ff'
            name="bar"
          />
          <Category
            color='#ffeb59'
            name="eat"
          />
          <Fab>
            <SearchIcon />
          </Fab>
        </GridList>
      </div>
    );
  }
}