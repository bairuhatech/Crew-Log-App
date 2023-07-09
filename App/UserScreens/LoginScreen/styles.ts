import {StyleSheet} from 'react-native';
import Fonts from '../../Config/Fonts';
import COLOR from '../../Config/COLOR';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  logotxt: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: COLOR.primary,
    marginBottom: 50,
  },
  Btn: {
    backgroundColor: COLOR.primary,
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
    borderWidth: 0,
    marginTop: 30,
  },
  Btntxt: {
    color: '#fff',
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },
  forgott: {
    margin: 20,
    marginTop: 50,
    textAlign: 'center',
    fontFamily: Fonts.semibold,
    color: 'grey',
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  logotxt2: {
    margin: 20,
    textAlign: 'center',
    fontFamily: Fonts.semibold,
    color: 'grey',
  },
  errortxt: {
    color: 'red',
    fontFamily: Fonts.semibold,
    fontSize: 12,
    textAlign: 'center',
  },
});
