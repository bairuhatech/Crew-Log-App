import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo, {
  getUniqueId,
  getManufacturer,
} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';

const getDeviceInfo = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      var obj = {
        device_id: 'null',
        mac_address: '123macaddress',
        ip_address: 'null',
        ssid: 'null',
      };
      if (Platform.OS === 'android') {
        NetworkInfo.getIPAddress().then((ipAddress: any) => {
          obj['ip_address'] = ipAddress;
        });
      } else {
        NetworkInfo.getIPAddress().then((ipAddress: any) => {
          obj['ip_address'] = ipAddress;
        });
      }
      DeviceInfo.getAndroidId().then((androidId: any) => {
        obj['ssid'] = androidId;
      });
      DeviceInfo.getUniqueId().then((device: any) => {
        obj['device_id'] = device;
      });
      resolve(obj);
    } catch (error) {
      console.log(error);
      reject({});
    }
  });
};

export {getDeviceInfo};
