import { combineReducers } from 'redux';
import { geolocationReducer } from 'modules/geolocation'
import { favoritePlacesReducer } from 'modules/favoritePlaces'

const appReducer = combineReducers({
  geolocation: geolocationReducer,
  favoritePlaces: favoritePlacesReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
