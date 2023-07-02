import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import COLOR from '../../config/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FONT from '../../config/font';
import styles from './styles';
import {useNavigation} from '@react-navigation/core';

const Admin = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableOpacity
            style={styles.AdminActionItem}
            onPress={() => navigation.navigate('allUsers' as never)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons size={20} color={COLOR.white} name="people" />
              <Text style={styles.AdminActionTxt}>All Users</Text>
            </View>
            <View>
              <Ionicons size={20} color={COLOR.white} name="chevron-forward" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.AdminActionItem}
            onPress={() => navigation.navigate('addUser' as never)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons size={20} color={COLOR.white} name="people" />
              <Text style={styles.AdminActionTxt}>Add Users</Text>
            </View>
            <View>
              <Ionicons size={20} color={COLOR.white} name="chevron-forward" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.AdminActionItem}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons size={20} color={COLOR.white} name="layers" />
              <Text style={styles.AdminActionTxt}>View All Logs</Text>
            </View>
            <View>
              <Ionicons size={20} color={COLOR.white} name="chevron-forward" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.AdminActionItem}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons size={20} color={COLOR.white} name="location" />
              <Text style={styles.AdminActionTxt}>Location</Text>
            </View>
            <View>
              <Ionicons size={20} color={COLOR.white} name="chevron-forward" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Admin;
