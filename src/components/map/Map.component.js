// @flow

import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
/* eslint-disable no-unused-vars */
import style from './styles.css';

const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyDQHAzd9koui1ArKcX1lbFfEIxQNe1EkwE";

const GettingStartedGoogleMap = withGoogleMap(props => {
  const { geolocation } = props;
  return (
    geolocation &&
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: geolocation.latitude, lng: geolocation.longitude }}
      // Pass the map reference here as props
      googleMapURL={googleMapURL}
    >
      <Marker
        position={{ lat: geolocation.latitude, lng: geolocation.longitude }}
      />
    </GoogleMap>
  );
});

export default GettingStartedGoogleMap
