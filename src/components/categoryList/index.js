import React, { Component } from 'react';
import SearchIcon from 'react-icons/lib/fa/plus';
import Fab from 'material-ui/FloatingActionButton';
import GridList from 'material-ui/GridList';
import { Category } from './component'

const styles = {
  container: {
    padding: 10
  }
}

export default class CategoryList extends Component {
  render(){
    return (
      <div style={styles.container}>
          <GridList cellHeight={100}>
            <Category>
              All
            </Category>
            <div className="category" >
              <Fab>
                <SearchIcon />
              </Fab>
            </div>
          </GridList>
      </div>
    );
  }
}
