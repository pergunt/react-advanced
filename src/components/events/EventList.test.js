import React from 'react';

import {
  shallow,
  mount
} from 'enzyme';

import events from '../../mocks/conferences';

import EventsPage from '../routes/EventsPage';
import TebleEventList from '../events/EventList';
import Loader from '../common/Loader';

import {Provider} from 'react-redux';
import store from '../../redux';

import {EventRecord} from '../../ducks/events';

const testEvents = events.map( event =>
  new EventRecord({...event, uid: Math.random().toString()})
);

/**
 * @param {React.Component} component
 * @returns {*}
 */
const testWrapper = (component) => (
  <Provider store={store}>
    {component}
  </Provider>
);

it('should render a loader', () => {
  const container = shallow(
    testWrapper(<EventsPage />)
  );

  expect(container.contains(<Loader />))
});

it('should render events', () => {
  const container = shallow(
    <TebleEventList events={testEvents} />
  );
  const rows = container.find('.test-event-list__row');

  expect(rows.length).toEqual(testEvents.length);
});

it('should request fetch data', async (done) => {
  mount(<TebleEventList events={[]} fetchAll={done} />);
});

it('should select event', (done) => {
  let selected = null;
  const selectEvent = uid => selected = uid;

  const container = mount(
    <TebleEventList
      events={testEvents}
      fetchAll={done}
      selectEvent={selectEvent}
    />
  );
  container
    .find('.test-event-list__row')
    .first()
    .simulate('click');

  expect(selected).toEqual(testEvents[0].uid)
});
