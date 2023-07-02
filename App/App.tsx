import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from './routes';
// import {Store, PersistedStore} from './redux/store';
// import {Store} from './redux/store';
// import {Store} from './redux/Store';
import {Store} from './redux/Store';
import {PersistedStores} from './redux/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import OfflineNotification from './components/offlineNotification';
import {ToastProvider} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import COLOR from './config/color';
import {useToast} from 'react-native-toast-notifications';

export default function App() {
  const toast = useToast();
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => Alert.alert('Error', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={PersistedStores}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <ToastProvider
              placement="bottom"
              duration={1500}
              animationType="slide-in"
              successColor="green"
              dangerColor="red"
              warningColor="orange"
              animationDuration={250}
              offsetBottom={100}
              successIcon={
                <Ionicons name="checkmark-circle" color={'#fff'} size={17} />
              }
              dangerIcon={
                <Ionicons name="close-circle" color={'#fff'} size={17} />
              }
              warningIcon={
                <Ionicons name="alert-circle" color={'#fff'} size={17} />
              }>
              <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
                <Routes />
              </View>
            </ToastProvider>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
      <OfflineNotification />
    </Provider>
  );
}
