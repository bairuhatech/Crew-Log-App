import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLOR from '../../../config/color';
import FONT from '../../../config/font';
import moment from 'moment';

const UserItemLog = (props: any) => {
  return (
    <View style={styles.UserItem}>
      <View style={styles.UserItemCol2}>
        <View style={styles.UserItemTextItem}>
          <Text style={styles.UserItemTextItemTxt1}>Name</Text>
          <Text style={styles.UserItemTextItemTxt2}>:</Text>
          <Text style={styles.UserItemTextItemTxt3}>
            {props.data.first_name + ' ' + props.data.last_name}
          </Text>
        </View>

        <View style={styles.UserItemTextItem}>
          <Text style={styles.UserItemTextItemTxt1}>Emp Id</Text>
          <Text style={styles.UserItemTextItemTxt2}>:</Text>
          <Text style={styles.UserItemTextItemTxt3}>{props.data.emp_id}</Text>
        </View>

        <View style={styles.UserItemTextItem}>
          <Text style={styles.UserItemTextItemTxt1}>Phone</Text>
          <Text style={styles.UserItemTextItemTxt2}>:</Text>
          <Text style={styles.UserItemTextItemTxt3}>{props.data.phone}</Text>
        </View>

        <View style={styles.UserItemTextItem}>
          <Text style={styles.UserItemTextItemTxt1}>Log In</Text>
          <Text style={styles.UserItemTextItemTxt2}>:</Text>
          <Text style={styles.UserItemTextItemTxt3}>
            {moment(props.data.login_time).format('h:mm:ss A')}
          </Text>
        </View>

        <View style={styles.UserItemTextItem}>
          <Text style={styles.UserItemTextItemTxt1}>Log Out</Text>
          <Text style={styles.UserItemTextItemTxt2}>:</Text>
          <Text style={styles.UserItemTextItemTxt3}>
            {moment(props.data.logout_time).format('h:mm:ss A')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserItemLog;

const styles = StyleSheet.create({
  UserItem: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: COLOR.grey8,
    borderWidth: 1.5,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  Avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  UserItemCol1: {},

  UserItemCol2: {
    // backgroundColor: 'red',
    marginLeft: 30,
  },

  UserItemTxt1: {
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    textTransform: 'capitalize',
  },

  UserItemTextItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 2,
  },

  UserItemTextItemTxt1: {
    width: '25%',
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
    width: '70%',
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    textTransform: 'capitalize',
  },
});
