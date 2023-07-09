import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import COLOR from '../../Config/API';

export default function ProfileScreen() {
  return (
    <View>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <Text>ProfileScreen</Text>
    </View>
  );
}
