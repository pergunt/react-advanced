import {saga as peopleSaga} from '../ducks/people';
import {saga as authSaga} from '../ducks/auth';
import {all} from 'redux-saga/effects';

/**
 * @returns {IterableIterator<AllEffect<IterableIterator<*>> | AllEffect<any>>}
 */
export default function * () {
  yield all([
    peopleSaga(),
    authSaga()
  ])
}
