import {appName} from '../config';
import firebase from 'firebase';
import {Record} from 'immutable';
import {
  all,
  take,
  call,
  put,
  cps,
  takeEvery,
  spawn
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {push} from 'connected-react-router';

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
});

export const moduleName = 'auth';

export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;

export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;

export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;

export default (state = new ReducerRecord(), action) => {
  const {
    type,
    payload = {},
    error
  } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
      return state.set('loading', true);
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('user', payload)
        .set('error', null);
    case SIGN_UP_ERROR:
      return state
        .set('loading', false)
        .set('error', error);

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();
    default:
      return state;
  }
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {{type: string, payload: {email: *, password: *}}}
 */
export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: {email, password}
  };
}
/**
 * @param {string} email
 * @param {string} password
 * @returns {{type: string, payload: {email: *, password: *}}}
 */
export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: {email, password}
  };
}

/**
 * @returns {{type: string}}
 */
export function signOut() {
  return {
    type: SIGN_OUT_REQUEST
  }
}
/**
 * @returns {IterableIterator<TakeEffect | ChannelTakeEffect<any>>}
 */
export function * signUpSaga() {
  const auth = firebase.auth();

  while (true) {
    const {payload} = yield take(SIGN_UP_REQUEST);
    try {
      const user = yield call(
        [auth, auth.createUserWithEmailAndPassword], payload.email, payload.password
      );
      yield put({
        type: SIGN_UP_SUCCESS,
        payload: user
      });
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        error
      })
    }
  }
}

export function * signInSaga() {
  const auth = firebase.auth();

  while (true) {
    const {payload} = yield take(SIGN_IN_REQUEST);

    try {
      const user = yield call(
        [auth, auth.signInWithEmailAndPassword], payload.email, payload.password
      );
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: user
      })
    } catch (e) {
      alert(e.message)
    }
  }
}

const createAuthChannel = () => eventChannel( emit => {
  return firebase.auth().onAuthStateChanged(user => {
    emit({user})
  });
});


export function * watchStatusChangeSaga() {
  const channel = yield call(createAuthChannel);
  while (true) {
    const {user} = yield take(channel);
    if (user) {
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: user
      });
    } else {
      yield put({
        type: SIGN_OUT_SUCCESS,
        payload: user
      });
      yield put(push('/auth/signin'));
    }
  }

}
export function * signOutSaga() {
  const auth = firebase.auth();

  try {
    yield call([auth, auth.signOut]);
    yield put({
      type: SIGN_OUT_SUCCESS
    });
    yield put(
      push('/auth/signin')
    );
  } catch (e) {
    alert(e.message)
  }
}
/**
 * @returns {IterableIterator<AllEffect<any>>}
 */
export function * saga() {

  yield all([
    watchStatusChangeSaga(),
    signUpSaga(),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga),
    signInSaga()
  ]);
}
