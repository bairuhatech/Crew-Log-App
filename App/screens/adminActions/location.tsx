import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../config/color';
import FONT from '../../config/font';
import API from '../../config/API';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {useToast} from 'react-native-toast-notifications';
import ConfirmModal from '../../components/confirmModal';
import Loader from '../../components/loader';
import PageLoader from '../../components/pageLoader';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();
  const toast = useToast();
  const [doDelete, setDoDelete] = useState(false);
  const [uuid, setUuid] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = () => {
    setIsLoading(true);
    let api = API.BASE_URL + API.GET_LOCATIONS;
    console.log('Location API ==> ', api);

    fetch(api, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(location => {
        setLocations(location);
        console.log('location ---> ', location);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Service Error ===>>', error);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getLocations();
    setRefreshing(false);
  };

  const deleteLocation = () => {
    setIsDeleting(true);
    let api: any = API.BASE_URL + API.DELETE_LOCATIONS + uuid;
    // console.log(api);
    fetch(api, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then((json: any) => {
        console.log(json);
        // console.log('Deleted ' + uuid);
        setIsDeleting(false);
        setDoDelete(false);
        getLocations();
        toast.show('Location Deleted !', {
          type: 'success',
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const Refresh = () => {
    getLocations();
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.HeaderRow}>
          <TouchableOpacity
            onPress={() => {
              // locations && locations.length > 0
              //   ? toast.show('Alreadt added a location', {
              //       type: 'danger',
              //     })
              //   :
              navigation.navigate('addLocation' as never, {Refresh});
            }}>
            {/* {locations && locations.length > 0 ? null : ( */}
            <Feather size={20} color={COLOR.grey1} name="plus" />
            {/* )} */}
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
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
                          onPress={() => {
                            setUuid(loc.uuid);
                            setDoDelete(true);
                          }}>
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

      {doDelete ? (
        <ConfirmModal
          loading={isDeleting}
          text="Are you sure you want to delete this location?"
          visible={doDelete}
          close={() => setDoDelete(false)}
          onSelect={() => deleteLocation()}
        />
      ) : null}
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
    color: COLOR.white,
    fontFamily: FONT.semibold,
    fontSize: 14,
  },

  LocationItem: {
    borderColor: COLOR.grey9,
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
    borderColor: COLOR.grey9,
  },

  deleteBtnTxt: {
    fontFamily: FONT.semibold,
    color: COLOR.warning,
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
    borderColor: COLOR.grey9,
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
