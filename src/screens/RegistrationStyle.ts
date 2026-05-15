import { StyleSheet } from 'react-native';
import { colors } from '../Themes/Colors';
import { moderateScale, verticalScale } from '../Themes/Metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  background: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: moderateScale(1),
  },
  foreground: {
    position: 'absolute',
    padding: moderateScale(20),
    zIndex: moderateScale(2),
  },
  createStyle: {
    fontSize: moderateScale(50),
    marginTop: verticalScale(90),
    fontWeight: '700',
    letterSpacing: moderateScale(1),
  },
  inputView: {
    padding: moderateScale(20),
  },
  photoView: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(30),
  },
  buttonView: {
    marginTop: verticalScale(25),
  },
  errorText: {
    color: colors.red,
  },
});
