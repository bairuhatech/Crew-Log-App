import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../Config/COLOR';
import FONT from '../../Config/Fonts';
import API from '../../Config/API';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import PageLoader from '../../Components/PageLoader';
import {PUT, GET} from '../../Utils/ApiCall';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    setIsLoading(true);
    let api = API.GET_LOCATIONS;
    let location: any = await GET(api, null);
    console.log(location);
    setLocations(location);
    setIsLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getLocations();
    setRefreshing(false);
  };

  const Refresh = () => {
    getLocations();
  };

  const DoLogout = (uuid: any) => {
    Alert.alert('Delete Office', 'are you sure Delete Office ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => DeleteUser(uuid),
      },
    ]);
  };

  const DeleteUser = async (uuid: any) => {
    let api: any = API.DELETE_LOCATIONS + uuid;
    let deleteS = await PUT(api, null);
    console.log(deleteS);
    getLocations();
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.HeaderRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddLocation' as never, {Refresh})
            }>
            <Feather size={24} color={'#000'} name="plus" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: COLOR.White}}>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <PageLoader />
        </View>
      ) : (
        <>
          <View style={{flex: 1, padding: 10}}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }>
              {locations &&
                locations.map((loc: any) => {
                  return (
                    <View style={styles.LocationItem}>
                      <View style={styles.UserItemTextItem}>
                        <Text style={styles.UserItemTextItemTxt1}>
                          Latitude
                        </Text>
                        <Text style={styles.UserItemTextItemTxt2}>:</Text>
                        <Text style={styles.UserItemTextItemTxt3}>
                          {loc.latitude}
                        </Text>
                      </View>

                      <View style={styles.UserItemTextItem}>
                        <Text style={styles.UserItemTextItemTxt1}>
                          Longitude
                        </Text>
                        <Text style={styles.UserItemTextItemTxt2}>:</Text>
                        <Text style={styles.UserItemTextItemTxt3}>
                          {loc.longitude}
                        </Text>
                      </View>

                      <View style={styles.UserItemTextItem}>
                        <Text style={styles.UserItemTextItemTxt1}>Radius</Text>
                        <Text style={styles.UserItemTextItemTxt2}>:</Text>
                        <Text style={styles.UserItemTextItemTxt3}>
                          {loc.radius}
                        </Text>
                      </View>

                      <View style={styles.LocationOptions}>
                        <TouchableOpacity>
                          <Text style={styles.editBtnTxt}></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteBtn}
                          onPress={() => DoLogout(loc.uuid)}>
                          <Text style={styles.deleteBtnTxt}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
          <View style={{padding: 10}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.BackButton}>
              <Text style={styles.BtnTxt}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  BackButton: {
    backgroundColor: COLOR.primary,
    height: 45,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnTxt: {
    color: COLOR.White,
    fontFamily: FONT.semibold,
    fontSize: 14,
  },

  LocationItem: {
    borderColor: COLOR.grey1,
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,
  },

  UserItemTextItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },

  UserItemTextItemTxt1: {
    width: '30%',
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    textTransform: 'capitalize',
  },

  UserItemTextItemTxt2: {
    width: '5%',
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    textTransform: 'capitalize',
  },

  UserItemTextItemTxt3: {
    width: '65%',
    color: COLOR.grey1,
    fontFamily: FONT.bold,
    textTransform: 'capitalize',
  },

  LocationOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    height: 25,
    marginTop: 10,
  },

  deleteBtn: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: COLOR.grey1,
  },

  deleteBtnTxt: {
    fontFamily: FONT.semibold,
    color: 'red',
    fontSize: 14,
  },

  editBtn: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: COLOR.grey1,
  },

  editBtnTxt: {
    fontFamily: FONT.semibold,
    color: COLOR.primary,
    fontSize: 14,
  },

  HeaderRow: {
    // padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
});
