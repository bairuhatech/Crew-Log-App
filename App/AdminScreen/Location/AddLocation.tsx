import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../Config/COLOR';
import FONT from '../../Config/Fonts';
import InputBox from '../../Components/InputBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../Config/API';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RequestPermission} from '../../Utils/LocationPermission';
import {POST} from '../../Utils/ApiCall';

const AddLocation = ({props, route}: any) => {
  const {Refresh} = route.params;
  const navigation = useNavigation();
  const Auth = useSelector((state: any) => state.Auth.user);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    let api = API.CREATE_LOCATIONS;
    let reqObj = {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
      created_by: Auth.emp_id,
      active: true,
    };
    let create = await POST(api, reqObj);
    setIsLoading(true);
    Refresh();
    navigation.navigate('AdminLocation' as never);
  };

  const checkLocation = async () => {
    var location: any = await RequestPermission();
    if (location.longitude) {
      setLatitude(String(location.latitude));
      setLongitude(String(location.longitude));
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.White, padding: 10}}>
      <View style={{flex: 1, padding: 10}}>
        <InputBox
          label="Latitude"
          keyboardType="number-pad"
          value={latitude}
          onChange={(text: any) => setLatitude(text)}
          error=""
        />

        <InputBox
          label="Longitude"
          keyboardType="number-pad"
          value={longitude}
          onChange={(text: any) => setLongitude(text)}
          error=""
        />

        <InputBox
          label="Radius"
          value={String(radius)}
          keyboardType="number-pad"
          onChange={(text: any) => setRadius(Number(text))}
          error=""
        />

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={() => checkLocation()}
            style={styles.locationButton}>
            <Ionicons name="location" style={styles.BtnTxt2} />
            <Text style={styles.BtnTxt2}>Use Current Location</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={() => onSubmit()} style={styles.BackButton}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={'#fff'} />
          ) : (
            <Text style={styles.BtnTxt}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  BackButton: {
    backgroundColor: COLOR.primary,
    height: 45,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  BtnTxt: {
    color: COLOR.White,
    fontFamily: FONT.semibold,
    fontSize: 14,
  },
  BtnTxt2: {
    color: COLOR.primary,
    fontFamily: FONT.semibold,
    fontSize: 14,
    marginLeft: 20,
  },
  locationButton: {
    backgroundColor: COLOR.grey5,
    height: 45,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
