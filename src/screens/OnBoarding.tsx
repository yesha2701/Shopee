import { Image, Text, View } from 'react-native';
import { styles } from './OnBoardingStyles';
import { images } from '../../assets/images';
import { strings } from '../utilities/Strings';
import { CustomButton } from '../components/CustomButton';

const OnBoarding = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image source={images.logo} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.titleStyle}>{strings.title}</Text>
        <Text style={styles.introStyle}>{strings.intro}</Text>
      </View>
      <View>
        <CustomButton label={strings.onStart} onPress={() => null} />
      </View>
    </View>
  );
};

export default OnBoarding;
