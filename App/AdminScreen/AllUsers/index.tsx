import {FlatList, RefreshControl, StyleSheet, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import PageLoader from '../../Components/PageLoader';
import API from '../../Config/API';
import UserItem from '../../Components/UserItem';
import {useNavigation} from '@react-navigation/core';
import {GET} from '../../Utils/ApiCall';

const AllUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let api = API.GET_USERS;
    let getAllData: any = await GET(api, null);
    setUsers(getAllData);
    setIsLoading(false);
  };

  const DoLogout = (user_id: any) => {
    Alert.alert('Delete user', 'are you sure Delete user ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => DeleteUser(user_id),
      },
    ]);
  };

  const DeleteUser = async (user_id: any) => {
    let api: any = API.DELETE_USER + user_id;
    let deleteS = await GET(api, null);
    getUsers();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <PageLoader />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={users}
            renderItem={({item}: any) => (
              <UserItem
                onDeletePress={(emp_id: any) => DoLogout(emp_id)}
                data={item}
              />
            )}
            keyExtractor={(item: any) => item.uuid}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getUsers} />
            }
          />
        </View>
      )}
    </View>
  );
};

export default AllUsers;
const styles = StyleSheet.create({});
