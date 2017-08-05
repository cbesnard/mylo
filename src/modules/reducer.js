import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { geolocationReducer } from 'Mylo/modules/geolocation'
import { favoritesReducer } from 'Mylo/modules/favorites'
import { snackbarReducer } from 'Mylo/modules/snackbar'
import { authenticationReducer } from 'Mylo/modules/authentication'

const appReducer = combineReducers({
  geolocation: geolocationReducer,
  favorites: favoritesReducer,
  snackbar: snackbarReducer,
  router: routerReducer,
  authentication: authenticationReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
