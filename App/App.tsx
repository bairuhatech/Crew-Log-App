import React from 'react';
import {Store, PersistedStore} from './Redux/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './Navigation';
export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={PersistedStore}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
