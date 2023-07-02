import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import COLOR from '../../config/color';

const Loader = (props: any) => {
  return (
    <View>
      <ActivityIndicator
        size={props.size ? props.size : 'small'}
        color={props.color ? props.color : COLOR.primary}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
