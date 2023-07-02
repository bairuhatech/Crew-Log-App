import {StyleSheet} from 'react-native';
import FONT from '../../config/font';
import COLOR from '../../config/color';

export default StyleSheet.create({
  AdminActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    backgroundColor: COLOR.primary,
    borderRadius: 7,
    height: 55,
    marginBottom: 10,
  },

  AdminActionTxt: {
    color: COLOR.white,
    marginLeft: 15,
    fontFamily: FONT.semibold,
    fontSize: 13,
  },

  UserItemTextItem: {
    flexDirection: 'row',
  },

  UserItemTextItemTxt: {},
});
