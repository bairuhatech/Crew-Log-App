import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import COLOR from '../../Config/COLOR';

export default function LogScreen() {
  return (
    <View>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <Text>LogScreen</Text>
    </View>
  );
}
