// @flow

declare type GeolocationApiType = {
  accuracy: ?number,
  altitude: ?number,
  altitudeAccuracy: ?number,
  heading: ?number,
  latitude: number,
  longitude: number,
  speed: ?number,
}

declare type GeolocationType = {
  accuracy: ?number,
  altitude: ?number,
  latitude: number,
  longitude: number,
}

declare type GoogleGeolocationType = {
  latitude: number,
  longitude: number,
}
