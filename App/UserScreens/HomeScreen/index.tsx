import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import COLOR from '../../Config/COLOR';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {
  RequestPermission,
  calculateDistance,
} from '../../Utils/LocationPermission';
import {getDeviceInfo} from '../../Utils/deviceInfo';
import {CheckiN, checkOUT} from '../../Redux/Slices/CheckInOut';
import API from '../../Config/API';
import {POST, GET} from '../../Utils/ApiCall';
import ProcessModal from './Components/ProcessModal';
export default function HomeScreen() {
  const dispatch = useDispatch();
  const Auth = useSelector((state: any) => state.Auth.user);
  const CheckInOut = useSelector((state: any) => state.CheckInOut);
  const [status, setStatus] = useState(CheckInOut.status);
  const [processo, setProcesso] = useState(false);
  const [isNear, setIsNear] = useState(false);
  let InColor = ['#FF512F', '#DD2476', '#DD2476'];
  let OutConlor = [COLOR.primary, COLOR.primary1, COLOR.primary2];

  useEffect(() => {
    setStatus(CheckInOut.status);
  }, [CheckInOut]);

  const getLocations = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let api = API.GET_LOCATIONS + '?order=ASC&page=1&take=100';
        let datas = await GET(api, null);
        if (datas && datas.length) {
          resolve(datas);
        } else {
          reject([]);
        }
      } catch (error) {
        reject([]);
      }
    });
  };

  const getdeviceInformation = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        var checkLocation: any = await RequestPermission();
        var getDevice: any = await getDeviceInfo();
        let obj = {
          device_id: getDevice.device_id,
          mac_address: getDevice.mac_address,
          ip_address: getDevice.ip_address,
          ssid: getDevice.ssid,
          latitude: checkLocation.latitude,
          longitude: checkLocation.longitude,
        };
        resolve(obj);
      } catch (error) {
        console.log(error);
        reject({});
      }
    });
  };

  const checkRadiusAndoffice = async (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        let available: any = await getLocations();
        let locatons: any = await getLocations();
        for (let i = 0; i < available?.length; i++) {
          let Dist: any = calculateDistance(
            locatons.latitude,
            locatons.longitude,
            available[i].latitude,
            available[i].longitude,
          );
          if (Dist * 1000 <= available[i].radius) {
            setIsNear(true);
            resolve(true);
            break;
          } else {
            setIsNear(false);
            resolve(false);
          }
        }
      } catch (error) {
        resolve(false);
        console.log(error);
        reject({});
      }
    });
  };

  const checkInAction = async () => {
    try {
      var getDevice: any = await getdeviceInformation();
      setProcesso(true);
      var validation: any = await checkRadiusAndoffice(getDevice);
      console.log('validation', validation);
      if (validation) {
        var reqObj = {
          emp_id: Auth && String(Auth.emp_id),
          type: 'checkin',
          time: new Date().toString(),
          checkin_time: new Date().toString(),
          device_id: getDevice.device_id,
          mac_address: getDevice.mac_address,
          ip_address: getDevice.ip_address,
          ssid: getDevice.ssid,
          location_lat: getDevice.latitude.toString(),
          location_long: getDevice.longitude.toString(),
        };
        var api = API.MARK_ATTENDANCE;
        let sendCheckIn: any = await POST(api, reqObj);
        if (sendCheckIn.type === 'checkin') {
          dispatch(CheckiN(sendCheckIn));
          setProcesso(false);
        } else {
        }
      } else {
        setProcesso(false);
      }
    } catch (err) {
      console.log(err);
      setProcesso(true);
    }
  };

  const checkoutAction = async () => {
    try {
      var getDevice: any = await getdeviceInformation();
      setProcesso(true);
      var validation: any = await checkRadiusAndoffice(getDevice);
      console.log('validation', validation);
      if (validation) {
        var reqObj = {
          emp_id: Auth && String(Auth.emp_id),
          type: 'checkout',
          time: new Date().toString(),
          checkin_time: new Date().toString(),
          device_id: getDevice.device_id,
          mac_address: getDevice.mac_address,
          ip_address: getDevice.ip_address,
          ssid: getDevice.ssid,
          location_lat: getDevice.latitude.toString(),
          location_long: getDevice.longitude.toString(),
        };
        var api = API.MARK_ATTENDANCE;
        let sendCheckOut: any = await POST(api, reqObj);
        if (sendCheckOut.type === 'checkout') {
          dispatch(checkOUT(sendCheckOut));
          setProcesso(false);
        } else {
        }
      } else {
        setProcesso(false);
      }
    } catch (err) {
      console.log(err);
      setProcesso(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <View style={styles.Box1}>
        <Text style={styles.txt1}>Good Moring</Text>
        <Text style={styles.txt2}>{Auth.first_name}</Text>
      </View>
      <View style={styles.Box2}>
        <Text style={styles.txt5}>{moment().format('h:mm')}</Text>
        <Text style={styles.txt6}>{moment().format('dddd , MM, YY')}</Text>
        <View style={{margin: 20}} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            status ? checkoutAction() : checkInAction();
          }}>
          <LinearGradient
            useAngle={true}
            angle={45}
            colors={status ? InColor : OutConlor}
            style={styles.button}>
            <Text style={styles.txt7}>Check {status ? 'Out' : 'In'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{margin: 20}} />
        <Text style={styles.txt4}>
          <Text style={{color: 'grey'}}> Location :</Text>{' '}
          {CheckInOut.state && CheckInOut.state.location_lat} ,{' '}
          {CheckInOut.state && CheckInOut.state.location_long}
        </Text>
      </View>
      <View style={styles.Box3}>
        <TouchableOpacity>
          <Text style={styles.txt4}>
            {CheckInOut.status
              ? CheckInOut.state &&
                moment(CheckInOut.state.checkin_time).format('hh:mm a')
              : '--:--'}
          </Text>
          <Text style={styles.txt3}>check In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.txt4}>--:--</Text>
          <Text style={styles.txt3}>check Out</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.txt4}>
            {' '}
            {CheckInOut.status
              ? CheckInOut.state &&
                moment
                  .duration(
                    moment(new Date()).diff(CheckInOut.state.checkin_time),
                  )
                  .asHours()
                  .toFixed(0)
              : '--:--'}
          </Text>
          <Text style={styles.txt3}>W. Hours</Text>
        </TouchableOpacity>
      </View>
      <ProcessModal isNear={isNear} visible={processo} />
    </View>
  );
}
