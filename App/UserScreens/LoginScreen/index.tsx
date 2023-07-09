import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {login, setAdmin} from '../../Redux/Slices/AuthSlice';
import InputBox from '../../Components/InputBox';
import styles from './styles';
import {validateAll} from 'indicative/validator';
import {POST} from '../../Utils/ApiCall';
import COLOR from '../../Config/COLOR';
import API from '../../Config/API';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [passwrod, setpasswrod] = useState(null);
  const [username, setusername] = useState(null);
  const [error, setError] = useState<any>({});
  const [faildMsg, setFaildMsg] = useState('');

  const rules = {
    password: 'required',
    emp_id: 'required',
  };

  const Login = async () => {
    try {
      var user = {
        emp_id: username,
        password: passwrod,
      };
      validateAll(user, rules)
        .then(async success => {
          setisLoading(true);
          let url = API.LOGIN;
          var CheckAPI: any = await POST(url, user);
          if (CheckAPI.emp_id) {
            dispatch(login(user));
            if (CheckAPI.designation === 'Admin') {
              dispatch(setAdmin(true));
            }
            navigation.reset({routes: [{name: 'HomeStack'}]});
          } else {
            setFaildMsg('Invalid Employee ID or Password !. Try again');
          }
          setisLoading(false);
        })
        .catch(errors => {
          const formattedErrors: any = {};
          errors.forEach(
            (error: {field: any; message: any}) =>
              (formattedErrors[error.field] = error.message),
          );
          setisLoading(false);
          setError(formattedErrors);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <Image
        source={require('../../Assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.logotxt}>CREW LOG</Text>
      <Text style={styles.logotxt2}>Login and continue to you work</Text>
      <InputBox
        value={username}
        label={'User ID'}
        placeHolder={'Enter user id'}
        error={error['emp_id'] ? 'required' : null}
        onChange={(val: any) => setusername(val)}
      />
      <InputBox
        value={passwrod}
        label={'password'}
        placeHolder={'Enter password'}
        secureTextEntry={true}
        error={error['passwrod'] ? 'required' : null}
        onChange={(val: any) => setpasswrod(val)}
      />
      {faildMsg ? <Text style={styles.errortxt}>{faildMsg}</Text> : null}
      <TouchableOpacity style={styles.Btn} onPress={() => Login()}>
        {isLoading ? (
          <ActivityIndicator color={'#fff'} size={'small'} />
        ) : (
          <Text style={styles.Btntxt}>Login to continue</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgott}>Forgott password ?</Text>
      </TouchableOpacity>
    </View>
  );
}
