import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import sagas from './saga';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

export const history = createHistory()
const router = routerMiddleware(history)

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, router];

const enhancers = [
  applyMiddleware(...middlewares),
  autoRehydrate(),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, undefined, composeEnhancers(...enhancers));

sagaMiddleware.run(sagas);

export const createMyloStore = callback => persistStore(store, {storage: localForage}, () => callback(store));
