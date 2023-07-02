import {StyleSheet} from 'react-native';
import COLOR from '../../config/color';
import FONT from '../../config/font';
// import FONTS from '../config/fonts';
export default StyleSheet.create({
  LoginScreen: {
    flex: 1,
    backgroundColor: COLOR.white,
    // backgroundColor:'green',
    padding: 20,
  },
  LoginFormTop: {
    height: 400,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  LoginFormBox: {
    flex: 1,
    // backgroundColor:'red'
  },

  LoginBtn: {
    backgroundColor: COLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 7,
  },

  LoginTxt: {
    color: COLOR.grey10,
    fontFamily: FONT.semibold,
    fontSize: 15,
  },

  LoginText: {
    color: COLOR.black,
    fontFamily: FONT.semibold,
    fontSize: 35,
  },

  LoginSubText: {
    color: COLOR.grey6,
    fontFamily: FONT.semibold,
    fontSize: 15,
  },
  formerror: {
    color: 'red',
  },
});
