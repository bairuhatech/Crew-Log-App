import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../config/color';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Textinput from '../../components/textInput';
import FONT from '../../config/font';
import Loader from '../../components/loader';
import {useNavigation} from '@react-navigation/native';
import {validateAll} from 'indicative/validator';
import API from '../../config/API';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/Slices/AuthSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState<boolean>(false);
  const [fomrError, setFomrError] = useState<any>({});
  const [error, setError] = useState<any>('');

  const rules = {
    emp_id: 'required',
    password: 'required',
  };

  const DoLogin = () => {
    console.log('Login----');

    setError('');
    setFomrError({});
    let obj = {
      emp_id: username,
      password: password,
    };
    console.log(obj);

    validateAll(obj, rules)
      .then(success => {
        setIsLoading(true);
        let api = API.BASE_URL + API.LOGIN;
        console.log('Login----2', api);
        fetch(api, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        })
          .then((response: any) => response.json())
          .then((json: any) => {
            console.log(json);
            console.log('Login----2 api');
            setIsLoading(false);

            if (json.uuid) {
              dispatch(login(json));
              // props.navigation.reset({routes: [{name: 'Homescreen'}]});
              navigation.navigate('homeScreen' as never);
            } else {
              setError('Invalid Username or Password!');
              setIsLoading(false);
            }
          })
          .catch(error => {
            setError(error.response.data.message);
            setIsLoading(false);
            setError('Login faild.Try again!');
          });
      })
      .catch(errors => {
        const formattedErrors: any = {};
        errors.forEach(
          (error: {field: any; message: any}) =>
            (formattedErrors[error.field] = error.message),
        );
        setFomrError(formattedErrors);
      });
  };

  const DoLogin1 = () => {
    setIsLoading(true);
    setError('');
    setFomrError({});
    const url = API.BASE_URL + API.LOGIN;
    const data = {
      emp_id: username,
      password: password,
    };

    validateAll(data, rules).then(success => {
      setIsLoading(true);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setIsLoading(false);

          if (data) {
            dispatch(login(data));
            // props.navigation.reset({routes: [{name: 'Homescreen'}]});
            navigation.navigate('homeScreen' as never);
          } else {
            setError('Invalid Username or Password!');
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  };

  return (
    <View style={styles.LoginScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="always">
        <View style={styles.LoginFormTop}>
          <View
            style={{
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageBackground
              resizeMode="cover"
              source={require('../../assets/images/SplashImg.jpg')}
              style={{width: 200, height: 200}}></ImageBackground>
          </View>

          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
            <Text style={styles.LoginText}>Log In</Text>
          </View>
        </View>
        <View style={styles.LoginFormBox}>
          <Textinput
            error={fomrError['emp_id'] ? true : false}
            head="Employee ID"
            keyboard="decimal-pad"
            onChange={(text: any) => setUsername(text)}
          />

          <Textinput
            error={fomrError['password'] ? true : false}
            head="Password"
            keyboard="ascii-capable"
            onChange={(text: any) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => DoLogin()} style={styles.LoginBtn}>
            {isLoading ? (
              <Loader color={COLOR.grey10} />
            ) : (
              <Text style={styles.LoginTxt}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
