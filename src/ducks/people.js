import {appName} from '../config';

import {
  Record,
  List,
  OrderedMap
} from 'immutable';
import {
  put,
  call,
  take,
  all,
  takeEvery
} from 'redux-saga/effects';

import {generateId} from './utils';

import firebase from 'firebase';
import {fireBaseDataToEntities} from './utils';
import {createSelector} from 'reselect';

const ReducerRecord = Record({
  entities: new List([]),
  people: new OrderedMap({})
});
const PersonRecord = Record({
  firstName: null,
  lastName: null,
  email: null,
  uid: null
});

export const moduleName = 'people';
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`;
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;
export const FETCH_PEOPLE_REQUEST = `${appName}/${moduleName}/FETCH_PEOPLE_REQUEST`;
export const FETCH_PEOPLE_SUCCESS = `${appName}/${moduleName}/FETCH_PEOPLE_SUCCESS`;

export default (state = new ReducerRecord(), action) => {
  const {
    type,
    payload = {},
  } = action;

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', entities => entities.push(new PersonRecord(payload)));
    case FETCH_PEOPLE_SUCCESS:
      return state.set('people', fireBaseDataToEntities(payload, PersonRecord));
    default:
      return state;
  }
}

/**
 * Selectors
 */
export const stateSelector = state => state[moduleName];
export const peopleSelector = createSelector(stateSelector, state => state.people);
export const peopleListSelector = createSelector(peopleSelector, people => {
  return people.valueSeq().toArray();
});

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

/**
 * @returns {{type: string, payload: *}}
 */
export function fetchPeople() {
  return {
    type: FETCH_PEOPLE_REQUEST,
  };
}

export function * fetchPeopleSaga() {
  while (true) {
    yield take(FETCH_PEOPLE_REQUEST);

    try {
      const ref = firebase.database().ref('/people');
      const data = yield call([ref, ref.once], 'value');

      yield put({
        type: FETCH_PEOPLE_SUCCESS,
        payload: data.val()
      })
    } catch (e) {
      alert(e.message);
    }
  }
}

export function * addPersonSaga(action) {
  const uid = yield call(generateId);

  const ref = firebase.database().ref('/people/' + uid);

  try {
    yield call([ref, ref.set], action.payload)
  } catch (e) {
    alert(e.message);
  }

  yield put({
    type: ADD_PERSON,
    payload: {
      ...action.payload, uid
    }
  });
}
export const saga = function * () {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    fetchPeopleSaga()
  ])
};
