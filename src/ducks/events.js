import {appName} from '../config';

import {createSelector} from 'reselect';
import {fireBaseDataToEntities} from './utils';

import {
  Record,
  OrderedMap,
  OrderedSet
} from 'immutable';

import {
  all,
  take,
  put,
  call,
  select
} from 'redux-saga/effects';

import firebase from 'firebase';

const ReducerRecord = Record({
  entities: new OrderedMap({}),
  selected: new OrderedSet([]),
  loading: false,
  loaded: false,
});

export const EventRecord = Record({
  uid: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null,
});

export const moduleName = 'events';

export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`;
export const SELECT_EVENT = `${appName}/${moduleName}/SELECT_EVENT`;
export const FETCH_LAZY_REQUEST = `${appName}/${moduleName}/FETCH_LAZY_REQUEST`;
export const FETCH_LAZY_SUCCESS = `${appName}/${moduleName}/FETCH_LAZY_SUCCESS`;
export const FETCH_LAZY_START = `${appName}/${moduleName}/FETCH_LAZY_START`;
export const DELETE_EVENT_REQUEST = `${appName}/${moduleName}/DELETE_EVENT_REQUEST`;
export const DELETE_EVENT_SUCCESS = `${appName}/${moduleName}/DELETE_EVENT_SUCCESS`;

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
        .set('entities', fireBaseDataToEntities(payload, EventRecord));
    case SELECT_EVENT:
      return state
        .update('selected', selected => selected[state.selected.contains(payload) ? 'remove' : 'add'](payload));

    case DELETE_EVENT_REQUEST:
      return state.set('loading', true);

    case DELETE_EVENT_SUCCESS:
      return state
        .deleteIn(['entities', payload])
        .deleteIn(['selected', payload])
        .set('loading', false);

    case FETCH_LAZY_START:
      return state.set('loading', true);
    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .mergeIn(['entities'], fireBaseDataToEntities(payload, EventRecord))
        .set('loaded', Object.keys(payload).length < 10);

    default:
      return state;
  }
}

/**
 * Selectors
 */
export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const eventListSelector = createSelector(entitiesSelector, entities => {
  return entities.valueSeq().toArray();
});
export const sectionSelector = createSelector(stateSelector, state => state.selected);
export const selectedEventsSelector = createSelector(entitiesSelector, sectionSelector, (entities, selection) => {
  return selection.toArray().map( id => entities.get(id));
});

/**
 * @returns {{type: string}}
 */
export function fetchAll() {
  return {
    type: FETCH_ALL_REQUEST
  };
}
export function fetchLazy() {
  return {
    type: FETCH_LAZY_REQUEST
  }
}
/**
 * @param {string} uid
 * @returns {{type: string, payload: *}}
 */
export function selectEvent(uid) {
  return {
    type: SELECT_EVENT,
    payload: uid
  }
}

export function deleteEvent(eventUid) {
  return {
    type: DELETE_EVENT_REQUEST,
    payload: eventUid
  };
}

export function * fetchLazySaga() {
  while (true) {
    yield take(FETCH_LAZY_REQUEST);

    const state = yield select(stateSelector);

    if (state.loading || state.loaded) continue;

    yield put({
      type: FETCH_LAZY_START
    });

    const lastEvent = state.entities.last();

    const ref = firebase.database().ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastEvent ? lastEvent.uid : '');

    const data = yield call([ref, ref.once], 'value');

    yield put({
      type: FETCH_LAZY_SUCCESS,
      payload: data.val()
    })
  }
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

export function * deleteEventSaga() {
  while (true) {
    const {payload} = yield take(DELETE_EVENT_REQUEST);
    const ref = firebase.database().ref(`/events/${payload}`);

    try {
      yield call([ref, ref.remove]);
      yield put({
        type: DELETE_EVENT_SUCCESS,
        payload
      })
    } catch (e) {
      alert(e.message);
    }
  }
}

/**
 * @returns {IterableIterator<AllEffect<any>>}
 */
export function * saga() {
  yield all([
    fetchAllSaga(),
    fetchLazySaga(),
    deleteEventSaga()
  ]);
}
