import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FONT from '../../config/font';
import COLOR from '../../config/color';
import NetInfo from '@react-native-community/netinfo';

const OfflineNotification = () => {
  const [netInfo, setNetInfo] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setNetInfo(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return netInfo ? null : (
    <View style={styles.container}>
      <Text style={styles.textStyle}>No Internet Connection</Text>
    </View>
  );
};

export default OfflineNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.warning,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
    margin: 3,
    color: '#fff',
    fontFamily: FONT.semibold,
  },
});
