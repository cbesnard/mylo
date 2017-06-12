// @flow

import { fork } from 'redux-saga/effects';
import { watchGeolocationSaga } from './geolocation';
import { watchAddFavoriteSaga } from './favorites';

export default function* rootSaga(): SagaType {
  yield fork(watchGeolocationSaga);
  yield fork(watchAddFavoriteSaga);
}
