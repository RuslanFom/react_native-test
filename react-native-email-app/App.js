import React from 'react';
import {Provider} from 'react-redux';
import NavigationApp from './src/navigation/MainNavigation';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationApp />
    </Provider>
  );
};

export default App;
