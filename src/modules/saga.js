// @flow

import { fork } from 'redux-saga/effects';
import { watchAddFavoriteSaga } from './favorites';
import { watchRefreshGeolocationSaga } from './geolocation';

export default function* rootSaga(): SagaType {
  yield fork(watchAddFavoriteSaga);
  yield fork(watchRefreshGeolocationSaga);
}
