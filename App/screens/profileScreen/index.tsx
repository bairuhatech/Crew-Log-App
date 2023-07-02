import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../config/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
// import {logout} from '../../redux/Slices/AuthSlice';
import {useNavigation} from '@react-navigation/native';
import LoadingModal from '../../components/loadingModal';
import ConfirmModal from '../../components/confirmModal';
import {logout} from '../../redux/Slices/AuthSlice';
import moment from 'moment';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const User = useSelector((state: any) => state.Auth.user);

  const [isLoading, setisLoading] = useState(false);
  const [logoff, setLogoff] = useState(false);

  const DoLogout = () => {
    setLogoff(false);
    setisLoading(true);
    setTimeout(() => {
      dispatch<any>(logout({}));
      setisLoading(false);
      navigation.navigate('loginScreen' as never);
    }, 1000);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View style={styles.ProfileBox1}>
            <Image
              // source={require('../../assets/images/tony-stark.jpg')}
              source={require('../../assets/images/avatar.png')}
              style={styles.Avatar}
            />
            <Text style={styles.Username}>
              {User.first_name + ' ' + User.last_name}
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.Role}>{User.designation}</Text>
            </View>
          </View>
          <View style={styles.DetailsBox}>
            <Text style={styles.DetailsHead}>More Details</Text>
            <View style={styles.DetailsItem}>
              <View style={styles.DetailsItemCol1}>
                <Feather size={17} color={COLOR.grey5} name="user" />
                <Text style={styles.DetailsItemLabel}>Employee ID</Text>
              </View>
              <View>
                <Text style={styles.DetailsItemText}>{User.emp_id}</Text>
              </View>
            </View>
            <View style={styles.DetailsItem}>
              <View style={styles.DetailsItemCol1}>
                <Feather size={17} color={COLOR.grey5} name="mail" />
                <Text style={styles.DetailsItemLabel}>Email</Text>
              </View>
              <View>
                <Text style={styles.DetailsItemText}>{User.email}</Text>
              </View>
            </View>
            <View style={styles.DetailsItem}>
              <View style={styles.DetailsItemCol1}>
                <Feather size={17} color={COLOR.grey5} name="phone" />
                <Text style={styles.DetailsItemLabel}>Phone</Text>
              </View>
              <View>
                <Text style={styles.DetailsItemText}>{User.phone}</Text>
              </View>
            </View>
            <View style={styles.DetailsItem}>
              <View style={styles.DetailsItemCol1}>
                <Feather size={17} color={COLOR.grey5} name="calendar" />
                <Text style={styles.DetailsItemLabel}>Joined</Text>
              </View>
              <View>
                <Text style={styles.DetailsItemText}>
                  {moment(User.join_date).format('MMM Do YYYY')}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.ProfileOptions}>
            <TouchableOpacity style={styles.ProfileOptionsItem}>
              <Feather name="edit" size={18} color={COLOR.grey2} />
              <Text style={styles.ProfileOptionsText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ProfileOptionsItem}>
              <Feather name="settings" size={18} color={COLOR.grey2} />
              <Text style={styles.ProfileOptionsText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLogoff(true);
              }}
              style={styles.ProfileOptionsItem}>
              <Feather name="log-out" size={18} color={COLOR.warning} />
              <Text style={styles.ProfileOptionsText2}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <LoadingModal
            text={'Logging off...'}
            visible={isLoading}
            // close={() => setisLoading(false)}
          />
        ) : null}
        {logoff ? (
          <ConfirmModal
            text={'Are you sure you want to logout ?'}
            type="warning"
            visible={logoff}
            close={() => setLogoff(false)}
            onSelect={() => DoLogout()}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
