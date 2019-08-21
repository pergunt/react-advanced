import {appName} from '../config';

import {
  Record,
  OrderedMap
} from 'immutable';

import {
  all,
  take,
  put,
  call
} from 'redux-saga/effects';

import firebase from 'firebase';

const ReducerRecord = Record({
  entities: new OrderedMap({}),
  loading: false,
});

export const moduleName = 'events';

export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`;

export default (state = new ReducerRecord(), action) => {
  const {
    type,
    payload,
  } = action;

  switch (type) {
    case FETCH_ALL_REQUEST:
      return state.set('loading', true);
    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('entities', new OrderedMap(payload));
    default:
      return state;
  }
}

/**
 * @returns {{type: string}}
 */
export function fetchAll() {
  return {
    type: FETCH_ALL_REQUEST
  };
}

/**
 * @returns {IterableIterator<*>}
 */
export function * fetchAllSaga() {
  while (true) {
    yield take(FETCH_ALL_REQUEST);

    const ref = firebase.database().ref('/events');
    const data = yield call([ref, ref.once], 'value');

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    });
  }
}

/**
 * @returns {IterableIterator<AllEffect<any>>}
 */
export function * saga() {
  yield all([
    fetchAllSaga()
  ]);
}
