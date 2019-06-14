import React from 'react';

import Root from './components/Root';

import store from './redux';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Root/>
    </Provider>
  );
}

export default App;
