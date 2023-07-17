import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../config/color';
import FONT from '../../config/font';
import Textinput from '../../components/textInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../config/API';
import {useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {useToast} from 'react-native-toast-notifications';
import Loader from '../../components/loader';
import {useNavigation} from '@react-navigation/native';

const AddLocation = ({props, route}: any) => {
  const {Refresh} = route.params;
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(true);
  const Auth = useSelector((state: any) => state.Auth.user);
  const toast = useToast();
  const navigation = useNavigation();

  const [locations, setLocations] = useState([]);

  useEffect(() => {}, []);

  const onSubmit = () => {
    setIsLoading(true);
    let api = API.BASE_URL + API.CREATE_LOCATIONS;
    let reqObj = {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
      created_by: Auth.emp_id,
      active: true,
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
        setIsLoading(true);
        Refresh();
        navigation.navigate('location' as never);
        toast.show('Location Added', {
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

  const checkLocation = () => {
    setIsLoading2(true);
    console.log('------- checkLocation');
    let currentLatitude: any;
    let currentLongitude: any;
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // console.log() = latitude;
        // currentLongitude = longitude;
        console.log('latitude --> ', latitude);
        console.log('longitude --> ', longitude);

        setTimeout(() => {
          setLatitude(String(latitude));
          setLongitude(String(longitude));
          setIsLoading2(false);
          toast.show('Location added !', {
            type: 'success',
          });
        }, 1000);
      },

      error => {
        console.log('Error getting current location:', error);
        setIsLoading2(false);
        toast.show('unable to check your location', {
          type: 'warning',
        });
      },
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      <View style={{flex: 1, padding: 10}}>
        <Textinput
          head="Latitude"
          keyboard="number-pad"
          value={latitude}
          onChange={(text: any) => setLatitude(text)}
          error=""
        />

        <Textinput
          head="Longitude"
          keyboard="number-pad"
          value={longitude}
          onChange={(text: any) => setLongitude(text)}
          error=""
        />

        <Textinput
          head="Radius"
          value={String(radius)}
          keyboard="number-pad"
          onChange={(text: any) => setRadius(Number(text))}
          error=""
        />

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={() => checkLocation()}
            style={styles.LocationBtn}>
            {isLoading2 ? (
              <>
                <Loader color={COLOR.primary} />
                <Text style={styles.BtnTxt2}>Fetching your Location</Text>
              </>
            ) : (
              <>
                <Ionicons
                  style={{marginRight: 10}}
                  name="location"
                  size={18}
                  color={COLOR.primary}
                />
                <Text style={styles.BtnTxt2}>Use Current Location</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={() => onSubmit()} style={styles.BackButton}>
          {isLoading ? (
            <Loader color={COLOR.white} />
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

  LocationBtn: {
    // backgroundColor: COLOR.primary,
    borderWidth:1.5,
    borderColor:COLOR.primary,
    height: 45,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  BtnTxt: {
    color: COLOR.white,
    fontFamily: FONT.semibold,
    fontSize: 14,
  },
  BtnTxt2: {
    color: COLOR.primary,
    fontFamily: FONT.semibold,
    fontSize: 14,
    marginLeft: 20,
  },
});
