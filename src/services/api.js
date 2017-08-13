// @flow

import request from 'superagent';
import { map, join } from 'lodash';

const fetchGeocode = (latitude: number, longitude: number) => (
  request.get('https://maps.googleapis.com/maps/api/geocode/json')
    .query({'latlng': `${latitude},${longitude}`})
);

const fetchDistance = (origins: googleGeolocationPointType, destinations: googleGeolocationPointType[]) => (
  request.get('https://maps.googleapis.com/maps/api/distancematrix/json')
    .query({
      'origins': `${origins.latitude},${origins.longitude}`,
      'destinations': join(map(destinations, destination => `${destination.latitude},${destination.longitude}`), '|'),
    })
);

export {
  fetchGeocode,
  fetchDistance,
};
