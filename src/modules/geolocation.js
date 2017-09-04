// @flow

import { takeLatest, select } from 'redux-saga/effects';
import { selectFavorites } from './favorites';
import { map } from 'lodash';

const actionTypes = {
  GET_GEOLOCATION: {
    REFRESH_REQUEST: 'GET_GEOLOCATION.REFRESH_REQUEST',
    ERROR: 'GET_GEOLOCATION.ERROR',
  },
};

const initialState = {};

export const refreshGeolocation = (position: { coords: GeolocationApiType } ) => ({
  type: actionTypes.GET_GEOLOCATION.REFRESH_REQUEST,
  position: translateCoordinates(position.coords)
});

export const selectGeolocation = (state: AppStateType): GeolocationType => state.geolocation;

export const geolocationReducer = (
  state: GeolocationType | {} = initialState,
  action: any,
): GeolocationType | {} => {
  switch (action.type) {
    case actionTypes.GET_GEOLOCATION.REFRESH_REQUEST:
      return {
        ...state,
        ...action.position,
      };
    case actionTypes.GET_GEOLOCATION.ERROR:
      return initialState;
    default:
      return state;
  }
};

const translateCoordinates = (coordinates: GeolocationApiType): GeolocationType => ({
  latitude: coordinates.latitude,
  longitude: coordinates.longitude,
  accuracy: coordinates.accuracy,
  altitude: coordinates.altitude,
});

const translateToGoogleGeolocation = (geolocation): GoogleGeolocationType => ({
  latitude: geolocation.latitude,
  longitude: geolocation.longitude,
});

export function* refreshDistance(action: any): SagaType {
  const origin = translateToGoogleGeolocation(action.position);
  const favoriteList = yield select(selectFavorites);
  const favoriteLocations = map(favoriteList, favorite => translateToGoogleGeolocation(favorite));
  console.log('origin', origin);
  console.log('favoriteLocations', favoriteLocations);
}

export function* watchRefreshGeolocationSaga(): SagaType {
  yield takeLatest(actionTypes.GET_GEOLOCATION.REFRESH_REQUEST, refreshDistance);
}
