import {Platform, StyleSheet} from 'react-native';
import Fonts from '../Config/Fonts';
import COLOR from '../Config/COLOR';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.White,
    padding: 20,
  },
  AdminActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLOR.grey4,
    borderRadius: 10,
    height: 55,
    marginBottom: 20,
  },
  AdminActionTxt: {
    color: COLOR.black,
    marginLeft: 16,
    fontFamily: Fonts.bold,
    fontSize: 14,
    textAlign: 'justify',
  },
});
