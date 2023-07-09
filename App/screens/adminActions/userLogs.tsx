import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import API from '../../config/API';
import PageLoader from '../../components/pageLoader';
import UserItemLog from './components/userItem2';
import {useDispatch, useSelector} from 'react-redux';
import {empId} from '../../redux/Slices/UserSlice';
import COLOR from '../../config/color';
import FONT from '../../config/font';

const UserLogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setIsLoading(true);
    let api = API.BASE_URL + API.GET_USERS;
    fetch(api, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(users => {
        console.log('Users: ', users);
        setUsers(users);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Service Error ===>>', error);
      });
  };
  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <PageLoader />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: COLOR.white}}>
          {/* <View style={{padding: 10}}>
            <Text
              style={{
                color: COLOR.black,
                fontFamily: FONT.semibold,
                fontSize: 20,
              }}>
              Choose User
            </Text>
          </View> */}

          <View>
            <FlatList
              data={users}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(empId(item.emp_id));
                    navigation.navigate('viewUserLogs' as never);
                  }}>
                  <UserItemLog data={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item: any) => item.id}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default UserLogs;

const styles = StyleSheet.create({});
