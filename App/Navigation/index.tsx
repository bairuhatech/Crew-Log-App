import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from '../UserScreens/SplashScreen';
import LoginScreen from '../UserScreens/LoginScreen';
import HomeScreen from '../UserScreens/HomeScreen';
import LogScreen from '../UserScreens/LogScreen';
import ProfileScreen from '../UserScreens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tabs.Navigator initialRouteName="HomeTabs">
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="" component={LogScreen} />
      <Tabs.Screen name="Notifications" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="splashscreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="loginscreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
