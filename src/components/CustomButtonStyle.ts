import { StyleSheet } from 'react-native';
import { moderateScale } from '../Themes/Metrics';

export const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
  },
  text: {
    fontWeight: '300',
    fontSize: moderateScale(22),
    // lineHeight: verticalScale(31),
  },
});
