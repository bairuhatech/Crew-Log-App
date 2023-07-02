import {StyleSheet} from 'react-native';
import FONT from '../../config/font';
import COLOR from '../../config/color';

export default StyleSheet.create({
  ProfileBox1: {
    // backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  Avatar: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 100,
  },
  Username: {
    textTransform: 'capitalize',
    fontFamily: FONT.bold,
    fontSize: 20,
    color: COLOR.grey1,
    // marginRight: 10,
  },
  Role: {
    // textTransform: 'capitalize',
    fontFamily: FONT.semibold,
    fontSize: 14,
    color: COLOR.grey1,
  },

  DetailsBox: {
    backgroundColor: COLOR.grey10,
    marginHorizontal: 15,
    borderRadius: 7,
    padding: 10,
  },

  DetailsHead: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLOR.grey4,
    marginBottom: 20,
  },

  DetailsItem: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  DetailsItemLabel: {
    fontFamily: FONT.semibold,
    fontSize: 15,
    color: COLOR.grey4,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 2,
  },

  DetailsItemText: {
    fontFamily: FONT.semibold,
    fontSize: 15,
    color: COLOR.grey2,
    marginBottom: 10,
    paddingLeft: 10,
  },

  DetailsItemCol1: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  DetailsItemCol2: {},

  ProfileOptions: {
    padding: 15,
  },

  ProfileOptionsItem: {
    // backgroundColor: 'red',
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    // borderBottomWidth: 1.5,
    // borderBottomColor:COLOR.grey10,
    // justifyContent: 'space-between',
    paddingRight: 10,
  },

  ProfileOptionsText: {
    fontFamily: FONT.semibold,
    fontSize: 15,
    color: COLOR.grey2,
    paddingLeft: 20,
  },

  ProfileOptionsText2: {
    fontFamily: FONT.semibold,
    fontSize: 17,
    color: COLOR.warning,
    paddingLeft: 20,
  },
});
