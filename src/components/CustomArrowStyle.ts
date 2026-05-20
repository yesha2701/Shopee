import { StyleSheet } from 'react-native';
import { colors } from '../Themes/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Themes/Metrics';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(9),
    borderRadius: moderateScale(18),
  },
});
