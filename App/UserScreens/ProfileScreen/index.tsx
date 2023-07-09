import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import COLOR from '../../Config/COLOR';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logout} from '../../Redux/Slices/AuthSlice';
import {useNavigation} from '@react-navigation/native';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const Auth = useSelector((state: any) => state.Auth);
  const User = useSelector((state: any) => state.Auth.user);

  const DoLogout = () => {
    Alert.alert('Logout Now', 'are you sure want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logout(null));
          navigation.reset({routes: [{name: 'loginscreen' as never}]});
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <View style={styles.box1}>
        <Ionicons name="person-circle-outline" style={styles.propic} />
        <Text style={styles.txt1}>
          {User.first_name + ' ' + User.last_name}
        </Text>
        <View style={styles.box3}>
          <TouchableOpacity style={styles.box4}>
            <Text style={styles.txt5}>user</Text>
          </TouchableOpacity>
          {Auth.admin ? (
            <TouchableOpacity style={styles.box5}>
              <Text style={styles.txt5}>admin</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.box2}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.txt2}>Employee ID</Text>
          <Text style={styles.txt3}>{User.emp_id}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.txt2}>Email ID</Text>
          <Text style={styles.txt3}>{User.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.txt2}>Phone Number</Text>
          <Text style={styles.txt3}>{User.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.txt2}>Joined date time</Text>
          <Text style={styles.txt3}>{User.join_date}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => DoLogout()}>
          <Text style={styles.txt4}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
