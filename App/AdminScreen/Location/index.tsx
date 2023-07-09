import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import COLOR from '../../Config/COLOR';
import styles from './styles';

const Location = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />

      <Text>Location</Text>
    </View>
  );
};

export default Location;
