// @flow

const actionTypes = {
  GET_FAVORITES: {
    REQUEST: 'GET_FAVORITES.REQUEST',
    SUCCESS: 'GET_FAVORITES.SUCCESS',
  },
};

const initialState = {};

export const getFavoritesCreator = () => ({
  type: actionTypes.GET_FAVORITES.REQUEST,
});

export const selectFavorites = (state: AppStateType): FavoriteType[] => state.favorites.map;

export const favoritesReducer = (
  state: FavoritesType | {} = initialState,
  action: any,
): FavoritesType | {} => {
  switch (action.type) {
    default:
      return state;
  }
};
