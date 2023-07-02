import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../config/color';
import Loader from '../../components/loader';
import Textinput from '../../components/textInput';
import DatePick from '../../components/datePicket';
import moment from 'moment';
import FONT from '../../config/font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../config/API';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/core';

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkinTime, setCheckinTime] = useState('');
  const [checkoutTime, setCheckoutTime] = useState('');
  const [status, setStatus] = useState('1');
  const [designation, setDesignation] = useState('');
  const [active, setActive] = useState(true);
  const [role, setRole] = useState(2);
  const [joinDate, setJoinDate] = useState('');
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
      login_time: checkinTime,
      logout_time: checkoutTime,
      status: status,
      designation: designation,
      active: active,
      role: isAdmin ? 1 : 0,
      join_date: joinDate,
    };

    console.log('Use reqObj --> ', reqObj);

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
        // dispatch(checkin());
        setIsLoading(true);
        // props.close();
        navigation.navigate('allUsers' as never);
        toast.show('Checkin Successful', {
          type: 'success',
        });
      })
      .catch(error => {
        console.error('Error:', error);
        toast.show('Some Error Occured', {
          type: 'danger',
        });
        setIsLoading(true);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.CreateUserForm}>
        <ScrollView>
          <Textinput
            head="First name"
            onChange={(text: any) => setFirstName(text)}
            error=""
          />
          <Textinput
            head="Last name"
            keyboard=""
            onChange={(text: any) => setLastName(text)}
            error=""
          />

          <Textinput
            head="Email"
            keyboard="email-address"
            onChange={(text: any) => setEmail(text)}
            error=""
          />

          <Textinput
            head="Phone"
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
              borderColor: COLOR.grey7,
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

          <DatePick
            time
            head="Checkin Time"
            value={checkinTime ? moment(checkinTime).format('h:mm A') : ''}
            onChange={(date: any) => setCheckinTime(date.toString())}
          />

          <DatePick
            time
            head="Checkout Time"
            value={checkoutTime ? moment(checkoutTime).format('h:mm A') : ''}
            onChange={(date: any) => setCheckoutTime(date.toString())}
          />

          <Textinput
            head="Designation"
            keyboard=""
            onChange={(text: any) => setDesignation(text)}
            error=""
          />

          <DatePick
            head="Join Date"
            value={
              checkoutTime ? moment(checkoutTime).format('MMMM Do YYYY') : ''
            }
            onChange={(date: any) => setJoinDate(date.toISOString())}
          />

          <Textinput
            head="Password"
            keyboard=""
            onChange={(text: any) => setPassword(text)}
            error=""
          />
        </ScrollView>
      </View>
      <View style={styles.ButtonRow}>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryBtnTxt}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSubmit()} style={styles.primaryBtn}>
          {isLoading ? (
            <Loader color={'#fff'} />
          ) : (
            <Text style={styles.primaryBtnTxt}>Create</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  CreateUserForm: {
    flex: 1,
    padding: 10,
    backgroundColor: COLOR.white,
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 5,
    backgroundColor: COLOR.white,
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
});
