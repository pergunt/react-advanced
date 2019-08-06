import firebase from 'firebase';
import {
  take,
  call,
  put,
  cps,
} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import {
  signInSaga,
  signUpSaga,
  watchStatusChange,
  signOutSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './auth';

it('should sign up ', () => {
  const auth = firebase.auth();
  const action = {
    type: SIGN_UP_REQUEST,
    payload: {
      email: 'test@exmaple.com',
      password: 123456789
    }
  };
  const saga = signUpSaga(action);
  expect(
    saga.next().value
  ).toEqual(
    take(SIGN_UP_REQUEST)
  );
  expect(
    saga.next(action).value
  ).toEqual(
    call(
      [auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password
    )
  );
  const user = {
    email: '123@gmail.com',
    password: '123456789'
  };
  expect(
    saga.next(user).value
  ).toEqual(
    put({
      type: SIGN_UP_SUCCESS,
      payload: user
    })
  );
  const error = new Error('Failed to sign up');
  expect(
    saga.throw(error).value
  ).toEqual(
    put({
      type: SIGN_UP_ERROR,
      error
    })
  )
});
it('should sign in', () => {
  const auth = firebase.auth();
  const action = {
    type: SIGN_IN_REQUEST,
    payload: {
      email: '123@gmail.com',
      password: '123456789'
    }
  };
  const saga = signInSaga(action);
  expect(
    saga.next().value
  ).toEqual(
    take(SIGN_IN_REQUEST)
  );
  expect(
    saga.next(action).value
  ).toEqual(
    call(
      [auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password
    )
  );
  expect(
    saga.next(action.payload).value
  ).toEqual(
    put({
      type: SIGN_IN_SUCCESS,
      payload: action.payload
    })
  )
});
it('should watch for the sataus of the logged in user', () => {
  const auth = firebase.auth();
  const saga = watchStatusChange();
  expect(
    saga.next().value
  ).toEqual(
    cps([auth, auth.onAuthStateChanged])
  );
  const user = {
    email: '123@gmail.com',
    password: '123456789'
  };
  expect(
    saga.throw(user).value
  ).toEqual(
    put({
      type: SIGN_IN_SUCCESS,
      payload: user
    })
  )
});
it('should sign out', () => {
  const auth = firebase.auth();
  const saga = signOutSaga();
  expect(
    saga.next().value
  ).toEqual(
    call([auth, auth.signOut])
  );
  expect(
    saga.next().value
  ).toEqual(
    put({
      type: SIGN_OUT_SUCCESS
    })
  );
  expect(
    saga.next().value
  ).toEqual(
    put(
      push('/auth/signin')
    )
  );
});
