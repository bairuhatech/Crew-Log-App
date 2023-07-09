import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal/dist/modal';
import COLOR from '../../../config/color';
import FONT from '../../../config/font';

const NewUserModal = (props: any) => {
  return (
    <View>
      <Modal
        isVisible={props.visible}
        style={{justifyContent: 'flex-end', margin: 5}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 250,
            justifyContent: 'flex-end',
            borderRadius: 7,
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
                  width: '100%',
                  height: 180,
                  alignItems: 'center',
                  justifyContent: 'center',
                  //   backgroundColor: 'red',
                }}>
                <View style={styles.UserItemTextItem}>
                  <Text style={styles.UserItemTextItemTxt1}>Name</Text>
                  <Text style={styles.UserItemTextItemTxt2}>:</Text>
                  <Text style={styles.UserItemTextItemTxt3}>
                    {props.data?.first_name}
                  </Text>
                </View>
                <View style={styles.UserItemTextItem}>
                  <Text style={styles.UserItemTextItemTxt1}>Employee Id</Text>
                  <Text style={styles.UserItemTextItemTxt2}>:</Text>
                  <Text style={styles.UserItemTextItemTxt3}>
                    {props.data?.emp_id}
                  </Text>
                </View>
                {/* <View style={styles.UserItemTextItem}>
                  <Text style={styles.UserItemTextItemTxt1}>Password</Text>
                  <Text style={styles.UserItemTextItemTxt2}>:</Text>
                  <Text style={styles.UserItemTextItemTxt3}>
                    {props.data?.emp_id + '@user'}
                  </Text>
                </View> */}
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
            {/* <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => props.close()}>
              <Text style={styles.secondaryBtnTxt}>Close</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => props.onOkay()}
              style={styles.primaryBtn}>
              <Text style={styles.primaryBtnTxt}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewUserModal;

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: COLOR.primary,
    height: 45,
    width: '100%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnTxt: {
    color: COLOR.grey10,
    fontWeight: '600',
    fontSize: 17,
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
    height: 45,
    width: '49%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationMsgBox: {
    marginTop: 20,
    // backgroundColor: 'red',
    minHeight: 30,
    alignItems: 'center',
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

  UserItemTextItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },

  UserItemTextItemTxt1: {
    width: '30%',
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    textTransform: 'capitalize',
  },

  UserItemTextItemTxt2: {
    width: '5%',
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    textTransform: 'capitalize',
  },

  UserItemTextItemTxt3: {
    width: '65%',
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    textTransform: 'capitalize',
  },
});
