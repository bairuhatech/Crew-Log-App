import {StyleSheet} from 'react-native';
import COLOR from '../../Config/COLOR';
import Fonts from '../../Config/Fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.White,
  },
  txt1: {
    color: COLOR.grey1,
    fontFamily: Fonts.semibold,
    marginBottom: 10,
    fontSize: 20,
  },
  ListItem: {
    margin: 20,
    borderBottomColor: COLOR.grey,
    borderBottomWidth: 2,
    paddingBottom: 20,
  },
  ListItemBox2: {
    borderBottomColor: COLOR.grey,
    borderBottomWidth: 0.5,
  },
  ListItemBox3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  txt2: {
    color: 'green',
    fontFamily: Fonts.semibold,
    fontSize: 13,
  },
  txt3: {
    color: 'red',
    fontFamily: Fonts.semibold,
    fontSize: 13,
  },
});
