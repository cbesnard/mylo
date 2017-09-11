// @flow

import { put, call, takeLatest, select } from 'redux-saga/effects';
import { fetchGeocode } from 'Mylo/services/api';
import { selectSelectedCategory } from 'Mylo/modules/categories';
import { map, keyBy, filter, omit } from 'lodash';

const actionTypes = {
  ADD_FAVORITE: {
    REQUEST: 'ADD_FAVORITE.REQUEST',
    SUCCESS: 'ADD_FAVORITE.SUCCESS',
  },
  UPDATE_FAVORITE: {
    REQUEST: 'UPDATE_FAVORITE.REQUEST',
  },
  DELETE_FAVORITE: {
    REQUEST: 'DELETE_FAVORITE.REQUEST',
  },
  PICK_CATEGORY_FOR_FAVORITE: {
    REQUEST: 'PICK_CATEGORY_FOR_FAVORITE.REQUEST',
  }
};

const initialState = {
  map: {}
};

export const addFavoriteCreator = (locationName: string, latitude: number, longitude: number) => ({
  type: actionTypes.ADD_FAVORITE.REQUEST,
  locationName,
  latitude,
  longitude,
});

export const updateFavoriteListCreator = (favoriteList: FavoriteType) => ({
  type: actionTypes.UPDATE_FAVORITE.REQUEST,
  favoriteList,
});

export const pickCategoryForFavoriteCreator = (favoriteId: number, categoryId: number) => ({
  type: actionTypes.PICK_CATEGORY_FOR_FAVORITE.REQUEST,
  favoriteId,
  categoryId,
});

export const deleteFavoriteCreator = (favoriteId: number) => ({
  type: actionTypes.DELETE_FAVORITE.REQUEST,
  favoriteId,
});

export const selectFavorites = (state: AppStateType): FavoriteType[] =>
  map(state.favorites.map, favorite => favorite);

export const selectFavoritesFilterBySelectedCategory = (state: AppStateType): FavoriteType[] => {
  const selectedCategory = selectSelectedCategory(state);
  const allFavorites = map(state.favorites.map, favorite => favorite);

  return selectedCategory === 0 ?
    allFavorites :
    filter(allFavorites, ['categoryId', selectedCategory]);
};

export const favoritesReducer = (
  state: FavoritesType = initialState,
  action: any,
): FavoritesType => {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE.SUCCESS:
      return ({
        ...state,
        map: {
          ...state.map,
          [action.favorite.id]: action.favorite,
        },
      });
    case actionTypes.UPDATE_FAVORITE.REQUEST:
      return ({
        ...state,
        map: {
          ...state.map,
          ...keyBy(action.favoriteList, favorite => favorite.id),
        },
      });
    case actionTypes.PICK_CATEGORY_FOR_FAVORITE.REQUEST:
      return ({
        ...state,
        map: {
          ...state.map,
          [action.favoriteId]: {
            ...state.map[action.favoriteId],
            categoryId: action.categoryId,
          },
        },
      });
    case actionTypes.DELETE_FAVORITE.REQUEST:
      return ({
        ...state,
        map: omit(state.map, [action.favoriteId]),
      });
    default:
      return state;
  }
};

const translateGeocodeToFavorite = (locationName: string, geocode, selectedCategory: number): FavoriteType => ({
  id: geocode.place_id,
  categoryId: selectedCategory,
  name: locationName,
  streetNumber: geocode.address_components[0].long_name,
  streetName: geocode.address_components[1].long_name,
  city: geocode.address_components[2].long_name,
  latitude: geocode.geometry.location.lat,
  longitude: geocode.geometry.location.lng,
});

export function* addFavorite(action: any): SagaType {
  const selectedCategory = yield select(selectSelectedCategory);
  const { locationName, latitude, longitude } = action;
  const geocodeResponse = yield call(() => fetchGeocode(latitude, longitude));
  yield put({
    type: actionTypes.ADD_FAVORITE.SUCCESS,
    favorite: translateGeocodeToFavorite(locationName, geocodeResponse.body.results[0], selectedCategory),
  });
}

export function* watchAddFavoriteSaga(): SagaType {
  yield takeLatest(actionTypes.ADD_FAVORITE.REQUEST, addFavorite);
}
