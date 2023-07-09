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
import API from '../../config/API';
import LoadingModal from '../../components/loadingModal';
const HomeScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const Auth = useSelector((state: any) => state.Auth.user);
  const CheckedIn = useSelector((state: any) => state.Auth.checkin);
  const CheckedOut = useSelector((state: any) => state.Auth.checkout);
  const [loading, setLoading] = useState(true);
  const [doCheckin, setDocheckin] = useState(false);
  const [doCheckout, setDocheckout] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLoading(true);
    getLocations();
  }, []);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    setLoading(true);
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

  const getLocations = () => {
    setLoading(true);
    let api = API.BASE_URL + API.GET_LOCATIONS + '?order=ASC&page=1&take=100';
    fetch(api, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(location => {
        console.log('location success==> ');
        setLocations(location);
        setLoading(false);
        console.log('location==> ', location);
      })
      .catch(error => {
        console.log('Service Error ===>>', error);
      });
  };

  async function checkLocationPermission() {
    setLoading(true);
    try {
      const permissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionStatus === 'granted') {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else if (permissionStatus === 'denied') {
        requestLocationPermission();
      } else {
        requestLocationPermission();
      }
    } catch (error) {
      console.log('Error checking location permission:', error);
    }
  }

  async function requestLocationPermission() {
    setLoading(true);
    try {
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionStatus === 'granted') {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        console.log('Location permission denied or unavailable.');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
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
                  {moment(Auth.login_time).format('h:mm A')}
                </Text>
              </View>
              <TouchableOpacity
                // onPress={() => {
                //   CheckedIn
                //     ? toast.show('Already Checked In !', {
                //         type: 'danger',
                //       })
                //     : setDocheckin(true);

                //   toast.show('Location error. Please contact Admin !', {
                //     type: 'danger',
                //   })
                // }}
                onPress={() => setDocheckin(true)}
                style={CheckedIn ? styles.inButtonFade : styles.inButton}>
                <Text style={styles.buttonTxt1}>Check In</Text>
                <Feather size={20} color={COLOR.grey10} name="log-in" />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.buttonInfo}>
                <Text style={styles.buttonInfoTxt1}>Check Out Time</Text>
                <Text style={styles.buttonInfoTxt2}>
                  {moment(Auth.logout_time).format('h:mm A')}
                </Text>
              </View>
              <TouchableOpacity
                // disabled={CheckedOut ? true : false}
                onPress={() => setDocheckout(true)}
                // onPress={() => {
                //   CheckedOut
                //     ? toast.show('Check In First !', {
                //         type: 'danger',
                //       })
                //     : setDocheckout(true);
                // }}
                style={CheckedOut ? styles.inButtonFade : styles.inButton}>
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
        <CheckinModal
          location={locations}
          visible={doCheckin}
          close={() => setDocheckin(false)}
        />
      )}
      {doCheckout && (
        <CheckOutModal
          location={locations}
          visible={doCheckout}
          close={() => setDocheckout(false)}
        />
      )}

      {loading ? (
        <LoadingModal
          text={'Loading...'}
          visible={loading}
          // close={() => setisLoading(false)}
        />
      ) : null}

      {/* {loading ? <LoadingModal visible={true} text="Loading" /> : null} */}
    </View>
  );
};

export default HomeScreen;
