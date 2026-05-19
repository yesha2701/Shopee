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
    backgroundColor: colors.white,
  },
  bubble4: {
    zIndex: moderateScale(1),
  },
  bubble5: {
    position: 'absolute',
    zIndex: moderateScale(2),
  },
  bubble3: {
    position: 'absolute',
    top: verticalScale(240),
    right: horizontalScale(0),
  },
  bubble6: {
    position: 'absolute',
    bottom: verticalScale(0),
    right: horizontalScale(0),
    zIndex: 0,
  },
  loginView: {
    flex: 1,
    padding: moderateScale(20),
    // justifyContent: 'flex-end',
    marginTop: verticalScale(80),
    // backgroundColor: colors.red,
  },
  loginText: {
    fontSize: moderateScale(52),
    fontWeight: '700',
    letterSpacing: moderateScale(1),
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  loginTitle: {
    fontSize: moderateScale(19),
    fontWeight: '300',
    letterSpacing: moderateScale(1),
  },
  errorText: {
    color: colors.red,
  },
});
