import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
const RequestPermission = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Platform.OS === 'ios') {
        const status = await Geolocation.requestAuthorization('whenInUse');
      }
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ],
          {
            title: 'ParcelKing',
            message: 'App access to your location',
          },
        );
        if (PermissionsAndroid.RESULTS.GRANTED) {
          let current = await getLocation();
          resolve(current);
        } else {
          console.log('location permission denied');
        }
      }
    } catch (error) {
      console.log(error);
      reject({});
    }
  });
};

const getLocation = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          let orgin = position.coords;
          resolve(orgin);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: false,
        },
      );
    } catch (error) {
      console.log(error);
      reject({});
    }
  });
};

const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
  console.log(lat1);
  console.log(lon1);
  console.log(lat2);
  console.log(lon2);
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

function toRad(degrees: any) {
  return degrees * (Math.PI / 180);
}

export {RequestPermission, getLocation, calculateDistance};
