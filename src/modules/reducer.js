import { combineReducers } from 'redux';
import { geolocationReducer } from 'modules/geolocation'

const appReducer = combineReducers({
  geolocation: geolocationReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
