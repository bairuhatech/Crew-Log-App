import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import COLOR from '../../Config/COLOR';

export default function HomeScreen() {
  return (
    <View>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <Text>HomeScreen</Text>
    </View>
  );
}
