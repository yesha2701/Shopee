/* eslint-disable no-lone-blocks */
import { Image, ScrollView, Text, View } from 'react-native';
import { styles } from './OnBoardingStyles';
import { images } from '../../assets/images';
import { strings } from '../utilities/strings';
import { CustomButton } from '../components/CustomButton';
import { CustomArrowButton } from '../components/CustomArrowButton';
import { icons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationType';
import { StackNavigationProp } from '@react-navigation/stack';

const OnBoarding = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const onNavigate = () => {
    navigation.navigate('Registration');
  };
  const onHasAccount = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.logoView}>
            <Image source={images.logo} />
          </View>
          <View style={styles.textView}>
            <Text style={styles.titleStyle}>{strings.title}</Text>
            <Text style={styles.introStyle}>{strings.intro}</Text>
          </View>
          <View>
            <CustomButton
              label={strings.onStart}
              onPress={() => onNavigate()}
            />
          </View>
          <View style={styles.accountView}>
            <Text style={styles.accountStyle}>{strings.account}</Text>
            <CustomArrowButton
              source={icons.rightArrow}
              onPress={() => onHasAccount()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OnBoarding;
