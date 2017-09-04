// @flow

import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchGeocode } from 'Mylo/services/api';
import { map, keyBy } from 'lodash';

const actionTypes = {
  ADD_FAVORITES: {
    REQUEST: 'ADD_FAVORITES.REQUEST',
    SUCCESS: 'ADD_FAVORITES.SUCCESS',
  },
  UPDATE_FAVORITES: {
    REQUEST: 'UPDATE_FAVORITES.REQUEST',
  }
};

const initialState = {
  map: {}
};

export const addFavoriteCreator = (locationName: string, latitude: number, longitude: number) => ({
  type: actionTypes.ADD_FAVORITES.REQUEST,
  locationName,
  latitude,
  longitude,
});

export const updateFavoriteListCreator = (favoriteList: FavoriteType) => ({
  type: actionTypes.UPDATE_FAVORITES.REQUEST,
  favoriteList,
});

export const selectFavorites = (state: AppStateType): FavoriteType[] => map(state.favorites.map, favorite => favorite);

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
    case actionTypes.UPDATE_FAVORITES.REQUEST:
      return ({
        ...state,
        map: {
          ...state.map,
          ...keyBy(action.favoriteList, favorite => favorite.id),
        },
      });
    default:
      return state;
  }
}

const translateGeocodeToFavorite = (locationName: string, geocode): FavoriteType => ({
  id: geocode.place_id,
  name: locationName,
  streetNumber: geocode.address_components[0].long_name,
  streetName: geocode.address_components[1].long_name,
  city: geocode.address_components[2].long_name,
  latitude: geocode.geometry.location.lat,
  longitude: geocode.geometry.location.lng,
})

export function* addFavorite(action: any): SagaType {
  const { locationName, latitude, longitude } = action;
  const geocodeResponse = yield call(() => fetchGeocode(latitude, longitude));
  yield put({
    type: actionTypes.ADD_FAVORITES.SUCCESS,
    favorite: translateGeocodeToFavorite(locationName, geocodeResponse.body.results[0]),
  });
}

export function* watchAddFavoriteSaga(): SagaType {
  yield takeLatest(actionTypes.ADD_FAVORITES.REQUEST, addFavorite);
}
