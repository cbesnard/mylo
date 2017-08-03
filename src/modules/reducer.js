import { combineReducers } from 'redux';
import { geolocationReducer } from 'modules/geolocation'
import { favoritesReducer } from 'modules/favorites'
import { snackbarReducer } from 'modules/snackbar'

const appReducer = combineReducers({
  geolocation: geolocationReducer,
  favorites: favoritesReducer,
  snackbar: snackbarReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
