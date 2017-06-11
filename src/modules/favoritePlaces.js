// @flow

import { put, call, takeLatest } from 'redux-saga/effects';

const actionTypes = {
  GET_FAVORITE_PLACES: {
    REQUEST: 'GET_FAVORITE_PLACES.REQUEST',
    SUCCESS: 'GET_FAVORITE_PLACES.SUCCESS',
  },
};

const initialState = {};

export const getFavoritePlacesCreator = () => ({
  type: actionTypes.GET_FAVORITE_PLACES.REQUEST,
});

export const selectFavoritePlaces = (state: AppStateType): FavoritePlaceType[] => state.favoritePlaces.map;

export const favoritePlacesReducer = (
  state: FavoritePlacesType | {} = initialState,
  action: any,
): FavoritePlacesType | {} => {
  switch (action.type) {
    default:
      return state;
  }
};
