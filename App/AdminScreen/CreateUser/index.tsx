import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../Config/COLOR';
import InputBox from '../../Components/InputBox';
import FONT from '../../Config/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../Config/API';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';

const CreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('1');
  const [designation, setDesignation] = useState('');
  const [active, setActive] = useState(true);
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    let api = API.BASE_URL + API.CREATE_USER;
    let reqObj = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      password: password,
      login_time: moment().format(),
      logout_time: moment().format(),
      status: status,
      designation: designation,
      active: active,
      role: isAdmin ? 1 : 0,
      join_date: moment().format(),
      login_status: 1,
    };
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqObj),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.CreateUserForm}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <InputBox
            label="First name"
            value={firstName}
            onChange={(text: any) => setFirstName(text)}
            error=""
          />
          <InputBox
            label="Last name"
            keyboard=""
            value={lastName}
            onChange={(text: any) => setLastName(text)}
            error=""
          />

          <InputBox
            label="Email"
            value={email}
            keyboard="email-address"
            onChange={(text: any) => setEmail(text)}
            error=""
          />

          <InputBox
            label="Phone"
            value={phone}
            keyboard="number-pad"
            onChange={(text: any) => setPhone(text)}
            error=""
          />

          <TouchableOpacity
            onPress={() => setIsAdmin(!isAdmin)}
            style={{
              height: 45,
              borderRadius: 8,
              borderWidth: 1.5,
              borderColor: COLOR.grey1,
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: COLOR.grey2,
                fontFamily: FONT.semibold,
                fontSize: 13,
              }}>
              Is this User an Admin ?
            </Text>
            {isAdmin ? (
              <Ionicons name="checkbox" color={COLOR.primary} size={20} />
            ) : (
              <Ionicons name="square-outline" color={COLOR.grey1} size={20} />
            )}
          </TouchableOpacity>

          <InputBox
            label="Designation"
            keyboard=""
            value={designation}
            onChange={(text: any) => setDesignation(text)}
            error=""
          />

          <InputBox
            label="Password"
            keyboard=""
            password
            onChange={(text: any) => setPassword(text)}
            error=""
          />
        </ScrollView>
        <View style={styles.ButtonRow}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnTxt}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={styles.primaryBtn}>
            {isLoading ? (
              <ActivityIndicator color={'#fff'} size={'small'} />
            ) : (
              <Text style={styles.primaryBtnTxt}>Create</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  CreateUserForm: {
    flex: 1,
    padding: 20,
    backgroundColor: COLOR.White,
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLOR.White,
  },
  primaryBtn: {
    backgroundColor: COLOR.primary,
    height: 45,
    width: '49%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnTxt: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },

  secondaryBtnTxt: {
    color: COLOR.primary,
    fontWeight: '600',
    fontSize: 17,
  },

  secondaryBtn: {
    backgroundColor: COLOR.White,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    height: 45,
    width: '49%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
