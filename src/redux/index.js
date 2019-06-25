import {createStore, applyMiddleware, compose} from 'redux';
import createRootReducer from './reducer';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import saga from './saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)
  )
);
window.store = store;

sagaMiddleware.run(saga);

export default store;

