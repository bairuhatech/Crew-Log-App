import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import COLOR from '../../Config/API';

export default function SettingScreen() {
  return (
    <View>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <Text>SettingScreen</Text>
    </View>
  );
}
