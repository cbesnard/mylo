// @flow

import { fork } from 'redux-saga/effects';
import { watchGeolocationSaga } from './geolocation';

export default function* rootSaga(): SagaType {
  yield fork(watchGeolocationSaga);
}
