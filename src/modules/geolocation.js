// @flow

import { put, call, takeLatest } from 'redux-saga/effects';

const actionTypes = {
  GET_GEOLOCATION: {
    REQUEST: 'GET_GEOLOCATION.REQUEST',
    ERROR: 'GET_GEOLOCATION.ERROR',
    SUCCESS: 'GET_GEOLOCATION.SUCCESS',
  },
};

const initialState = {};

export const refreshGeolocation = () => ({
  type: actionTypes.GET_GEOLOCATION.REQUEST,
});

export const selectGeolocation = (state: AppStateType): GeolocationType => state.geolocation;

export const geolocationReducer = (
  state: GeolocationType | {} = initialState,
  action: any,
): GeolocationType | {} => {
  switch (action.type) {
    case actionTypes.GET_GEOLOCATION.SUCCESS:
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
})

export function* getGeolocation(): SagaType {
  const geolocPromise = () => new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({coords}) => resolve(coords),
      error => reject(error),
    ));

  try {
    const position = yield call(geolocPromise);
    yield put({
      type: actionTypes.GET_GEOLOCATION.SUCCESS,
      position: translateCoordinates(position),
    });
  } catch (error) {
    yield put({
      type: actionTypes.GET_GEOLOCATION.ERROR,
    });
  }
}

export function* watchGeolocationSaga(): SagaType {
  yield takeLatest(actionTypes.GET_GEOLOCATION.REQUEST, getGeolocation);
}
