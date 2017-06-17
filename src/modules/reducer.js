import { combineReducers } from 'redux';
import { geolocationReducer } from 'modules/geolocation'
import { favoritesReducer } from 'modules/favorites'
import { firebaseStateReducer } from 'react-redux-firebase'

const appReducer = combineReducers({
  firebase: firebaseStateReducer,
  geolocation: geolocationReducer,
  favorites: favoritesReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
