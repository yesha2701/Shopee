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
import { styles } from './RegistrationStyle';
import { images } from '../../assets/images';
import { strings } from '../utilities/strings';
import CustomTextInput from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { CustomCancelButton } from '../components/CustomCancelButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationType';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useRef, useState } from 'react';
import { RootState, useAppDispatch } from '../redux/store';
import { registerData } from '../redux/slice/userSlice';
import { useSelector } from 'react-redux';

const Registration = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const onNavigate = () => {
    navigation.navigate('Login');
  };
  const onCancel = () => {
    navigation.goBack();
  };

  const Data = useSelector((state: RootState) => state.userSlice.users);
  const dispatch = useAppDispatch();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ field: '', message: '' });
  const regex = /\S+@\S+\.\S+/;
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const idRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    idRef.current?.focus();
  }, []);

  const onClearInput = () => {
    setId('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const onHandleChange = (
    field: 'id' | 'name' | 'email' | 'password',
    value: string,
  ) => {
    if (field === 'id') setId(value.replace(/[^0-9]/g, ''));
    if (field === 'name') setName(value.replace(/[^A-Za-z\s]/g, ''));
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (errors.field === field) {
      setErrors({ field: '', message: '' });
    }
  };

  const onDispatch = () => {
    if (Data.map(x => x.id).includes(id)) {
      Alert.alert('Id Already exist');
    } else {
      dispatch(
        registerData({
          id,
          name,
          email,
          password,
        }),
      ),
        onNavigate();
    }
  };

  const onInsert = () => {
    Alert.alert('Confirmation', 'Are you sure you want to insert data', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => onDispatch(),
      },
    ]);
  };

  const onSubmit = () => {
    let formError = { field: '', message: '' };

    if (id.trim() === '') {
      formError.field = 'id';
      formError.message = 'Id is Required';
      setErrors(formError);
      return;
    } else if (name.trim() === '') {
      formError.field = 'name';
      formError.message = 'Name is Required';
      setErrors(formError);
      return;
    } else if (email.trim() === '' || !regex.test(email)) {
      formError.field = 'email';
      formError.message = 'Email is Not Entered Properly';
      setErrors(formError);
      return;
    } else if (password.trim() === '' || !strongRegex.test(password)) {
      formError.field = 'password';
      formError.message = 'Password is Required,Should be entered poperly';
      setErrors(formError);
      return;
    }

    onInsert();

    onClearInput();
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.background}>
            <Image source={images.bubble2} />
            <Image source={images.bubble1} />
          </View>
          <View style={styles.foreground}>
            <Text style={styles.createStyle}>{strings.create}</Text>
          </View>
          <View style={styles.inputView}>
            <View style={styles.photoView}>
              <Image source={images.upload_photo} />
            </View>
            <View>
              <CustomTextInput
                placeholder="Id"
                ref={idRef}
                returnKeyType="next"
                onSubmitEditing={() => nameRef.current?.focus()}
                value={id}
                onChangeText={val => onHandleChange('id', val)}
              />
              {errors.field === 'id' && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
              <CustomTextInput
                placeholder="Name"
                autoCapitalize="words"
                ref={nameRef}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                value={name}
                onChangeText={val => onHandleChange('name', val)}
              />
              {errors.field === 'name' && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
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
                onSubmitEditing={onSubmit}
                value={password}
                onChangeText={val => onHandleChange('password', val)}
              />
              {errors.field === 'password' && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
            </View>
            <View style={styles.buttonView}>
              <CustomButton label="Done" onPress={() => onSubmit()} />
              <CustomCancelButton label="Cancel" onPress={() => onCancel()} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Registration;
