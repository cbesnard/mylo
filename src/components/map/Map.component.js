// @flow

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

type PropsType = {
  style: {},
  geolocation: GeolocationType,
}

export default class Map extends Component {

  props: PropsType;

  render() {
    const { geolocation } = this.props;
    return (
      <div style={this.props.style}>
        {
          geolocation &&
          <GoogleMapReact
            defaultCenter={{lat: geolocation.latitude, lng: geolocation.longitude}}
            defaultZoom={12}
          />
        }
      </div>
    );
  }
}