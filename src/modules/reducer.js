import { combineReducers } from 'redux';
import { geolocationReducer } from 'modules/geolocation'
import { favoritesReducer } from 'modules/favorites'
import { snackbarReducer } from 'modules/snackbar'
import { routerReducer } from 'react-router-redux'

const appReducer = combineReducers({
  geolocation: geolocationReducer,
  favorites: favoritesReducer,
  snackbar: snackbarReducer,
  router: routerReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
