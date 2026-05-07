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
    paddingTop: verticalScale(50),
    paddingHorizontal: horizontalScale(15),
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: '700',
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
});
