import React, {useEffect} from 'react';
import {Image, StatusBar, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import COLOR from '../../Config/COLOR';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

export default function SplashScreen(props: any) {
  const Auth = useSelector((state: any) => state.Auth);

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(Auth);

  const checkAuth = () => {
    setTimeout(() => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [Auth.auth ? {name: 'HomeStack'} : {name: 'loginscreen'}],
        }),
      );
    }, 2000);
  };

  return (
    <LinearGradient
      colors={[COLOR.primary, COLOR.White, COLOR.White]}
      style={styles.SplashScreen}>
      <StatusBar backgroundColor={COLOR.primary} barStyle={'light-content'} />
      <Image
        source={require('../../Assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.txt1}>CREW LOG</Text>
    </LinearGradient>
  );
}
