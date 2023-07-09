import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import COLOR from '../../Config/COLOR';
import styles from '../styles';

const CreateUser = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />

      <Text>CreateUser</Text>
    </View>
  );
};

export default CreateUser;
