import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function SettingsIcon() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
      <Ionicons name="settings-outline" style={styles.SettingsIcon} />
    </TouchableOpacity>
  );
}
