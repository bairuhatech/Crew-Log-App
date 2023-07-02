import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import MapView, {Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import {request, check, PERMISSIONS} from 'react-native-permissions';
import DeviceInfo, {
  getUniqueId,
  getManufacturer,
} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';
import styles from '../styles';
import COLOR from '../../../config/color';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';
import API from '../../../config/API';
import Loader from '../../../components/loader';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {checkin} from '../../../redux/Slices/AuthSlice';
import moment from 'moment';

const CheckinModal = (props: any) => {
  const dispatch = useDispatch();
  const Auth = useSelector((state: any) => state.Auth);
  // console.log('Auth--> ', Auth.user);
  const toast = useToast();
  const [deviceId, setDeviceId] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [ip, setIp] = useState('');
  const [ssid, setSsid] = useState('');
  const [latitude, setLatitude] = useState<any>('');
  const [longitude, setLongitude] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkingLocation, setCheckingLocation] = useState(true);
  const [isNear, setIsNear] = useState(false);
  const [isError, setIsError] = useState(false);
  const [date, setDate] = useState(new Date().toString());

  console.log('latitude --> ', latitude);
  console.log('longitude --> ', longitude);

  const specificLocation = {
    latitude: 11.4826878,
    longitude: 75.9944369,
    radius: 10, //meters
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      NetworkInfo.getIPAddress().then((ipAddress: any) => {
        setIp(ipAddress);
      });
    } else {
      NetworkInfo.getIPAddress().then((ipAddress: any) => {
        setIp(ipAddress);
      });
    }

    DeviceInfo.getAndroidId().then((androidId: any) => {
      setSsid(androidId);
    });

    DeviceInfo.getUniqueId().then((device: any) => {
      setDeviceId(device);
    });
  });

  useEffect(() => {
    checkLocationPermission();
    // getLocations();
  }, []);

  const checkLocation = () => {
    console.log('------- checkLocation');
    let currentLatitude: any;
    let currentLongitude: any;
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        currentLatitude = latitude;
        currentLongitude = longitude;
        setLatitude(String(latitude));
        setLongitude(String(longitude));
      },
      error => {
        console.log('Error getting current location:', error);
        setIsError(true);
        toast.show('unable to check your location', {
          type: 'warning',
        });
      },
    );

    // Example usage
    const definedLatitude = 11.4826878; // Latitude of the defined location
    const definedLongitude = 75.9944369; // Longitude of the defined location

    setTimeout(() => {
      const distance = calculateDistance(
        currentLatitude,
        currentLongitude,
        definedLatitude,
        definedLongitude,
      );
      console.log('Distance ---------->>>> ', distance * 1000, 'km');
      if (distance * 1000 <= 10) {
        setIsNear(true);
        setCheckingLocation(false);
      } else {
        setIsNear(false);
        setCheckingLocation(false);
      }
    }, 500);
  };

  // const getLocations = () => {
  //   let api = API.BASE_URL + API.GET_LOCATIONS;
  //   fetch(api)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Locations: ', data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };

  async function checkLocationPermission() {
    console.log('------- checkLocationPermission');
    try {
      const permissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionStatus === 'granted') {
        checkLocation();
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
    console.log('---------- requestLocationPermission');

    try {
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionStatus === 'granted') {
        checkLocation();
      } else {
        console.log('Location permission denied or unavailable.');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  }

  // =========================================
  // const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
  //   setCheckingLocation(true);
  //   const R = 6371; // Earth's radius in kilometers
  //   const dLat = ((lat2 - lat1) * Math.PI) / 180;
  //   const dLon = ((lon2 - lon1) * Math.PI) / 180;
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos((lat1 * Math.PI) / 180) *
  //       Math.cos((lat2 * Math.PI) / 180) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c * 1000; // Distance in meters
  //   return distance;
  // };

  // const checkDistanceFromTarget = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setLatitude(String(latitude));
  //       setLongitude(String(longitude));
  //       const distance = calculateDistance(
  //         latitude,
  //         longitude,
  //         specificLocation.latitude,
  //         specificLocation.longitude,
  //       );
  //       if (distance <= specificLocation.radius) {
  //         // Your current location is within 5 meters of the target location
  //         console.log('You are near the target location!');
  //         setIsNear(true);
  //         setTimeout(() => {
  //           setCheckingLocation(false);
  //         }, 1000);
  //       } else {
  //         // Your current location is not within 5 meters of the target location
  //         console.log('You are not near the target location.');
  //         setIsNear(false);
  //         setCheckingLocation(false);
  //       }
  //     },
  //     error => {
  //       console.log('Error getting current location:', error);
  //       setIsError(true);
  //     },
  //   );
  // };

  // =
  // =
  // =
  // =
  // =

  // Function to calculate the distance between two points using the Haversine formula
  const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    console.log('----------- calculateDistance');

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Helper function to convert degrees to radians
  function toRad(degrees: any) {
    return degrees * (Math.PI / 180);
  }

  // =
  // =
  // =
  // =
  // =

  const doCheckIn = () => {
    setIsLoading(true);
    let api = API.BASE_URL + API.MARK_ATTENDANCE;
    let reqObj = {
      emp_id: Auth && String(Auth.user.emp_id),
      type: 'checkin',
      time: new Date().toString(),
      checkin_time: new Date().toString(),
      device_id: deviceId,
      mac_address: macAddress ? macAddress : '123macaddress',
      ip_address: ip,
      ssid: ssid,
      location_lat: latitude,
      location_long: longitude,
    };

    console.log('reqObj ===> ', reqObj);

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
        dispatch(checkin());
        setIsLoading(true);
        props.close();
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

  // =========================================

  return (
    <View>
      <Modal
        isVisible={props.visible}
        style={{justifyContent: 'flex-end', margin: 5}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 400,
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
              <MapView
                style={{height: 200, borderRadius: 10}}
                initialRegion={{
                  ...specificLocation,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker coordinate={specificLocation} />
              </MapView>

              <View style={styles.locationMsgBox}>
                {checkingLocation ? (
                  <ActivityIndicator size={'small'} color={COLOR.primary} />
                ) : (
                  <Text style={styles.locationMsg1}>
                    {isNear
                      ? 'You are in the location'
                      : 'You are away from the location'}
                  </Text>
                )}

                <Text style={styles.locationMsg2}>
                  Checking Your Location...
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
              <Text style={styles.secondaryBtnTxt}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => doCheckIn()}
              disabled={!isNear}
              style={styles.primaryBtn}>
              {isLoading ? (
                <Loader color={'#fff'} />
              ) : (
                <Text style={styles.primaryBtnTxt}>Check In</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckinModal;
