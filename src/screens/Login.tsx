import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { styles } from './LoginStyle';
import { images } from '../../assets/images';
import { strings } from '../utilities/strings';
import { icons } from '../../assets/icons';
import CustomTextInput from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { CustomCancelButton } from '../components/CustomCancelButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationType';
import { RootState } from '../redux/store';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onCancel = () => {
    navigation.navigate('OnBoarding');
  };

  const Data = useSelector((state: RootState) => state.userSlice.users);
  console.log('Data :>> ', Data);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ field: '', message: '' });
  const regex = /\S+@\S+\.\S+/;

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onClearInput = () => {
    setEmail('');
    setPassword('');
  };

  const onHandleChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (errors.field === field) {
      setErrors({ field: '', message: '' });
    }
  };

  const onLogin = async () => {
    let formError = { field: '', message: '' };
    if (email.trim() === '' || !regex.test(email)) {
      formError.field = 'email';
      formError.message = 'Email is Not Entered Properly';
      setErrors(formError);
      return;
    } else if (password.trim() === '') {
      formError.field = 'password';
      formError.message =
        'Password is Required. Please Enter Your password properly ';
      setErrors(formError);
      return;
    }
    const matched = Data.find(x => {
      return x.email === email && x.password === password;
    });

    if (matched) {
      await login(email, password);
    } else {
      Alert.alert(
        'User is not Registered.Please review your Email or Password',
      );
    }
    onClearInput;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View>
            <Image source={images.bubble4} style={styles.bubble4} />
            <Image source={images.bubble5} style={styles.bubble5} />
            <Image source={images.bubble3} style={styles.bubble3} />
          </View>
          <View style={styles.loginView}>
            <Image source={images.bubble6} style={styles.bubble6} />
            <Text style={styles.loginText}>{strings.login}</Text>
            <View style={styles.titleView}>
              <Text style={styles.loginTitle}>{strings.loginTitle}</Text>
              <Image source={icons.heart} />
            </View>
            <CustomTextInput
              placeholder="Email"
              autoCapitalize="none"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              value={email}
              onChangeText={val => onHandleChange('email', val)}
            />
            {errors.field === 'email' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
            <CustomTextInput
              placeholder="Password"
              secureTextEntry={true}
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={onLogin}
              value={password}
              onChangeText={val => onHandleChange('password', val)}
            />
            {errors.field === 'password' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
            <CustomButton label="Login" onPress={() => onLogin()} />
            <CustomCancelButton label="Cancel" onPress={() => onCancel()} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Login;
