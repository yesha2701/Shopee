import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Themes/Metrics';
import { colors } from '../Themes/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    backgroundColor: colors.white,
    paddingVertical: moderateScale(21),
    paddingHorizontal: horizontalScale(26),
    borderRadius: moderateScale(80),
    shadowOffset: { width: 0, height: 3 },
    shadowColor: colors.black,
    shadowOpacity: moderateScale(0.2),
    shadowRadius: moderateScale(8),
    marginBottom: verticalScale(24),
  },
  textView: {
    alignItems: 'center',
    rowGap: verticalScale(18),
  },
  titleStyle: {
    fontWeight: '700',
    fontSize: moderateScale(52),
    letterSpacing: moderateScale(1),
  },
  introStyle: {
    fontSize: moderateScale(19),
    fontWeight: '300',
    lineHeight: verticalScale(33),
    textAlign: 'center',
    letterSpacing: moderateScale(1),
  },
});
