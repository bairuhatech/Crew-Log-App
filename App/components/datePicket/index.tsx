import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../config/color';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FONT from '../../config/font';
import Feather from 'react-native-vector-icons/Feather';

const DatePick = (props: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    props.onChange(date);
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <>
      <Text
        style={{
          color: COLOR.grey2,
          fontFamily: FONT.semibold,
          fontSize: 13,
          paddingLeft: 5,
          paddingBottom: 2,
        }}>
        {props.head}
      </Text>
      <TouchableOpacity
        onPress={showDatePicker}
        style={{
          // backgroundColor: COLOR.primary,
          borderWidth: 1.5,
          borderColor: COLOR.grey7,
          height: 45,
          width: '100%',
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 20,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: COLOR.grey2,
            fontFamily: FONT.semibold,
            fontSize: 13,
            paddingLeft: 5,
            paddingBottom: 2,
          }}>
          {props.value}
        </Text>
        <Feather name="calendar" color={COLOR.grey1} size={20} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={props.time ? 'time' : 'date'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DatePick;

const styles = StyleSheet.create({});
