import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale } from '../Themes/Metrics';

export const styles = StyleSheet.create({
  button: {
    marginHorizontal: horizontalScale(140),
  },
  text: {
    fontWeight: '300',
    fontSize: moderateScale(15),
    letterSpacing: moderateScale(1),
  },
});
