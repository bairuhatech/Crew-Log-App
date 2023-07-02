import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLOR from '../../config/color';
import FONT from '../../config/font';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const ConfirmModal = (props: any) => {
  return (
    <View>
      <Modal
        isVisible={props.visible}
        style={{justifyContent: 'flex-end', margin: 5}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 280,
            justifyContent: 'flex-end',
            borderRadius: 15,
          }}>
          <View style={{flex: 1, padding: 10}}>
            <View style={{alignItems: 'flex-end', marginBottom: 5}}>
              <TouchableOpacity onPress={() => props.close()}>
                <Ionicons name="close-circle" color={COLOR.warning} size={27} />
              </TouchableOpacity>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 30,
                }}>
                <Feather name="alert-circle" color={COLOR.alert} size={60} />
                <Text
                  style={{
                    color: COLOR.grey1,
                    marginTop: 25,
                    fontFamily: FONT.semibold,
                    fontSize: 15,
                  }}>
                  {props.text}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              padding: 5,
            }}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => props.close()}>
              <Text style={styles.secondaryBtnTxt}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onSelect()}
              style={styles.primaryBtn}>
              <Text style={styles.primaryBtnTxt}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: COLOR.primary,
    height: 50,
    width: '49%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnTxt: {
    color: COLOR.grey10,
    fontWeight: '600',
    fontSize: 15,
  },

  secondaryBtnTxt: {
    color: COLOR.primary,
    fontWeight: '600',
    fontSize: 17,
  },

  secondaryBtn: {
    backgroundColor: COLOR.white,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    height: 50,
    width: '49%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationMsgBox: {
    marginTop: 20,
    // backgroundColor: 'red',
    minHeight: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  locationMsg1: {
    color: COLOR.grey1,
    fontFamily: FONT.bold,
    fontSize: 20,
    marginRight: 10,
  },
  locationMsg2: {
    marginTop: 5,
    color: COLOR.grey7,
    fontFamily: FONT.medium,
    fontSize: 15,
    marginRight: 10,
  },
});
