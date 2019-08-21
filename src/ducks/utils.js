import {OrderedMap, Map} from 'immutable';

export function generateId() {
  return Date.now();
}

/**
 *
 * @param {Object} data {uid: {...someData}}
 * @param {Immutable.Record} RecordModel
 * @returns {Immutable.OrderedMap<any, any>}
 */
export function fireBaseDataToEntities(data, RecordModel = Map) {
  return new OrderedMap(data).mapEntries(([uid, value]) => {
    return [uid, new RecordModel(value).set('uid', uid)];
  })
}
