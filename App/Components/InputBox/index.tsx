import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import COLOR from '../../Config/COLOR';
import Fonts from '../../Config/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function InputBox(props: any) {
  const [viewPass, setviewPass] = useState(true);
  return (
    <View style={styles.mainBox}>
      <Text style={styles.label}>
        {props.label}{' '}
        {props.error ? (
          <Text style={styles.error}>( {props.error} )</Text>
        ) : null}
      </Text>
      <View style={styles.container}>
        {props.sufix ? props.sufix : null}
        <TextInput
          value={props.value}
          placeholderTextColor={COLOR.grey2}
          placeholder={props.placeHolder}
          style={styles.Input}
          keyboardType={props ? props.keyboardType : 'default'}
          onChangeText={(val: any) => props.onChange(val)}
          numberOfLines={props ? props.numberOfLines : 1}
          multiline={props && props.numberOfLines > 1 ? true : false}
          maxLength={props ? props.maxLength : 10000}
          secureTextEntry={props ? props.secureTextEntry && viewPass : false}
        />
        {props.secureTextEntry ? (
          <TouchableOpacity onPress={() => setviewPass(!viewPass)}>
            <Ionicons
              name={viewPass ? 'eye' : 'eye-off'}
              size={24}
              color={COLOR.grey1}
            />
          </TouchableOpacity>
        ) : (
          props.prefix
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainBox: {
    backgroundColor: COLOR.White,
    borderColor: COLOR.grey,
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
  },
  label: {
    fontFamily: Fonts.semibold,
    fontSize: 13,
    color: COLOR.grey1,
    marginBottom: 0,
    marginHorizontal: 15,
    marginTop: 10,
    textTransform: 'capitalize',
  },
  Input: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 14,
    padding: Platform.OS === 'ios' ? 12 : 7,
    color: '#000',
  },
  error: {
    fontSize: 11,
    marginLeft: 10,
    fontFamily: Fonts.medium,
    color: 'red',
  },
});
