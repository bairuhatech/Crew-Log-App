import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../config/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import moment from 'moment';
import FONT from '../../config/font';
import {request, check, PERMISSIONS} from 'react-native-permissions';
import CheckinModal from './components/checkinModal';
import CheckOutModal from './components/checkoutModal';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/core';
const HomeScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const Auth = useSelector((state: any) => state.Auth.user);
  const CheckedIn = useSelector((state: any) => state.Auth.checkin);
  const CheckedOut = useSelector((state: any) => state.Auth.checkout);

  console.log('Auth--> ', Auth);
  // console.log('CheckedIn--> ', CheckedIn);
  // console.log('CheckedOut--> ', CheckedOut);

  const [doCheckin, setDocheckin] = useState(false);
  const [doCheckout, setDocheckout] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const currentTime = new Date().getHours();
    let newGreeting = '';

    if (currentTime >= 5 && currentTime < 12) {
      newGreeting = 'Good Morning';
    } else if (currentTime >= 12 && currentTime < 17) {
      newGreeting = 'Good Afternoon';
    } else {
      newGreeting = 'Good Evening';
    }

    setGreeting(newGreeting);
  }, []);

  async function checkLocationPermission() {
    try {
      const permissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionStatus === 'granted') {
      } else if (permissionStatus === 'denied') {
        requestLocationPermission();
      } else {
        requestLocationPermission();
      }
    } catch (error) {
      console.log('Error checking location permission:', error);
    }
  }

  // Function to request location permission
  async function requestLocationPermission() {
    try {
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionStatus === 'granted') {
      } else {
        console.log('Location permission denied or unavailable.');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      <ScrollView>
        <View style={{height: 180, padding: 10}}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile' as never)}>
              <Ionicons color={COLOR.grey4} size={25} name="person-circle" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('settingsScreen' as never)}>
              <Ionicons color={COLOR.grey4} size={25} name="settings" />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.welcomeTxt1}>{greeting},</Text>
            <Text style={styles.welcomeTxt2}>{Auth.first_name}</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={{padding: 10}}>
            <Text style={styles.dateText}>
              {moment(new Date()).format('dddd D MMMM, YYYY')}
            </Text>
          </View>

          <View style={styles.timeTextItem}>
            <Text style={styles.timeText}>{moment().format('LTS')}</Text>
          </View>

          <View style={{padding: 10}}>
            <View style={styles.buttonRow}>
              <View style={styles.buttonInfo}>
                <Text style={styles.buttonInfoTxt1}>Check In Time</Text>
                <Text style={styles.buttonInfoTxt2}>
                  {/* {moment(Auth.login_time).format('LT')} */}
                  {/* {moment(Auth.login_time).format('dddd D MMMM, YYYY')} */}
                  
                </Text>
              </View>
              <TouchableOpacity
                style={CheckedIn ? styles.inButtonFade : styles.inButton}
                onPress={() => {
                  CheckedIn
                    ? toast.show('Already Checked In !', {
                        type: 'danger',
                      })
                    : setDocheckin(true);
                }}>
                <Text style={styles.buttonTxt1}>Check In</Text>
                <Feather size={20} color={COLOR.grey10} name="log-in" />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.buttonInfo}>
                <Text style={styles.buttonInfoTxt1}>Check Out Time</Text>
                <Text style={styles.buttonInfoTxt2}>
                  {moment(Auth.logout_time).format('LT')}
                </Text>
              </View>
              <TouchableOpacity
                // disabled={CheckedOut ? true : false}
                style={CheckedOut ? styles.inButtonFade : styles.inButton}
                onPress={() => {
                  CheckedOut
                    ? toast.show('Check In First !', {
                        type: 'danger',
                      })
                    : setDocheckout(true);
                }}>
                <Text style={styles.buttonTxt1}>Check Out</Text>
                <Feather size={20} color={COLOR.grey10} name="log-out" />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.ShowCheckinBox}>
            <Text style={styles.ShowCheckinHead}>Recent</Text>
            <View style={styles.ShowCheckin}>
              <Text style={styles.ShowCheckinItemHead}>Check In</Text>
            </View>
            <View style={styles.ShowCheckin}>
              <Text style={styles.ShowCheckinItemHead}>Check Out</Text>
            </View>
          </View> */}
        </View>
      </ScrollView>
      {doCheckin && (
        <CheckinModal visible={doCheckin} close={() => setDocheckin(false)} />
      )}
      {doCheckout && (
        <CheckOutModal
          visible={doCheckout}
          close={() => setDocheckout(false)}
        />
      )}
    </View>
  );
};

export default HomeScreen;
