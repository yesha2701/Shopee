import { Image, Text, View } from 'react-native';
import { styles } from './RegistrationStyle';
import { images } from '../../assets/images';
import { strings } from '../utilities/strings';
import CustomTextInput from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { CustomCancelButton } from '../components/CustomCancelButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationType';
import { StackNavigationProp } from '@react-navigation/stack';

const Registration = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const onNavigate = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
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
          <CustomTextInput placeholder="Name" />
          <CustomTextInput placeholder="Email" />
          <CustomTextInput placeholder="Password" secureTextEntry={true} />
        </View>
        <View style={styles.buttonView}>
          <CustomButton label="Done" onPress={() => onNavigate()} />
          <CustomCancelButton label="Cancel" onPress={() => null} />
        </View>
      </View>
    </View>
  );
};

export default Registration;
