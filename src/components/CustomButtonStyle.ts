import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Themes/Metrics';
import { colors } from '../Themes/Colors';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(90),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(16),
    marginVertical: verticalScale(20),
  },
  text: {
    fontWeight: '300',
    fontSize: moderateScale(22),
    color: colors.white,
    textAlign: 'center',
  },
});
