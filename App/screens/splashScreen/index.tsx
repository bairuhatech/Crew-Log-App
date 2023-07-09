import {Image, StatusBar, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {logout} from '../../redux/Slices/AuthSlice';
import {useDispatch} from 'react-redux';

const SplashScreen = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  const Auth = useSelector((state: any) => state.Auth);

  useEffect(() => {
    StatusBar.setTranslucent(true);
    if (!isLoading) {
      checkAuth();
    }
  }, [1]);

  const checkAuth = () => {
    setTimeout(() => {
      props.navigation.reset(
        Auth.auth
          ? {routes: [{name: 'homeScreen'}]}
          : {routes: [{name: 'loginScreen'}]},
      );
    }, 1000);
  };

  return (
    <View style={styles.SplashScreen}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <Image
        source={require('../../assets/images/SplashImg.jpg')}
        style={{width: 300, height: 300}}
      />
    </View>
  );
};

export default SplashScreen;
