import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import COLOR from '../../config/color';

const PageLoader = (props: any) => {
  return (
    <View
      style={{
        backgroundColor: COLOR.white,
        padding: 7,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <ActivityIndicator size="large" color={COLOR.primary} />
    </View>
  );
};

export default PageLoader;

const styles = StyleSheet.create({});
