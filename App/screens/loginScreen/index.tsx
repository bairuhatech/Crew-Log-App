import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
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
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {empId} from '../../redux/Slices/UserSlice';
import {logout} from '../../redux/Slices/AuthSlice';

const LoginScreen = () => {
  const toast = useToast();

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
    dispatch(logout());
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
        // fetch(api, {
        //   method: 'post',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        // },
        //   body: JSON.stringify(obj),
        // })
        //   .then((response: any) => response.json())
        //   .then((json: any) => {
        //     console.log(json);
        //     console.log('Login----2 api');
        //     setIsLoading(false);

        //     if (json.uuid) {
        //       dispatch(login(json));
        //       // props.navigation.reset({routes: [{name: 'Homescreen'}]});
        //       navigation.navigate('homeScreen' as never);
        //     } else {
        //       setError('Invalid Employee ID or Password!');
        // toast.show('Invalid Employee ID or Password !', {
        //   type: 'danger',
        // });
        //       setIsLoading(false);
        //     }
        //   })
        //   .catch(error => {
        //     setError(error.response.data.message);
        //     toast.show('error.response.data.message !', {
        //       type: 'danger',
        //     });
        //     setIsLoading(false);
        //     setError('Login faild.Try again!');
        //   });

        axios
          .post(api, obj, {
            // headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded',
            // },
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(function (response) {
            console.log(response);
            let user = response.data;
            if (user) {
              console.log('User ---> ', user);
              dispatch(login(user));
              dispatch(empId(user.emp_id));
              setIsLoading(false);
              navigation.navigate('homeScreen' as never);
            } else {
              toast.show('Invalid Employee ID or Password !', {
                type: 'danger',
              });
            }
            // else if (user.login_status === 1) {
            //   dispatch(login(user));
            //   navigation.navigate('homeScreen' as never);
            // }
          });

        // axios
        //   .post(api, obj)

        //   .then((response: any) => response)
        //   .then((json: any) => {
        //     console.log(json);
        //   })

        // .catch(function (error) {
        //   console.log(error);
        // });
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

          {/* <Textinput
            error={fomrError['password'] ? true : false}
            head="Password"
            keyboard="ascii-capable"
            onChange={(text: any) => setPassword(text)}
          /> */}

          <Textinput
            error={fomrError['password'] ? true : false}
            head="Password"
            keyboard="ascii-capable"
            password
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
