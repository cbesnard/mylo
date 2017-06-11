import React, { Component } from 'react';
import './style.css'

export default class Category extends Component {
  render(){
    return (
      <div className="categoryContainer">
        <div className="category" >
          <p className="categoryName">All</p>
        </div>
      </div>
    );
  }
}
