import React, {useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import COLOR from '../../Config/COLOR';
import Fonts from '../../Config/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PageLoader(props: any) {
  return (
    <View style={styles.mainBox}>
      <ActivityIndicator color={COLOR.primary} size={'large'} />
      <Text style={styles.txt1}>Please wait . . . </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    color: COLOR.grey1,
    fontSize: 14,
    marginTop: 20,
    fontFamily: Fonts.medium,
  },
});
