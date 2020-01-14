import {appName} from '../config';

import {
  Record,
  List,
} from 'immutable';
import {
  put,
  take,
  call,
  fork,
  spawn,
  all,
  takeEvery,
  select,
  delay,
  cancel,
  cancelled,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga'

import {generateId} from './utils';

import firebase from 'firebase';
import {fireBaseDataToEntities} from './utils';
import {createSelector} from 'reselect';

const ReducerRecord = Record({
  entities: new List([]),
  loading: false
});
const PersonRecord = Record({
  firstName: null,
  lastName: null,
  email: null,
  uid: null,
  events: []
});

export const moduleName = 'people';
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${appName}/${moduleName}/ADD_PERSON_SUCCESS`;
export const FETCH_PEOPLE_REQUEST = `${appName}/${moduleName}/FETCH_PEOPLE_REQUEST`;
export const FETCH_PEOPLE_SUCCESS = `${appName}/${moduleName}/FETCH_PEOPLE_SUCCESS`;
export const ADD_EVENT_REQUEST = `${appName}/${moduleName}/ADD_EVENT_REQUEST`;
export const ADD_EVENT_SUCCESS = `${appName}/${moduleName}/ADD_EVENT_SUCCESS`;

export default (state = new ReducerRecord(), action) => {
  const {
    type,
    payload = {},
  } = action;

  switch (type) {
    case ADD_EVENT_SUCCESS:
      return state
        .setIn(['entities', payload.personUid, 'events'], payload.events);

    case ADD_PERSON_REQUEST:
      return state.set('loading', true);

    case ADD_PERSON_SUCCESS:
      const person = new PersonRecord(payload);
      return state
        .setIn(['entities', person.uid], person)
        .set('loading', false);

    case FETCH_PEOPLE_SUCCESS:
      return state.set('entities', fireBaseDataToEntities(payload, PersonRecord));
    default:
      return state;
  }
}

/**
 * Selectors
 */
export const stateSelector = state => state[moduleName];
export const peopleSelector = createSelector(stateSelector, state => state.entities);
export const idSelector = (_, props) => props.personUid;
export const peopleListSelector = createSelector(peopleSelector, entities => {
  return entities.valueSeq().toArray();
});
export const personSelector = createSelector(peopleSelector, idSelector, (entities, id) => {
  return entities.get(id);
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
  try {
    const ref = firebase.database().ref('/people');
    const data = yield call([ref, ref.once], 'value');

    yield put({
      type: FETCH_PEOPLE_SUCCESS,
      payload: data.val()
    });
  } catch (e) {
    alert(e.message);
  }
}

export function addEventPerson(eventUid, personUid) {
  return {
    type: ADD_EVENT_REQUEST,
    payload: {eventUid, personUid}
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
  const person = {
    ...action.payload, uid
  };
  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: person
  });

}

export function * addEventSaga(action) {
  const {eventUid, personUid} = action.payload;
  const eventsRef = firebase.database().ref(`people/${personUid}/events`);

  const state = yield select(stateSelector);
  const events =  state.getIn(['entities', personUid, 'events']).concat(eventUid);
  try {
    yield call ([eventsRef, eventsRef.set], events);
    yield put({
      type: ADD_EVENT_SUCCESS,
      payload: {
        personUid,
        events
      }
    })
  } catch (e) {
    alert(e.message);
  }
}

export function * backgroundSyncSaga() {
  try {
    while (true) {
      yield call(fetchPeopleSaga);
      yield delay(2000);
    }
  } finally {
    if (yield cancelled()) {
      console.log('-----', 'cancelled saga')
    }
  }
}

export function * cancellableSync() {
  const task = yield fork(backgroundSyncSaga);
  yield delay(3000);
  yield cancel(task);
}

const createPeopleSocket = () => eventChannel(emit => {
  const ref = firebase.database().ref('people');
  const cb = (data) => emit({data});
  ref.on('value', cb);
  return () => ref.off('value', cb);
});

export function * realtimeSync() {
  const channel = yield call(createPeopleSocket);
  while(true) {
    const {data} = yield take(channel);
    yield put({
      type: FETCH_PEOPLE_SUCCESS,
      payload: data.val()
    });
    console.log(data.val())
  }
}

export const saga = function * () {
  // run the saga in background (effect fork) - attached to the root saga
  // effect "spawn" is like "fork" but detached to the root saga so if there an error occurs - the app will continue to work
  yield spawn(realtimeSync);

  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(ADD_EVENT_REQUEST, addEventSaga),
    takeEvery(FETCH_PEOPLE_REQUEST, fetchPeopleSaga),
  ])
};
