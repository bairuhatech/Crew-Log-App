import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TabIcons} from './TabOption';
import SettingsIcon from './SettingsIcon';
import COLOR from '../Config/COLOR';
import styles from './styles';

import SplashScreen from '../UserScreens/SplashScreen';
import LoginScreen from '../UserScreens/LoginScreen';
import HomeScreen from '../UserScreens/HomeScreen';
import LogScreen from '../UserScreens/LogScreen';
import ProfileScreen from '../UserScreens/ProfileScreen';
import SettingScreen from '../UserScreens/SettingScreen';
import AdminScreen from '../AdminScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function HomeTabs() {
  const Auth = useSelector((state: any) => state.Auth);
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return TabIcons(route, focused, color, size);
        },
        tabBarActiveTintColor: COLOR.primary,
        tabBarInactiveTintColor: COLOR.black,
        tabBarLabelStyle: styles.TabLabel,
        tabBarStyle: styles.TabStyle,
        headerTitleStyle: styles.TabTitle,
        headerRight: () => <SettingsIcon />,
      })}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Logs" component={LogScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
      {Auth.admin ? <Tabs.Screen name="More" component={AdminScreen} /> : null}
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
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen
        name="HomeStack"
        component={HomeTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
