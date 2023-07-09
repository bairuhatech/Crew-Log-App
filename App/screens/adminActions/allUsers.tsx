import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PageLoader from '../../components/pageLoader';
import API from '../../config/API';
import UserItem from './components/userItem';
import COLOR from '../../config/color';
import FONT from '../../config/font';
import {useNavigation} from '@react-navigation/core';
import ConfirmModal from '../../components/confirmModal';
import {useToast} from 'react-native-toast-notifications';

const AllUsers = () => {
  const toast = useToast();

  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [deleteUser, setDeleteUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [emp_id, setEmpId] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  // const getUsers = () => {
  //   let api = API.BASE_URL + API.GET_USERS;
  //   fetch(api)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Users: ', data);
  //       setUsers(data);
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };

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

  const DeleteUser = () => {
    setIsDeleting(true);
    let api: any = API.BASE_URL + API.DELETE_USER + emp_id;
    console.log(api);
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
        setDeleteUser(false);
        // setDoDelete(false);
        // getLocations();
        toast.show('User Deleted !', {
          type: 'success',
        });
      })
      .catch(error => {
        console.log(error);
      });
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
                onDeletePress={(emp_id: any) => {
                  console.log(emp_id);

                  setEmpId(emp_id);
                  setDeleteUser(true);
                }}
                data={item}
              />
            )}
            keyExtractor={(item: any) => item.uuid}
            refreshControl={
              <RefreshControl
                // colors={['#9Bd35A', '#689F38']}
                refreshing={isLoading}
                onRefresh={getUsers}
              />
            }
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
      {deleteUser ? (
        <ConfirmModal
          loading={isDeleting}
          visible={deleteUser}
          close={() => setDeleteUser(false)}
          text="Are you sure you want to delete this user?"
          onSelect={() => DeleteUser()}
        />
      ) : null}
    </View>
  );
};

export default AllUsers;

const styles = StyleSheet.create({});
