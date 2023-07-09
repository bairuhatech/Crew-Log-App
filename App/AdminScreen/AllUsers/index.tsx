import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import COLOR from '../../Config/COLOR';
import styles from '../styles';

export default function AllUsers() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />

      <Text>AllUsers</Text>
    </View>
  );
}
