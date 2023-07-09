import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import API from '../../Config/API';
import PageLoader from '../../Components/PageLoader';
import UserItemLog from '../../Components/UserItemLog';
import COLOR from '../../Config/COLOR';

const ViewAllLogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

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
        <View style={{flex: 1, backgroundColor: COLOR.White}}>
          <View>
            <FlatList
              data={users}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UserViseLogs' as never, {
                      emp_id: item.emp_id,
                    });
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

export default ViewAllLogs;

const styles = StyleSheet.create({});
