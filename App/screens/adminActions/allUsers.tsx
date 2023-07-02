import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PageLoader from '../../components/pageLoader';
import API from '../../config/API';
import UserItem from './components/userItem';
import COLOR from '../../config/color';
import FONT from '../../config/font';
import {useNavigation} from '@react-navigation/core';

const AllUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getLocations();
  }, []);
  const getLocations = () => {
    let api = API.BASE_URL + API.GET_USERS;
    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Users: ', data);
        setUsers(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <PageLoader />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={users}
            renderItem={({item}: any) => <UserItem data={item} />}
            keyExtractor={item => item.uuid}
          />
        </View>
      )}
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Admin' as never)}
          style={{
            backgroundColor: COLOR.primary,
            height: 45,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLOR.grey10,
              fontFamily: FONT.semibold,
              fontSize: 14,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllUsers;

const styles = StyleSheet.create({});
