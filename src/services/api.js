// @flow

import request from 'superagent';

const fetchGeocode = (latitude: number, longitude: number) => (
  request.get('https://maps.googleapis.com/maps/api/geocode/json')
    .query({'latlng': `${latitude},${longitude}`})
);

export {
  fetchGeocode
};
