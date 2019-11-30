import React from 'react';

import PeopleList from '../people/VirtualizedPersonList'
import EventList from '../events/VirtualizedEventList'
import SelectedEvents from '../events/SelectedEvents'

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <PeopleList />
      <SelectedEvents />
      <EventList />
    </div>
  );
};
export default AdminPage;
