// @flow

import { put, call, takeLatest } from 'redux-saga/effects';
// $FlowFixMe
import { fetchGeocode } from 'services/api';

const actionTypes = {
  ADD_FAVORITES: {
    REQUEST: 'ADD_FAVORITES.REQUEST',
    SUCCESS: 'ADD_FAVORITES.SUCCESS',
  },
};

const initialState = {
  map: {}
};

export const addFavoriteCreator = (lat: number, lng: number) => ({
  type: actionTypes.ADD_FAVORITES.REQUEST,
  latitude: lat,
  longitude: lng,
});

export const selectFavorites = (state: AppStateType): {[id: number]: FavoriteType} => state.favorites.map;

export const favoritesReducer = (
  state: FavoritesType = initialState,
  action: any,
): FavoritesType => {
  switch (action.type) {
    case actionTypes.ADD_FAVORITES.SUCCESS:
      return ({
        ...state,
        map: {
          ...state.map,
          [action.favorite.id]: action.favorite,
        },
      });
    default:
      return state;
  }
}

const translateGeocodeToFavorite = (geocode): FavoriteType => ({
  id: geocode.place_id,
  name: 'Test',
  streetNumber: geocode.address_components[0].long_name,
  streetName: geocode.address_components[1].long_name,
  city: geocode.address_components[2].long_name,
  latitude: geocode.geometry.location.lat,
  longitude: geocode.geometry.location.lng,
})

export function* addFavorite(action: any): SagaType {
  const { latitude, longitude } = action;
  const geocodeResponse = yield call(() => fetchGeocode(latitude, longitude));
  yield put({
    type: actionTypes.ADD_FAVORITES.SUCCESS,
    favorite: translateGeocodeToFavorite(geocodeResponse.body.results[0]),
  });
}

export function* watchAddFavoriteSaga(): SagaType {
  yield takeLatest(actionTypes.ADD_FAVORITES.REQUEST, addFavorite);
}