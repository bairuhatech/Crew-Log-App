import {StyleSheet} from 'react-native';
import COLOR from '../../Config/COLOR';
import Fonts from '../../Config/Fonts';
export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.White,
    flex: 1,
  },
  box1: {
    margin: 20,
    alignItems: 'center',
    borderBottomColor: COLOR.grey,
    borderBottomWidth: 0.8,
    paddingBottom: 20,
  },
  propic: {
    color: COLOR.grey,
    fontSize: 120,
  },
  txt1: {
    color: COLOR.black,
    fontFamily: Fonts.semibold,
    fontSize: 20,
  },
  txt2: {
    color: COLOR.grey1,
    marginBottom: 5,
    fontSize: 12,
  },
  txt3: {
    color: COLOR.black,
    fontFamily: Fonts.semibold,
    fontSize: 14,
  },
  item: {
    marginBottom: 10,
    borderBottomColor: COLOR.grey4,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
  },
  box2: {
    margin: 20,
    marginTop: 0,
  },
  txt4: {
    color: 'red',
    fontFamily: Fonts.semibold,
    marginTop: 20,
    fontSize: 16,
  },
  box3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  box4: {
    backgroundColor: COLOR.primary1,
    borderRadius: 100,
    padding: 5,
    paddingHorizontal: 20,
    margin: 5,
  },
  box5: {
    backgroundColor: COLOR.primary2,
    borderRadius: 100,
    padding: 5,
    paddingHorizontal: 20,
    margin: 5,
  },
  txt5: {
    color: '#fff',
    fontFamily: Fonts.semibold,
    fontSize: 12,
  },
});
