import {StyleSheet} from 'react-native';
import COLOR from '../../Config/COLOR';
import Fonts from '../../Config/Fonts';
export default StyleSheet.create({
  SplashScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  txt1: {
    color: COLOR.primary,
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
});
