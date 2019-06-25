import {appName} from '../config';

import {Record, List} from 'immutable';
import {
  put,
  call,
  takeEvery
} from 'redux-saga/effects';
import {generateId} from './utils';

const ReducerRecord = Record({
  entities: new List([])
});
const PersonRecord = Record({
  firstName: null,
  lastName: null,
  email: null,
  id: null
});

export const moduleName = 'people';
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`;
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;

export default (state = new ReducerRecord(), action) => {
  const {
    type,
    payload = {},
  } = action;

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', entities => entities.push(new PersonRecord(payload)));
    default:
      return state;
  }
}

/**
 * @param {Object} person
 * @returns {{type: string, payload: *}}
 */
export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  };
}
export function * addPersonSaga(action) {
  const id = yield call(generateId);

  yield put({
    type: ADD_PERSON,
    payload: {
      ...action.payload, id
    }
  });
}
export const saga = function * () {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
};
