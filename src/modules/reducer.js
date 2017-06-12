import { combineReducers } from 'redux';
import { geolocationReducer } from 'modules/geolocation'
import { favoritesReducer } from 'modules/favorites'

const appReducer = combineReducers({
  geolocation: geolocationReducer,
  favorites: favoritesReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
