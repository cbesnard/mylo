// @flow

import React, { Component } from 'react';

const styles = {
  circle: {
    borderWidth: 10,
    borderStyle: 'solid',
    height: 100,
    width: 100,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    fontSize: 20,
  }
}

type PropsType = {
  color: string,
  children: any,
}

class Category extends Component {
  props: PropsType;

  render(){
    return (
      <div style={{...styles.circle, ...{borderColor: this.props.color}}} >
        <p style={styles.categoryName}>{this.props.children}</p>
      </div>
    );
  }
}

Category.defaultProps = {
  color: '#DBDBDB',
}

export default Category;
