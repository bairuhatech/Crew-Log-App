import {StyleSheet} from 'react-native';
import COLOR from '../../Config/COLOR';
import Fonts from '../../Config/Fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.White,
  },
  Box1: {
    margin: 20,
    marginBottom: 0,
  },
  Box2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Box3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 20,
  },
  txt1: {
    color: COLOR.primary,
    fontSize: 16,
    fontFamily: Fonts.semibold,
  },
  txt2: {
    color: COLOR.grey1,
    fontSize: 14,
    fontFamily: Fonts.medium,
    marginTop: 10,
  },
  txt3: {
    color: COLOR.grey1,
    fontSize: 12,
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
  txt4: {
    color: '#000',
    fontSize: 14,
    fontFamily: Fonts.semibold,
    marginBottom: 5,
    textAlign: 'center',
  },
  txt5: {
    color: '#000',
    fontSize: 40,
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
  txt6: {
    color: COLOR.grey2,
    fontSize: 20,
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
  button: {
    height: 170,
    width: 170,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt7: {
    color: '#fff',
    fontFamily: Fonts.semibold,
    fontSize: 16,
    marginTop: 10,
  },
  ProcessModal: {
    backgroundColor: COLOR.transparent,
    flex: 1,
    justifyContent: 'center',
  },
  ModalBox1: {
    backgroundColor: COLOR.White,
    margin: 20,
    padding: 20,
    paddingBottom: 50,
    paddingTop: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  Modaltxt1: {
    color: COLOR.primary,
    fontFamily: Fonts.semibold,
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  Modaltxt2: {
    color: COLOR.grey1,
    fontFamily: Fonts.semibold,
    fontSize: 14,
  },
});
