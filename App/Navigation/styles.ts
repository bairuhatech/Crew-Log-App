import {Platform, StyleSheet} from 'react-native';
import Fonts from '../Config/Fonts';
import COLOR from '../Config/COLOR';
export default StyleSheet.create({
  TabIcons: {
    marginBottom: -5,
    fontSize: 24,
  },
  TabLabel: {
    marginBottom: 7,
    fontFamily: Fonts.semibold,
    fontSize: 11,
  },
  TabStyle: {
    elevation: 0,
    height: Platform.OS === 'android' ? 60 : 90,
  },
  TabTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 20,
  },
  SettingsIcon: {
    marginRight: 20,
    fontSize: 24,
    color: COLOR.grey1,
  },
});
