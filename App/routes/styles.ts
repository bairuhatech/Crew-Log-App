import {StyleSheet} from 'react-native';
import COLOR from '../config/color';
import FONT from '../config/font';
// import FONTS from '../config/fonts';
export default StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLOR.primary,
    height: 50,
  },
  tabBarOptions: {
    backgroundColor: COLOR.primary,
  },
  tabBarLabelStyle: {
    color: COLOR.grey10,
    fontFamily: FONT.semibold,
    marginBottom: 5,
  },

  screenHeader: {
    // alignItems:'center',
    // justifyContent:'center',
    backgroundColor: COLOR.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  screenHeaderTxt: {
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    fontSize: 18,
  },
});
