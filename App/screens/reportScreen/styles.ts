import {StyleSheet} from 'react-native';
import FONT from '../../config/font';
import COLOR from '../../config/color';

export default StyleSheet.create({
  ReportStatus: {
    margin: 10,
    backgroundColor: COLOR.grey10,
    padding: 10,
    // borderWidth: 1.5,
    // borderColor: COLOR.grey3,
    borderRadius: 7,
    marginBottom: 10,
  },

  ReportStatusDate: {
    color: COLOR.grey6,
    fontFamily: FONT.bold,
    fontSize: 15,
    marginBottom: 5,
  },

  ReportStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  ReportStatusTxt1: {
    color: COLOR.grey3,
    fontFamily: FONT.semibold,
    fontSize: 16,
    marginLeft: 20,
    textTransform: 'capitalize',
  },

  ReportStatusTxt2: {
    color: COLOR.grey6,
    fontFamily: FONT.bold,
    fontSize: 17,
    marginLeft: 20,
  },

  ReportStatusItemCol1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ReportStatusItemCol2: {},

  HeaderRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
});
