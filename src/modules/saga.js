// @flow

import { fork } from 'redux-saga/effects';
import { watchAddFavoriteSaga } from './favorites';

export default function* rootSaga(): SagaType {
  yield fork(watchAddFavoriteSaga);
}
