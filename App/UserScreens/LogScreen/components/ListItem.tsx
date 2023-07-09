import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import COLOR from '../../../Config/COLOR';
import styles from '../styles';

export default function ListItem(props: any) {
  return (
    <View>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <Text style={styles.txt1}>ListItem</Text>
    </View>
  );
}
