import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../config/color';
import FONT from '../../config/font';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Textinput = (props: any) => {
  const [inputText, setInputText] = useState('');
  const [show, setShow] = useState(true);
  return (
    <View style={styles.TextInput}>
      <Text style={styles.InputLabel}>{props.head}</Text>
      <View
        style={[
          styles.InputItem,
          {borderColor: props.error ? COLOR.warning : COLOR.grey8},
        ]}>
        <TextInput
          style={styles.Input}
          secureTextEntry={props.password && show}
          keyboardType={props.keyboard ? props.keyboard : 'default'}
          // keyboardType='email-address'
          // keyboardType='number-pad'
          defaultValue={props.value}
          onChangeText={(text: any) => {
            props.onChange(text);
            setInputText(text);
          }}
        />
        {props.password ? (
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Ionicons
              name={!show ? 'eye-off' : 'eye'}
              color={COLOR.grey3}
              size={20}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {props.error ? (
        <Text
          style={{
            color: COLOR.warning,
            fontFamily: FONT.semibold,
            fontSize: 12,
            paddingLeft: 3,
          }}>
          {props.head} required
        </Text>
      ) : null}
    </View>
  );
};

export default Textinput;

const styles = StyleSheet.create({
  TextInput: {
    marginBottom: 20,
  },
  InputLabel: {
    color: COLOR.grey2,
    fontFamily: FONT.semibold,
    fontSize: 13,
    paddingLeft: 3,
  },
  InputItem: {
    borderWidth: 1.5,
    borderRadius: 7,
    height: 45,
    // borderColor:,
    paddingLeft: 5,
    paddingRight: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Input: {
    height: '100%',
    flex: 1,
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
  },
});
