import React, { Component } from 'react';
import Fab from 'material-ui/FloatingActionButton';
import './style.css'
import MapMarker from 'react-icons/lib/fa/map-marker';
import Search from 'react-icons/lib/fa/search';

export default class Buttons extends Component {
  render() {
    return (
      <div className="buttonsContainer">
        <div className="container">
          <Fab>
            <Search className="icon"/>
          </Fab>
        </div>
        <div className="container">
          <Fab>
            <MapMarker className="icon"/>
          </Fab>
        </div>
      </div>
    );
  }
}