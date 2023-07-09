import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import COLOR from '../Config/COLOR';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <TouchableOpacity
        style={styles.AdminActionItem}
        onPress={() => navigation.navigate('AdminAllUser' as never)}>
        <Ionicons size={20} color={COLOR.primary} name="people" />
        <View style={{flex: 1}}>
          <Text style={styles.AdminActionTxt}>All Users</Text>
        </View>
        <Ionicons size={20} color={COLOR.grey3} name="chevron-forward" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.AdminActionItem}
        onPress={() => navigation.navigate('AdminCreateUser' as never)}>
        <Ionicons size={18} color={COLOR.primary} name="person-add" />
        <View style={{flex: 1}}>
          <Text style={styles.AdminActionTxt}>Create User</Text>
        </View>
        <Ionicons size={20} color={COLOR.grey3} name="chevron-forward" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.AdminActionItem}
        onPress={() => navigation.navigate('AdminViewLog' as never)}>
        <Ionicons size={20} color={COLOR.primary} name="layers" />
        <View style={{flex: 1}}>
          <Text style={styles.AdminActionTxt}>View All Logs</Text>
        </View>
        <Ionicons size={20} color={COLOR.grey3} name="chevron-forward" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.AdminActionItem}
        onPress={() => navigation.navigate('AdminLocation' as never)}>
        <Ionicons size={20} color={COLOR.primary} name="location" />
        <View style={{flex: 1}}>
          <Text style={styles.AdminActionTxt}>Offices</Text>
        </View>
        <Ionicons size={20} color={COLOR.grey3} name="chevron-forward" />
      </TouchableOpacity>
    </View>
  );
}
