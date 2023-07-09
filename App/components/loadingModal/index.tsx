import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Loader from '../loader';
import FONT from '../../config/font';
import COLOR from '../../config/color';

const LoadingModal = (props: any) => {
  return (
    <View>
      <Modal
        isVisible={props.visible}
        style={{justifyContent: 'flex-end', margin: 5}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 70,
            justifyContent: 'center',
            borderRadius: 7,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <Loader size="large" />
            <Text
              style={{
                fontFamily: FONT.semibold,
                fontSize: 15,
                marginLeft: 20,
                color: COLOR.black,
              }}>
              {props.text}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({});
