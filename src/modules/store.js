import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import firebase  from './firebase';
import rootReducer from './reducer';
import sagas from './saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhancers = [
  applyMiddleware(...middlewares),
  firebase,
  autoRehydrate(),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, undefined, composeEnhancers(...enhancers));

sagaMiddleware.run(sagas);

export default callback => persistStore(store, {storage: localForage}, () => callback(store));
