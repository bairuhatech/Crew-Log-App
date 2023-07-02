import {TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import COLOR from '../../config/color';
import {useNavigation} from '@react-navigation/core';
import FONT from '../../config/font';

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, padding: 10}}>
      <Text style={{color: '#000'}}>Settings Screen</Text>
      <View style={{flex: 1}}></View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: COLOR.primary,
            height: 45,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLOR.grey10,
              fontFamily: FONT.semibold,
              fontSize: 15,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
