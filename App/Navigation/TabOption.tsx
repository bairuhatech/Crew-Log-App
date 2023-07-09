import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export const TabIcons = (route: any, focused: any, color: any, size: any) => {
  let iconName: string = '';
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Report') {
    iconName = focused ? 'documents' : 'documents-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person-circle' : 'person-circle-outline';
  } else if (route.name === 'More') {
    iconName = focused ? 'apps' : 'apps-outline';
  }
  return <Ionicons name={iconName} color={color} style={styles.TabIcons} />;
};

export const HeaderStyle = (title: any) => {
  return {
    headerStyle: styles.headerBackround,
    headerTitleStyle: styles.headerTitletxt,
    headerShadowVisible: false,
    headerTitleAlign: 'left',
    title: title,
  };
};
