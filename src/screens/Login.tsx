import { Image, Text, View } from 'react-native';
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

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const onNavigate = () => {
    navigation.replace('BottomNavigator');
  };
  return (
    <View style={styles.container}>
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
        <CustomTextInput placeholder="Email" />
        <CustomTextInput placeholder="Password" secureTextEntry={true} />
        <CustomButton label="Login" onPress={() => onNavigate()} />
        <CustomCancelButton label="Cancel" onPress={() => null} />
      </View>
    </View>
  );
};

export default Login;
