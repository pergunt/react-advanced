import {createStore, applyMiddleware, compose} from 'redux';
import createRootReducer from './reducer';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

const store = initialState => {
  return createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history), thunk, logger)
    )
  );
};

export default store();

