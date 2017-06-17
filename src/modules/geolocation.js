// @flow

const actionTypes = {
  GET_GEOLOCATION: {
    REFRESH_REQUEST: 'GET_GEOLOCATION.REFRESH_REQUEST',
    ERROR: 'GET_GEOLOCATION.ERROR',
  },
};

const initialState = {};

export const refreshGeolocation = (position: { coords: GeolocationApiType} ) => ({
  type: actionTypes.GET_GEOLOCATION.REFRESH_REQUEST,
  position: translateCoordinates(position.coords)
});

export const selectGeolocation = (state: AppStateType): GeolocationType => state.geolocation;

export const geolocationReducer = (
  state: GeolocationType | {} = initialState,
  action: any,
): GeolocationType | {} => {
  switch (action.type) {
    case actionTypes.GET_GEOLOCATION.REFRESH_REQUEST:
      return {
        ...state,
        ...action.position,
      };
    case actionTypes.GET_GEOLOCATION.ERROR:
      return initialState;
    default:
      return state;
  }
};

const translateCoordinates = (coordinates: GeolocationApiType): GeolocationType => ({
  latitude: coordinates.latitude,
  longitude: coordinates.longitude,
  accuracy: coordinates.accuracy,
  altitude: coordinates.altitude,
})
