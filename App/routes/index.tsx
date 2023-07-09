import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import COLOR from '../config/color';
import styles from './styles';
import SplashScreen from '../screens/splashScreen';
import HomeScreen from '../screens/homeScreen';
import ReportScreen from '../screens/reportScreen';
import ProfileScreen from '../screens/profileScreen';
import LoginScreen from '../screens/loginScreen';
import Admin from '../screens/adminActions';
import AllUsers from '../screens/adminActions/allUsers';

import {View} from 'react-native';
import FONT from '../config/font';
import Feather from 'react-native-vector-icons/Feather';
import SettingsScreen from '../screens/settingsScreen';
import {useSelector} from 'react-redux';
import AddUser from '../screens/adminActions/addUser';
import Location from '../screens/adminActions/location';
import AddLocation from '../screens/adminActions/addLocation';
import UserLogs from '../screens/adminActions/userLogs';
import ViewUserLogs from '../screens/adminActions/viewUserLogs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ResetPassword from '../screens/loginScreen/resetPassword';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs(props: any) {
  const Auth = useSelector((state: any) => state.Auth.user);
  const [tabChange, setTabChange] = useState(false);

  const handleTabPress = () => {
    // Function to be called when tab is pressed
    console.log('Tab pressed!');
  };

  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        tabBarOnPress: handleTabPress,
        tabBarStyle: styles.tabBarStyle,
        tabBarOptions: {
          style: styles.tabBarOptions,
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIcon: (props: any) => {
          let Icons: any;
          let Color: any;
          if (route.name === 'Home') {
            Icons = props.focused ? 'home' : 'home-outline';
            Color = props.focused ? COLOR.grey10 : COLOR.grey10;
          } else if (route.name === 'Report') {
            Icons = props.focused ? 'document' : 'document-outline';
            Color = props.focused ? COLOR.grey10 : COLOR.grey10;
          } else if (route.name === 'Profile') {
            Icons = props.focused ? 'person' : 'person-outline';
            Color = props.focused ? COLOR.grey10 : COLOR.grey10;
          } else if (route.name === 'Admin') {
            Icons = props.focused ? 'grid' : 'grid-outline';
            Color = props.focused ? COLOR.grey10 : COLOR.grey10;
          }
          return (
            <View>
              {route.name === 'Home' ? (
                <Ionicons name={Icons} size={22} color={Color} />
              ) : route.name === 'Report' ? (
                <Ionicons name={Icons} size={22} color={Color} />
              ) : route.name === 'Profile' ? (
                <Ionicons name={Icons} size={22} color={Color} />
              ) : route.name === 'Admin' ? (
                <Ionicons name={Icons} size={22} color={Color} />
              ) : null}
            </View>
          );
        },
        tabBarActiveTintColor: '#d3d3d3',
        tabBarInactiveTintColor: '#878f86',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: 'Report',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
      {Auth.role === 1 ? (
        <Tab.Screen
          name="Admin"
          component={Admin}
          options={{
            title: 'Admin',
            headerStyle: styles.screenHeader,
            headerTitleStyle: styles.screenHeaderTxt,
          }}
        />
      ) : null}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
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
        name="homeScreen"
        component={HomeTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="loginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="allUsers"
        component={AllUsers}
        options={{
          title: 'All Users',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
      <Stack.Screen
        name="addUser"
        component={AddUser}
        options={{
          title: 'Add User',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
      <Stack.Screen
        name="settingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
      <Stack.Screen
        name="location"
        component={Location}
        options={{
          title: 'Location',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
      <Stack.Screen
        name="addLocation"
        component={AddLocation}
        options={{
          title: 'Add Location',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
      <Stack.Screen
        name="userLogs"
        component={UserLogs}
        options={{
          title: 'Select User',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
      <Stack.Screen
        name="viewUserLogs"
        component={ViewUserLogs}
        options={{
          title: 'Logs',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{
          title: 'Reset Password',
          headerStyle: styles.screenHeader,
          headerTitleStyle: styles.screenHeaderTxt,
        }}
      />
    </Stack.Navigator>
  );
}
