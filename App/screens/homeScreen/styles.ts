import {StyleSheet} from 'react-native';
import FONT from '../../config/font';
import COLOR from '../../config/color';

export default StyleSheet.create({
  welcomeTxt1: {
    fontSize: 30,
    fontFamily: FONT.bold,
    color: COLOR.black,
    fontWeight: '600',
  },
  welcomeTxt2: {
    fontSize: 25,
    fontFamily: FONT.semibold,
    color: COLOR.black,
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  mainContent: {
    flex: 1,
    margin: 10,
    padding: 0,
    borderRadius: 7,
    backgroundColor: '#F5F5F5',
    // height:500
  },

  timeTextItem: {
    height: 50,
    marginBottom: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },

  dateText: {
    color: COLOR.grey4,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: FONT.semibold,
  },

  timeText: {
    color: COLOR.grey1,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONT.semibold,
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10,
  },

  buttonInfo: {
    height: 70,
    width: '45%',
    // padding: 10,
  },

  buttonInfoTxt1: {
    color: COLOR.grey3,
    fontFamily: FONT.semibold,
    fontSize: 12,
  },

  buttonInfoTxt2: {
    color: COLOR.grey1,
    fontFamily: FONT.semibold,
    fontSize: 15,
  },

  buttonTxt1: {
    color: COLOR.white,
    fontFamily: FONT.semibold,
  },

  inButton: {
    backgroundColor: COLOR.primary,
    height: 70,
    width: '50%',
    borderRadius: 7,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  inButtonFade: {
    backgroundColor: COLOR.primary_fade,
    height: 70,
    width: '50%',
    borderRadius: 7,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  reportItem: {
    marginTop: 20,
  },

  reportBtn: {
    backgroundColor: COLOR.primary,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderRadius: 7,
  },

  reportText: {
    color: COLOR.white,
    fontFamily: FONT.semibold,
    fontSize: 16,
  },

  // Checkin Modal

  primaryBtn: {
    backgroundColor: COLOR.primary,
    height: 45,
    width: '49%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnTxt: {
    color: COLOR.grey10,
    fontWeight: '600',
    fontSize: 17,
  },

  secondaryBtnTxt: {
    color: COLOR.primary,
    fontWeight: '600',
    fontSize: 17,
  },

  secondaryBtn: {
    backgroundColor: COLOR.white,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    height: 45,
    width: '49%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationMsgBox: {
    marginTop: 20,
    // backgroundColor: 'red',
    minHeight: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  locationMsg1: {
    color: COLOR.grey1,
    fontFamily: FONT.bold,
    fontSize: 20,
    marginRight: 10,
  },
  locationMsg2: {
    marginTop: 5,
    color: COLOR.grey7,
    fontFamily: FONT.medium,
    fontSize: 15,
    marginRight: 10,
  },

  // Checkout Modal

  ShowCheckin: {
    backgroundColor: COLOR.primary,
    marginBottom: 10,
    height: 80,
    borderRadius: 7,
    padding: 10,
  },

  ShowCheckin2: {},

  ShowCheckinHead: {
    marginTop: 5,
    color: COLOR.grey3,
    fontFamily: FONT.semibold,
    fontSize: 18,
    marginRight: 10,
    marginBottom: 10,
  },

  ShowCheckinBox: {
    marginTop: 10,
  },

  ShowCheckinItemHead: {
    color: COLOR.grey10,
    fontFamily: FONT.semibold,
    fontSize: 15,
    marginRight: 10,
    marginBottom: 10,
  },
});
