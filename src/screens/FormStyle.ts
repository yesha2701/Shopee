import { StyleSheet } from 'react-native';
import { colors } from '../Themes/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Themes/Metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    textAlign: 'center',
  },
  formView: {
    marginTop: verticalScale(15),
    rowGap: verticalScale(10),
  },
  dropdown: {
    borderWidth: moderateScale(2),
    padding: moderateScale(15),
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(25),
    fontSize: moderateScale(16),
    backgroundColor: colors.white,
    marginVertical: verticalScale(6),
  },
  text: {
    marginLeft: horizontalScale(5),
    marginBottom: verticalScale(5),
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  placeholderStyle: {
    color: colors.lightGrey,
  },
  errorText: {
    color: colors.red,
  },
  imageView: {
    height: verticalScale(100),
    width: horizontalScale(100),
    borderWidth: moderateScale(1),
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    marginTop: verticalScale(8),
  },
  uriImage: {
    height: verticalScale(90),
    width: horizontalScale(90),
    borderRadius: moderateScale(10),
  },
  buttonStyle: {
    paddingHorizontal: horizontalScale(8),
    marginRight: horizontalScale(240),
    paddingVertical: verticalScale(8),
  },
  textStyle: {
    fontSize: moderateScale(16),
  },
});
